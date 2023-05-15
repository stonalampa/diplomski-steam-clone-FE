import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendApi } from '../helpers/BackendApi';
import { IObject } from '../components/Common/CommonTypes';

type ResponseT = {
  users: IObject[];
};

export const USERS_API_REDUCER_KEY = 'usersApi';
export const usersApi = createApi({
  reducerPath: USERS_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: BackendApi.defaults.baseURL,
    prepareHeaders: (headers) => {
      const jwtToken = localStorage.getItem('accessToken');
      if (jwtToken) {
        headers.set('Authorization', `Bearer ${jwtToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IObject[], void>({
      query: () => {
        return {
          url: '/users',
          method: 'GET',
        };
      },
      transformResponse: (response: ResponseT) => {
        return response.users;
      },
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApi;
