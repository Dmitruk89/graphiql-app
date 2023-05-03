import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEditor, createQuery } from '../features/graphql/graphqlSlice';
import { RootState } from '../store';

export default function Editor() {
  const code = useSelector((state: RootState) => state.graphql.editorCode);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundColor: '#f5f5f5',
        }}
      >
        <CodeEditor
          value={code}
          language="graphql"
          placeholder="Please enter GraphQL query"
          onChange={(evn) => dispatch(updateEditor(evn.target.value))}
          padding={15}
          style={{
            width: '100%',
            marginBottom: '20px',
            fontSize: 16,
            backgroundColor: '#ffffff',
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => dispatch(createQuery(code))}
        >
          Send
        </Button>
      </Box>
    </React.Fragment>
  );
}
