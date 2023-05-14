import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendApi } from '../helpers/BackendApi';
import { IObject } from '../components/Common/CommonTypes';
import { LoginParams } from '../components/AuthComponents/AuthTypes';

export const AUTHENTICATION_API_REDUCER_KEY = 'authenticationApi';
export const authenticationApi = createApi({
  reducerPath: AUTHENTICATION_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: BackendApi.defaults.baseURL,
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    userLogin: builder.mutation<IObject, LoginParams>({
      query: (credentials) => {
        return {
          url: '/login',
          method: 'POST',
          body: { email: credentials.email, password: credentials.password },
        };
      },
    }),
    adminLogin: builder.mutation<IObject, LoginParams>({
      query: (credentials) => {
        return {
          url: '/adminLogin',
          method: 'POST',
          body: {
            email: credentials.email,
            password: credentials.password,
          },
        };
      },
    }),
  }),
});

export const { useAdminLoginMutation, useUserLoginMutation } = authenticationApi;
