import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Docs from './Docs';
import Editor from './Editor';
import ResponseSection from './ResponseSection';
import { styled } from '@mui/material/styles';

export default function PageLayout() {
  const drawerWidth = useSelector((state: RootState) => state.graphql.docsWidth);
  const open = useSelector((state: RootState) => state.graphql.isDocsOpen);

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));
  return (
    <Main open={open} className="layout">
      <Docs></Docs>
      <Editor></Editor>
      <ResponseSection></ResponseSection>
    </Main>
  );
}
