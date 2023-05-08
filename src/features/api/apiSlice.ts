import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: graphqlRequestBaseQuery({
    url: 'https://rickandmortyapi.com/graphql',
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: (payload) => ({
        document: gql`
          ${payload.query}
        `,
      }),
    }),
    getDocs: builder.query({
      query: () => ({
        document: gql`
          query GetSchema {
            __schema {
              types {
                name
                description
                kind
                fields {
                  name
                  description
                  type {
                    name
                  }
                }
              }
            }
          }
        `,
      }),
    }),
  }),
});

export const { useGetCharactersQuery, useGetDocsQuery } = apiSlice;
