import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { developers_en, developers_ru } from '../utils/constants';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import { IDeveloper, i18nState } from '../types/types';
import { descrStyle, devStyle, titleStyle } from '../utils/style-const';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Loading } from '../components/Loading';
const DeveloperCard = lazy(() => import('../components/Card'));
const WelcomePageVideo = lazy(() => import('../components/WelcomePageVideo'));

import { getAuth } from 'firebase/auth';
import { useIdToken } from 'react-firebase-hooks/auth';
import Footer from '../components/Footer';
import Features from '../components/Features';

function Welcome() {
  const t = useSelector(selectTranslations);
  const lang = useSelector((state: i18nState) => state.i18n.lang);
  const auth = getAuth();
  const [user, loading] = useIdToken(auth);

  if (loading) {
    return <Loading text={t.loader.loading} fullHeight={true} />;
  }

  return (
    <>
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '15px',
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 2 * var(--footer-height))',
        }}
      >
        <Divider />
        <Container
          sx={{
            marginBottom: '50px',
          }}
        >
          <Typography variant="h1" component="h2" sx={titleStyle}>
            {t.welcomeSection.title}
          </Typography>
          <Typography component="p" sx={descrStyle}>
            {t.welcomeSection.welcomeDescr}
          </Typography>
          <Typography component="p" sx={descrStyle}>
            {t.welcomeSection.welcomeProj}{' '}
            <a className="customLink" href="https://rs.school/react/">
              {t.welcomeSection.welcomeLink}
            </a>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '4px solid rgb(153, 172, 190)',
              borderRadius: '5px',
              borderImageSlice: 1,
            }}
          >
            <Suspense fallback={<Loading text={null} fullHeight={false} />}>
              <WelcomePageVideo />
            </Suspense>
          </Box>
        </Container>
        <Divider />
        <Container sx={{ padding: '50px 0 100px' }}>
          <Typography variant="h1" component="h4" sx={titleStyle}>
            {t.welcomeSection.developers}
          </Typography>
          <Suspense fallback={<Loading text={null} fullHeight={false} />}>
            <Box component="div" sx={devStyle}>
              {lang === 'en'
                ? developers_en.map((developer: IDeveloper, i) => (
                    <DeveloperCard key={i} developer={developer} />
                  ))
                : developers_ru.map((developer: IDeveloper, i) => (
                    <DeveloperCard key={i} developer={developer} />
                  ))}
            </Box>
          </Suspense>
        </Container>
        <Divider />
        <Features />
      </Box>
      <Footer />
    </>
  );
}

export default Welcome;
