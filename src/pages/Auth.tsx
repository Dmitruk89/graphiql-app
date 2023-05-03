import React from 'react';
import { Container, Box } from '@mui/material';
import type { RootState } from '../store';
import { useSelector } from 'react-redux';

import Header from '../components/Header';

import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

function Auth() {
  const authState = useSelector((state: RootState) => state.auth.currentState);

  return (
    <>
      <Header></Header>
      <Container sx={{ margin: '1rem 0' }}>
        <Box>{authState === 'signIn' ? <SignIn /> : <SignUp />}</Box>
      </Container>
    </>
  );
}

export default Auth;
