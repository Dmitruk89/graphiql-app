import CodeEditor from '@uiw/react-textarea-code-editor';
import React from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateHeadersEditor } from '../features/graphql/graphqlSlice';
import { RootState } from '../store';

export function Headers() {
  const headersState = useSelector((state: RootState) => state.graphql.headersState);
  const headersEditorState = useSelector((state: RootState) => state.graphql.headersEditor);
  const dispatch = useDispatch();

  return (
    <>
      {headersState === 'notParsed' && (
        <Box sx={{ color: 'red', textAlign: 'center' }}>Please type headers in JSON format</Box>
      )}
      <CodeEditor
        value={headersEditorState}
        language="graphql"
        onChange={(event) => dispatch(updateHeadersEditor(event.target.value))}
        style={{
          width: '100%',
          fontSize: 16,
          backgroundColor: '#ffffff',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </>
  );
}
