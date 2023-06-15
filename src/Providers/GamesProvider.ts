import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendApiUrl } from '../helpers/BackendApi';
import { IObject } from '../components/Common/CommonTypes';
import { ResponseGamesT } from './ProvidersTypes';

export const ADMIN_GAMES_API_REDUCER_KEY = 'adminGamesApi';
export const adminGamesApi = createApi({
  reducerPath: ADMIN_GAMES_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: BackendApiUrl,
    prepareHeaders: (headers) => {
      const jwtToken = localStorage.getItem('accessToken');
      if (jwtToken) {
        headers.set('Authorization', `Bearer ${jwtToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['AdminGames'],
  endpoints: (builder) => ({
    getAllGames: builder.query<IObject[], void>({
      query: () => {
        return {
          url: '/games',
          method: 'GET',
        };
      },
      transformResponse: (response: ResponseGamesT) => {
        return response.games;
      },
    }),
    createGame: builder.mutation<IObject, IObject>({
      query: (game) => {
        return {
          url: '/games',
          method: 'POST',
          body: game,
        };
      },
    }),
    updateGame: builder.mutation<IObject, IObject>({
      query: (game) => {
        return {
          url: `/games/${game.id}`,
          method: 'PUT',
          body: game,
        };
      },
    }),
    deleteGame: builder.mutation<string, IObject>({
      query: (id) => {
        return {
          url: `/games/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const GAMES_API_REDUCER_KEY = 'gamesApi';
export const gamesApi = createApi({
  reducerPath: GAMES_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: BackendApiUrl,
  }),
  tagTypes: ['Games'],
  endpoints: (builder) => ({
    getGames: builder.query<IObject[], number>({
      query: (limit) => {
        return {
          url: `/games?limit=${limit}`,
          method: 'GET',
        };
      },
      transformResponse: (response: ResponseGamesT) => {
        return response.games;
      },
    }),
  }),
});

export const { useGetGamesQuery } = gamesApi;
export const {
  useGetAllGamesQuery,
  useCreateGameMutation,
  useUpdateGameMutation,
  useDeleteGameMutation,
} = adminGamesApi;
