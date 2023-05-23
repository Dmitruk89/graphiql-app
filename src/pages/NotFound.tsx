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
          height: 'calc(100vh - 94px)',
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                {t.notFound.descrText}
              </Typography>
              <Button variant="contained">
                <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
                  {t.notFound.btnText}
                </Link>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                width={500}
                height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default NotFound;
