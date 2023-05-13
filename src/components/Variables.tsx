import CodeEditor from '@uiw/react-textarea-code-editor';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateVariables } from '../features/graphql/graphqlSlice';
import { RootState } from '../store';
import { selectTranslations } from '../features/translation/translationSlice';

export default function Variables() {
  const t = useSelector(selectTranslations);
  const varaible = useSelector((state: RootState) => state.graphql.varCode);
  const dispatch = useDispatch();

  return (
    <>
      <CodeEditor
        value={varaible}
        language="graphql"
        placeholder={t.mainSection.variablesPlaceholder}
        onChange={(event) => dispatch(updateVariables(event.target.value))}
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
    </>
  );
}
