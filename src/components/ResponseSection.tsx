import Box from '@mui/material/Box';
import React from 'react';
import { useGetCharactersQuery } from '../features/api/apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import JSONPretty from 'react-json-pretty';
import { CircularProgress } from '@mui/material';
import { selectTranslations } from '../features/translation/translationSlice';

export default function ResponseSection() {
  const skip = useSelector((state: RootState) => state.graphql.skipQuery);
  const t = useSelector(selectTranslations);
  const query = useSelector((state: RootState) => state.graphql.query);
  const headers = useSelector((state: RootState) => state.graphql.headersEditor);
  const {
    data: characters,
    error,
    isLoading,
  } = useGetCharactersQuery({ query, headers }, { skip });

  return (
    <React.Fragment>
      <Box
        sx={{
          padding: 3,
          flexGrow: 1,
          width: '40%',
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
            data={error}
            mainStyle="line-height:1.3;color:#6e7781;background:#f5f5f5;overflow:auto;"
            errorStyle="line-height:1.3;color:#66d9ef;background:f5f5f5;overflow:auto;"
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
        ) : characters ? (
          <JSONPretty
            id="json-pretty"
            style={{ fontSize: '1rem' }}
            data={characters}
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
