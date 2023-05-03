import React from 'react';
import { Container, Box } from '@mui/material';
import type { RootState } from '../store';
import { useSelector } from 'react-redux';

import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

function Auth() {
  const authState = useSelector((state: RootState) => state.auth.currentState);

  return (
    <>
      <Container sx={{ margin: '1rem 0' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            margin: 'auto',
            maxWidth: '300px',
          }}
        >
          {authState === 'signIn' ? <SignIn /> : <SignUp />}
        </Box>
      </Container>
    </>
  );
}

export default Auth;
