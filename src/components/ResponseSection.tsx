import Box from '@mui/material/Box';
import React from 'react';
import { useGetCharactersQuery } from '../features/api/apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import JSONPretty from 'react-json-pretty';
import { CircularProgress } from '@mui/material';
import { selectTranslations } from '../features/translation/translationSlice';
import { ApiError } from '../types/types';

export default function ResponseSection() {
  let trimmedError = '';
  const skip = useSelector((state: RootState) => state.graphql.skipQuery);
  const t = useSelector(selectTranslations);
  const query = useSelector((state: RootState) => state.graphql.query);
  const headers = useSelector((state: RootState) => state.graphql.headersForQuery);
  const {
    data: apiResponse,
    error,
    isLoading,
  } = useGetCharactersQuery({ query, headers }, { skip });
  if (error) {
    const errorMessage = (error as ApiError)?.message;
    const colonCurlyBraceIndex = errorMessage.indexOf(': {');
    trimmedError = errorMessage.substring(0, colonCurlyBraceIndex);
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          padding: 3,
          flexGrow: 1,
          overflow: 'auto',
          color: '#8c959f',
          fontSize: '1.1rem',
          backgroundColor: '#f5f5f5',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      >
        {error ? (
          <JSONPretty
            id="json-pretty"
            style={{ fontSize: '1rem' }}
            data={trimmedError}
            mainStyle="line-height:1.3;color:#6e7781;background:#f5f5f5;overflow:auto;"
            errorStyle="line-height:1.3;color:#184f5a;background:f5f5f5;overflow:auto;"
            keyStyle="color:#0550ae;"
            stringStyle="color:#116329;"
            valueStyle="color:#116329;"
            booleanStyle="color:#116329"
          ></JSONPretty>
        ) : isLoading ? (
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : apiResponse ? (
          <JSONPretty
            id="json-pretty"
            style={{ fontSize: '1rem' }}
            data={apiResponse}
            mainStyle="line-height:1.3;color:#6e7781;background:#f5f5f5;overflow:auto;"
            errorStyle="line-height:1.3;color:#66d9ef;background:f5f5f5;overflow:auto;"
            keyStyle="color:#0550ae;"
            stringStyle="color:#116329;"
            valueStyle="color:#116329;"
            booleanStyle="color:#116329"
          ></JSONPretty>
        ) : (
          t.mainSection.resultPlaceholder
        )}
      </Box>
    </React.Fragment>
  );
}
