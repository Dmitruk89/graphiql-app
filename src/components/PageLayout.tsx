import React from 'react';
import Editor from './Editor';
import ResponseSection from './ResponseSection';

export default function PageLayout() {
  return (
    <div className="layout">
      <Editor></Editor>
      <ResponseSection></ResponseSection>
    </div>
  );
}
