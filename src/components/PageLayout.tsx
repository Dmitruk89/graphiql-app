import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Docs from './Docs';
import Editor from './Editor';
import ResponseSection from './ResponseSection';
import { styled } from '@mui/material/styles';
import SimpleAccordion from './Accordion';

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
    [theme.breakpoints.up(915)]: {
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    },
    [theme.breakpoints.down(915)]: {
      marginLeft: 0,
    },
  }));
  return (
    <Main open={open} className="layout">
      <Docs></Docs>
      <div className="editorsContainer">
        <Editor></Editor>
        <SimpleAccordion />
      </div>
      <ResponseSection></ResponseSection>
    </Main>
  );
}
