import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieDBMovieResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {FullMovie} from '../../entities/movie.entity';

export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {
    const movie = await fetcher.get<MovieDBMovieResponse>(`/${movieId}`);

    return MovieMapper.formMovieIdResultToEntities(movie);
  } catch (error) {
    throw new Error(`Cannot get movie by id : ${movieId}`);
  }
};
