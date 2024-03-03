import {FullMovie, Movie} from '../../core/entities/movie.entity';
import {MovieDBMovieResponse, Result} from '../interfaces/movie-db.responses';

export class MovieMapper {
  static formMovieResultToEntity(result: Result): Movie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      releaseDate: new Date(result.release_date),
      rating: result.vote_average.toString(),
      poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
    };
  }

  static formMovieIdResultToEntities(result: MovieDBMovieResponse): FullMovie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      releaseDate: new Date(result.release_date),
      rating: result.vote_average.toString(),
      poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
      genres: result.genres.map(g => g.name),
      duration: result.runtime,
      budget: result.budget,
      originalTitle: result.original_title,
      productionCompanies: result.production_companies.map(pc => pc.name),
    };
  }
}
