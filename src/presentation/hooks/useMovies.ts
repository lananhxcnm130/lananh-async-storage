import {useEffect, useMemo, useState} from 'react';
import {Movie} from '../../core/entities/movie.entity';

import * as UseCases from '../../core/use-cases/';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1;

export const useMovies = () => {
  // Estado para controlar la carga
  const [isLoading, setIsLoading] = useState(false);
  // Estado para almacenar las películas en reproducción actual
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  // Estado para almacenar las películas populares
  const [popular, setPopular] = useState<Movie[]>([]);
  // Estado para almacenar las películas mejores rankeadas
  const [topRated, setTopRated] = useState<Movie[]>([]);
  // Estado para almacenar las películas proximas a estrenarse
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  // Hacer una petición para obtener las películas en reproducción actual
  const initialLoad = useMemo(async () => {
    // Llama al caso de uso para obtener las películas en reproducción actual
    const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(
      movieDBFetcher(),
    );
    const popularPromise = UseCases.moviesPopularUseCase(movieDBFetcher());
    const TopRatedPromise = UseCases.moviesTopRatedUseCase(movieDBFetcher());
    const UpcomingPromise = UseCases.moviesUpcomingUseCase(movieDBFetcher());
    // Hacemos las promesas de forma simultanea
    const [nowPlayingMovies, popularMovies, TopRatedMovies, UpcomingMovies] =
      await Promise.all([
        nowPlayingPromise,
        popularPromise,
        TopRatedPromise,
        UpcomingPromise,
      ]);

    // Devuelve las películas obtenidas
    return {
      nowPlaying: nowPlayingMovies,
      popular: popularMovies,
      topRated: TopRatedMovies,
      upcoming: UpcomingMovies,
    };
  }, []); // La dependencia está vacía para que se ejecute solo una vez al montar el componente

  // Efecto para cargar las películas al montar el componente
  useEffect(() => {
    setIsLoading(true); // Indica que la carga está en progreso
    initialLoad.then(movies => {
      setNowPlaying(movies.nowPlaying); // Actualiza el estado con las películas obtenidas
      setPopular(movies.popular); // Actualiza el estado con las películas obtenidas
      setTopRated(movies.topRated); // Actualiza el estado con las películas obtenidas
      setUpcoming(movies.upcoming); // Actualiza el estado con las películas obtenidas
      setIsLoading(false); // Indica que la carga ha finalizado
    });
  }, [initialLoad]); // La dependencia es initialLoad

  // Devuelve los valores que deseas exponer en el hook (puedes agregar más si es necesario)
  return {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,

    // Metodos
    popularNextPage: async () => {
      popularPageNumber++;

      const popularMovies = await UseCases.moviesPopularUseCase(
        movieDBFetcher({
          page: popularPageNumber,
        }),
      );

      setPopular(prev => [...prev, ...popularMovies]);
    },
  };
};
