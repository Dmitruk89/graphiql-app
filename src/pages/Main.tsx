import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useIdToken } from 'react-firebase-hooks/auth';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import Docs from '../components/Docs';
import Editor from '../components/Editor';
import ResponseSection from '../components/ResponseSection';
import { RootState } from 'store';

function Main() {
  const t = useSelector(selectTranslations);
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, loading] = useIdToken(auth);

  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return navigate('/');
    }
  }, [user, auth, navigate, loading]);

  const open = useSelector((state: RootState) => state.graphql.isDocsOpen);
  const drawerWidth = useSelector((state: RootState) => state.graphql.docsWidth);
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
    (loading && (
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    )) ||
    (!user && <Typography>{t.auth.redirecting}</Typography>) || (
      <>
        <Main open={open} className="layout">
          <Docs></Docs>
          <Editor></Editor>
          <ResponseSection></ResponseSection>
        </Main>
      </>
    )
  );
}

export default Main;
