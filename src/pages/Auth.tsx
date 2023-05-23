import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';

import LanguageSwitcher from '../components/LanguageSwitcher';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';
import Footer from '../components/Footer';

function Auth() {
  const t = useSelector(selectTranslations);
  const params = useParams();

  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '6rem' }}
        >
          <Link to="/">
            <Button color="primary">{t.notFound.btnText}</Button>
          </Link>
          <LanguageSwitcher></LanguageSwitcher>
        </Box>
        <Container sx={{ display: 'flex', height: 'calc(100vh - var(--footer-height) - 6rem)' }}>
          <Box sx={{ margin: 'auto' }}>{params.path === 'signIn' ? <SignIn /> : <SignUp />}</Box>
        </Container>
      </Container>
      <Footer />
    </>
  );
}

export default Auth;
