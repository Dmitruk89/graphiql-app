import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateEditor,
  createQuery,
  disableSkip,
  updateHeadersForQuery,
  setHeadersState,
} from '../features/graphql/graphqlSlice';
import { RootState } from '../store';
import { selectTranslations } from '../features/translation/translationSlice';

export default function Editor() {
  const t = useSelector(selectTranslations);
  const code = useSelector((state: RootState) => state.graphql.editorCode);
  const varCode: string = useSelector((state: RootState) => state.graphql.varCode);
  const headersEditorCode = useSelector((state: RootState) => state.graphql.headersEditor);
  const dispatch = useDispatch();

  const queryParam = code.split(' ')[1][0] === '(' ? code.split(' ')[1].slice(0, -1).slice(2) : '';
  const varParam = JSON.parse(varCode);

  const checkVar = () => {
    if (code.includes('$')) {
      const arr = code.split(' ');
      if (queryParam in varParam) {
        arr.splice(1, 2);
        return arr
          .map((elem: string) => {
            if (elem[0] === '$') {
              return (elem = '"' + varParam[`${queryParam}`] + '"');
            } else {
              return elem;
            }
          })
          .join(' ');
      } else {
        return code;
      }
    }
  };
  const queryCo = checkVar();

  function onSendButtonClick() {
    try {
      if (headersEditorCode === '') throw new Error('emptyHeaders');
      const objFromHeadersEditor = JSON.parse(headersEditorCode);
      dispatch(setHeadersState('parsed'));
      dispatch(updateHeadersForQuery(Object.entries(objFromHeadersEditor)));
    } catch (error) {
      if (error instanceof Error && error.message === 'emptyHeaders') {
        dispatch(setHeadersState('empty'));
      } else {
        dispatch(setHeadersState('notParsed'));
      }
    }
    dispatch(disableSkip());
    dispatch(createQuery(queryCo ? queryCo : code));
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
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
        <Button variant="contained" endIcon={<SendIcon />} onClick={() => onSendButtonClick()}>
          {t.mainSection.sendButton}
        </Button>
      </Box>
    </React.Fragment>
  );
}
