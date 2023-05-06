import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEditor, createQuery, disableSkip } from '../features/graphql/graphqlSlice';
import { RootState } from '../store';
import { selectTranslations } from '../features/translation/translationSlice';

export default function Editor() {
  const t = useSelector(selectTranslations);
  const code = useSelector((state: RootState) => state.graphql.editorCode);
  const dispatch = useDispatch();

  function onSendButtonClick() {
    dispatch(disableSkip());
    dispatch(createQuery(code));
  }

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
          placeholder={t.mainSection.editorPlaceholder}
          onChange={(event) => dispatch(updateEditor(event.target.value))}
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
          {t.mainSection.sendButton}
        </Button>
      </Box>
    </React.Fragment>
  );
}
