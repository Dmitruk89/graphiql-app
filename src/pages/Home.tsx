import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useIdToken } from 'react-firebase-hooks/auth';

import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageLayout from '../components/PageLayout';
import { checkTokenExpiration } from '../helpers/helperFuntions';

function Home() {
  const t = useSelector(selectTranslations);
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, loading] = useIdToken(auth);

  React.useEffect(() => {
    if (loading) return;
    if (!user) {
      return navigate('/');
    }
    checkTokenExpiration(auth);
  }, [user, auth, navigate, loading]);

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
        <Header></Header>
        <PageLayout></PageLayout>
        <Footer></Footer>
      </>
    )
  );
}

export default Home;
