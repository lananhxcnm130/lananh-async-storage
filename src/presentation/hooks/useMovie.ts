import {useEffect, useMemo, useState} from 'react';
import * as UsesCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import {FullMovie} from '../../core/entities/movie.entity';
import {Cast} from '../../core/entities/cast.entity';
import {AxiosAdapter} from '../../config/adapters/http/axios.adapter';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setCast] = useState<Cast[]>();
  // Este custom hook realizara la peticion para buscar la movie por id a la db

  useEffect(() => {
    loadMovie.then(({movie, cast}) => {
      setMovie(movie);
      setCast(cast);
      setIsLoading(false);
    });
  }, [movieId]);

  const loadMovie = useMemo(async () => {
    // TODO: manejar errores
    const moviePromise = UsesCases.getMovieByIdUseCase(
      movieDBFetcher(),
      movieId,
    );

    const castPromise = UsesCases.getMovieCastUseCase(
      movieDBFetcher(),
      movieId,
    );

    const [movie, cast] = await Promise.all([moviePromise, castPromise]);

    return {
      movie,
      cast,
    };
  }, [movie]);

  return {
    isLoading,
    movie,
    cast,
  };
};
