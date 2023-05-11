import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useIdToken } from 'react-firebase-hooks/auth';

import Header from '../components/Header';
import React from 'react';
import Footer from '../components/Footer';
import PageLayout from '../components/PageLayout';

function Home() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, loading] = useIdToken(auth);
  React.useEffect(() => {
    if (loading) return;
    if (!user) {
      return navigate('/');
    }
    console.log(new Date(user?.stsTokenManager.expirationTime));
  }, [user, navigate, auth, loading]);
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
    (!user && <Typography>Redirecting</Typography>) || (
      <>
        <Header></Header>
        <PageLayout></PageLayout>
        <Footer></Footer>
      </>
    )
  );
}

export default Home;
