import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Docs from './Docs';
const Editor = lazy(() => import('./Editor'));
const ResponseSection = lazy(() => import('./ResponseSection'));
const SimpleAccordion = lazy(() => import('./Accordion'));
import { styled } from '@mui/material/styles';
import { Loading } from './Loading';
import { Box } from '@mui/material';

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
      <Suspense
        fallback={
          <Box
            sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Loading text={null} fullHeight={false} />
          </Box>
        }
      >
        <div className="editorsContainer">
          <Editor></Editor>
          <SimpleAccordion />
        </div>
        <ResponseSection></ResponseSection>
      </Suspense>
    </Main>
  );
}
