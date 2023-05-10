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
      query: (payload) => ({
        document: gql`
          query IntrospectionQuery {
            __type(name: "${payload.docsTypeName}") {
              name
              kind
              description
              inputFields {
                name
                type {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
              fields {
                name
                description
                args {
                  name
                  description
                  type {
                    kind
                    name
                    ofType {
                      kind
                      name
                    }
                  }
                }
                type {
                  kind
                  name
                  description
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                    }
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
