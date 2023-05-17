import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendApi } from '../helpers/BackendApi';
import { IObject } from '../components/Common/CommonTypes';

type ResponseT = {
  games: IObject[];
};

export const GAMES_API_REDUCER_KEY = 'gamesApi';
export const gamesApi = createApi({
  reducerPath: GAMES_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: BackendApi.defaults.baseURL,
    // prepareHeaders: (headers, {}) => {
    //   const jwtToken = localStorage.getItem('accessToken');
    //   if (jwtToken) {
    //     headers.set('Authorization', `Bearer ${jwtToken}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ['Games'],
  endpoints: (builder) => ({
    getAllGames: builder.query<IObject[], void>({
      query: () => {
        return {
          url: '/games',
          method: 'GET',
        };
      },
      transformResponse: (response: ResponseT) => {
        return response.games;
      },
    }),
    getGames: builder.query<IObject[], number>({
      query: (limit) => {
        return {
          url: `/games?limit=${limit}`,
          method: 'GET',
        };
      },
      transformResponse: (response: ResponseT) => {
        return response.games;
      },
    }),
  }),
});

export const { useGetAllGamesQuery, useGetGamesQuery } = gamesApi;
