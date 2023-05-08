import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

function Auth() {
  const params = useParams();

  return (
    <Container sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ margin: 'auto' }}>{params.path === 'signIn' ? <SignIn /> : <SignUp />}</Box>
    </Container>
  );
}

export default Auth;
