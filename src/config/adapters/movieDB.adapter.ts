import {THE_MOVIE_KEY} from '@env';
import {AxiosAdapter} from './http/axios.adapter';

export const movieDBFetcher = (params?: Record<string, unknown>) =>
  new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params: {
      api_key: THE_MOVIE_KEY ?? '',
      lenguage: 'es',
      ...params,
    },
  });
