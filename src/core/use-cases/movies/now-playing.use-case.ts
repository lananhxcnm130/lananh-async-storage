import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {NowPlayingResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import type {Movie} from '../../entities/movie.entity';

export const moviesNowPlayingUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const nowPLaying = await fetcher.get<NowPlayingResponse>('/now_playing');

    // Adaptar lo que viene de nowPlaying.results al formato de la entidad Movie
    return nowPLaying.results.map(MovieMapper.formMovieResultToEntity);
  } catch (error) {
    throw new Error('error fetching movies now playing');
  }
};
