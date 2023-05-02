import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import React from 'react';

export default function Editor() {
  const [code, setCode] = React.useState(`
  {
    test {
      id
    }
  }
  `);
  return (
    <React.Fragment>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundColor: '#f5f5f5',
        }}
      >
        <CodeEditor
          value={code}
          language="graphql"
          placeholder="Please enter GraphQL query"
          onChange={(evn) => setCode(evn.target.value)}
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
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Box>
    </React.Fragment>
  );
}
