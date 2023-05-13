import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEditor, createQuery, disableSkip } from '../features/graphql/graphqlSlice';
import { RootState } from '../store';
import { selectTranslations } from '../features/translation/translationSlice';
import SimpleAccordion from './Accordion';

export default function Editor() {
  const t = useSelector(selectTranslations);
  const code = useSelector((state: RootState) => state.graphql.editorCode);
  const varCode: string = useSelector((state: RootState) => state.graphql.varCode);
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
  console.log(queryCo.length, code.length);

  function onSendButtonClick() {
    dispatch(disableSkip());
    dispatch(createQuery(queryCo ? queryCo : code));
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
          justifyContent: 'space-between',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div className="editor">
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
        </div>
        <div className="accordion">
          <SimpleAccordion />
        </div>
      </Box>
    </React.Fragment>
  );
}
