import CodeEditor from '@uiw/react-textarea-code-editor';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHeadersEditor } from '../features/graphql/graphqlSlice';
import { RootState } from '../store';
import { selectTranslations } from '../features/translation/translationSlice';

export function Headers() {
  const t = useSelector(selectTranslations);
  const headersInitState = useSelector((state: RootState) => state.graphql.headersEditor);
  const dispatch = useDispatch();

  return (
    <>
      <CodeEditor
        value={headersInitState}
        language="graphql"
        placeholder={t.mainSection.variablesPlaceholder}
        onChange={(event) => {
          const value = event.target.value;
          console.log(JSON.stringify(value.replace(new RegExp('[{}]', 'g'), '').trim()));
          dispatch(updateHeadersEditor(event.target.value));
        }}
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
