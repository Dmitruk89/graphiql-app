import React, { lazy, Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useIdToken } from 'react-firebase-hooks/auth';

import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageLayout from '../components/PageLayout';
// const Footer = lazy(() => import('../components/Footer'));
// const Header = lazy(() => import('../components/Header'));
// const PageLayout = lazy(() => import('../components/PageLayout'));
import { Loading } from '../components/Loading';

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

  return (
    (loading && <Loading text="Connecting to firebase" fullHeight={true} />) ||
    (!user && (
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography>{t.auth.redirecting}</Typography>)
      </Box>
    )) || (
      <>
        {/* <Suspense fallback={<Loading fullHeight={true} />}> */}
        <Header></Header>
        {/* </Suspense> */}
        <PageLayout></PageLayout>
        <Footer></Footer>
      </>
    )
  );

  // return (
  //   (loading && (
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         flexGrow: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: '100vh',
  //       }}
  //     >
  //       <CircularProgress color="inherit" />
  //     </Box>
  //   )) ||
  //   (!user && <Typography>{t.auth.redirecting}</Typography>) || (
  //     <>
  //       <Header></Header>
  //       <PageLayout></PageLayout>
  //       <Footer></Footer>
  //     </>
  //   )
  // );
}

export default Main;
