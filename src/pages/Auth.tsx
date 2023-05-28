import React, { lazy, Suspense } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import LanguageSwitcher from '../components/LanguageSwitcher';
import Footer from '../components/Footer';
import { Loading } from '../components/Loading';
import NotFound from './NotFound';

const SignIn = lazy(() =>
  import('../components/SignIn').then((module) => ({ default: module.SignIn }))
);
const SignUp = lazy(() =>
  import('../components/SignUp').then((module) => ({ default: module.SignUp }))
);

function Auth() {
  const t = useSelector(selectTranslations);
  const params = useParams();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading text={null} fullHeight={true} />;
  }

  if (user) {
    return (
      <>
        <Loading text={t.auth.redirecting} fullHeight={true} />
        <Navigate to="/main" replace />
      </>
    );
  }

  if (params.path !== 'signIn' && params.path !== 'signUp') {
    return (
      <>
        <NotFound />
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '15px',
          }}
        >
          <Link to="/">
            <Button color="primary">{t.mainSection.backToWelcomeButton}</Button>
          </Link>
          <LanguageSwitcher></LanguageSwitcher>
        </Box>
        <Container
          sx={{
            display: 'flex',
            minHeight: 'calc(100vh - 2 * var(--footer-height))',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Suspense fallback={<Loading text={null} fullHeight={false} />}>
            <Box>
              {(params.path === 'signIn' && <SignIn auth={auth} />) ||
                (params.path === 'signUp' && <SignUp auth={auth} />)}
            </Box>
          </Suspense>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default Auth;
