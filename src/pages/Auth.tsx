import React from 'react';
import { Container, Box } from '@mui/material';
import type { RootState } from '../store';
import { useSelector } from 'react-redux';

import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

function Auth() {
  const authState = useSelector((state: RootState) => state.auth.currentState);

  return (
    <Container sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ margin: 'auto' }}>{authState === 'signIn' ? <SignIn /> : <SignUp />}</Box>
    </Container>
  );
}

export default Auth;
