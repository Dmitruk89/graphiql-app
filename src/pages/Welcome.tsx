import DeveloperCard from '../components/Card';
import React from 'react';
import Box from '@mui/material/Box';
import { developers_en, developers_ru } from '../utils/constants';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import { IDeveloper, i18nState } from 'types/types';

function Welcome() {
  const t = useSelector(selectTranslations);
  const lang = useSelector((state: i18nState) => state.i18n.lang);
  return (
    <>
      <Typography
        variant="h1"
        component="h2"
        sx={{ margin: '120px auto 0', fontSize: '48px', fontWeight: 500, textAlign: 'center' }}
      >
        {t.welcomeSection.title}
      </Typography>
      ;
      <Typography
        component="p"
        sx={{ fontSize: '28px', width: '60%', textAlign: 'center', margin: '0 auto  20px' }}
      >
        {t.welcomeSection.welcomeDescr}
      </Typography>
      <Box
        component="div"
        sx={{
          width: '1400px',
          margin: ' 20px auto 0',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {lang === 'en'
          ? developers_en.map((developer: IDeveloper, i) => (
              <DeveloperCard key={i} developer={developer} />
            ))
          : developers_ru.map((developer: IDeveloper, i) => (
              <DeveloperCard key={i} developer={developer} />
            ))}
      </Box>
    </>
  );
}

export default Welcome;
