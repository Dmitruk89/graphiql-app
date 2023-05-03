import Box from '@mui/material/Box';
import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useGetCharactersQuery } from '../features/api/apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function ResponseSection() {
  const query = useSelector((state: RootState) => state.graphql.query);
  const { data: characters } = useGetCharactersQuery({ query });

  return (
    <React.Fragment>
      <Box
        sx={{
          padding: 2,
          flexGrow: 1,
          maxWidth: '50%',
          backgroundColor: '#f5f5f5',
        }}
      >
        <CodeEditor
          value={JSON.stringify(characters) || ''}
          language="graphql"
          placeholder="Response goes here"
          padding={15}
          style={{
            width: '100%',
            marginBottom: '20px',
            fontSize: 16,
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </Box>
    </React.Fragment>
  );
}
