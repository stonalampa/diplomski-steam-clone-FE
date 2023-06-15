import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendApiUrl } from '../helpers/BackendApi';
import { IObject } from '../components/Common/CommonTypes';
import { ResponseUsersT } from './ProvidersTypes';

export const ADMIN_USERS_API_REDUCER_KEY = 'adminUsersApi';
export const adminUsersApi = createApi({
  reducerPath: ADMIN_USERS_API_REDUCER_KEY,
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
  tagTypes: ['AdminUsers'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IObject[], void>({
      query: () => {
        return {
          url: '/users',
          method: 'GET',
        };
      },
      transformResponse: (response: ResponseUsersT) => {
        return response.users;
      },
    }),
    createUser: builder.mutation<IObject, IObject>({
      query: (user) => {
        return {
          url: '/users',
          method: 'POST',
          body: user,
        };
      },
    }),
    updateUser: builder.mutation<IObject, IObject>({
      query: (user) => {
        return {
          url: `/users/${user.id}`,
          method: 'PUT',
          body: user,
        };
      },
    }),
    deleteUser: builder.mutation<string, IObject>({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const USERS_API_REDUCER_KEY = 'usersApi';
export const usersApi = createApi({
  reducerPath: USERS_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: BackendApiUrl,
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    registerUser: builder.mutation<IObject, IObject>({
      query: (user) => {
        return {
          url: '/users',
          method: 'POST',
          body: user,
        };
      },
    }),
    resetPassword: builder.mutation<{ error: string } | { message: string }, string>({
      query: (email) => {
        return {
          url: '/users?resetPassword=true',
          method: 'POST',
          body: {
            email,
          },
        };
      },
    }),
    getUserData: builder.query<IObject, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    updateUserProfile: builder.mutation<IObject, IObject>({
      query: (user) => {
        return {
          url: `/users/${user.id}`,
          method: 'PUT',
          body: user,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminUsersApi;
export const {
  useResetPasswordMutation,
  useRegisterUserMutation,
  useGetUserDataQuery,
  useUpdateUserProfileMutation,
} = usersApi;
