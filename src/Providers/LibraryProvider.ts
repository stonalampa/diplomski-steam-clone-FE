import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendApiUrl } from '../helpers/BackendApi';
import { IObject } from '../components/Common/CommonTypes';

export const LIBRARY_API_REDUCER_KEY = 'libraryApi';
export const libraryApi = createApi({
  reducerPath: LIBRARY_API_REDUCER_KEY,
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
  tagTypes: ['Library'],
  endpoints: (builder) => ({
    getLibraryData: builder.query<IObject, string>({
      query: (id) => ({
        url: `/library/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetLibraryDataQuery } = libraryApi;
