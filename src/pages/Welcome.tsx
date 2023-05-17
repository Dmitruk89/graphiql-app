import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { developers_en, developers_ru } from '../utils/constants';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import { IDeveloper, i18nState } from '../types/types';
import { descrdStyle, devStyle, titleStyle } from '../utils/style-const';
import LanguageSwitcher from '../components/LanguageSwitcher';
import DeveloperCard from '../components/Card';

import { getAuth } from 'firebase/auth';
import { useIdToken } from 'react-firebase-hooks/auth';
import Footer from '../components/Footer';

function Welcome() {
  const t = useSelector(selectTranslations);
  const lang = useSelector((state: i18nState) => state.i18n.lang);
  const auth = getAuth();
  const [user, loading] = useIdToken(auth);

  React.useEffect(() => {
    if (loading) {
      return;
    }
  }, [loading]);

  return (
    (loading && (
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    )) || (
      <>
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            maxWidth: '1400px',
            padding: '15px',
            margin: '20px auto',
          }}
        >
          {user ? (
            <Link to="/main">
              <Button color="primary">{t.welcomeSection.linkToMain}</Button>
            </Link>
          ) : (
            <>
              <Link to="/auth/signIn">
                <Button color="primary">{t.auth.signIn}</Button>
              </Link>
              <Link to="/auth/signUp">
                <Button color="primary">{t.auth.signUp}</Button>
              </Link>
            </>
          )}
          <LanguageSwitcher></LanguageSwitcher>
        </Box>
        <Container sx={{ height: 'calc(100vh - 12.75rem)' }}>
          <Typography variant="h1" component="h2" sx={titleStyle}>
            {t.welcomeSection.title}
          </Typography>
          ;
          <Typography component="p" sx={descrdStyle}>
            {t.welcomeSection.welcomeDescr}
          </Typography>
          <Box component="div" sx={devStyle}>
            {lang === 'en'
              ? developers_en.map((developer: IDeveloper, i) => (
                  <DeveloperCard key={i} developer={developer} />
                ))
              : developers_ru.map((developer: IDeveloper, i) => (
                  <DeveloperCard key={i} developer={developer} />
                ))}
          </Box>
        </Container>
        <Footer></Footer>
      </>
    )
  );
}

export default Welcome;
