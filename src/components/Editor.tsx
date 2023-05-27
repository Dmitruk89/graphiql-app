import CodeEditor from '@uiw/react-textarea-code-editor';
import Box from '@mui/material/Box';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEditor } from '../features/graphql/graphqlSlice';
import { RootState } from '../store';
import EditorControls from './EditorControls';
import { selectTranslations } from '../features/translation/translationSlice';

export default function Editor() {
  const t = useSelector(selectTranslations);
  const code = useSelector((state: RootState) => state.graphql.editorCode);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          borderRadius: '10px',
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
            minHeight: 400,
            backgroundColor: '#ffffff',
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
        <EditorControls></EditorControls>
      </Box>
    </React.Fragment>
  );
}
