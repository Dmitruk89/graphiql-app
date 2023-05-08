import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import { Button, Container } from '@mui/material';

function Welcome() {
  const t = useSelector(selectTranslations);

  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/auth/signIn">
          <Button>{t.auth.signIn}</Button>
        </Link>
        <Link to="/auth/signUp">
          <Button>{t.auth.signUp}</Button>
        </Link>
      </Container>
    </>
  );
}

export default Welcome;
