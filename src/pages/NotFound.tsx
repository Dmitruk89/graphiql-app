import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import Footer from '../components/Footer';

function NotFound() {
  const t = useSelector(selectTranslations);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - var(--footer-height))',
        }}
      >
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h1" textAlign="center">
              404
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
              {t.notFound.descrText}
            </Typography>
            <Button variant="contained">
              <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
                {t.notFound.btnText}
              </Link>
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
            <img
              src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=826&t=st=1685216939~exp=1685217539~hmac=b3b304afe31f76a4d987d7f650443ce3404775b340a5ac36c791b1c57985c1f9"
              alt=""
              width="100%"
              height="100%"
            />
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default NotFound;
