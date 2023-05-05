import { Button, Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/auth/signIn">
          <Button>SignIn</Button>
        </Link>
        <Link to="/auth/signUp">
          <Button>SignUp</Button>
        </Link>
      </Container>
    </>
  );
}

export default Welcome;
