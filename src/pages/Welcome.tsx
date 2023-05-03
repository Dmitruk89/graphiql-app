import DeveloperCard from '../components/Card';
import React from 'react';
import Box from '@mui/material/Box';
import { developers } from '../utils/constants';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import { IDeveloper } from 'types/types';

function Welcome() {
  const t = useSelector(selectTranslations);
  return (
    <>
      <Typography
        variant="h1"
        component="h2"
        sx={{ margin: '20px auto 0', fontSize: '48px', fontWeight: 500, textAlign: 'center' }}
      >
        {t.title}
      </Typography>
      ;
      <Typography
        component="p"
        sx={{ fontSize: '28px', width: '60%', textAlign: 'center', margin: '0 auto  20px' }}
      >
        {t.welcomeDescr}
      </Typography>
      <Typography component="p" sx={{ fontSize: '28px', width: '60%', margin: '0 auto' }}>
        {t.welcomeFirstChar}
      </Typography>
      <Typography component="p" sx={{ fontSize: '28px', width: '60%', margin: '0 auto' }}>
        {t.welcomeSecondChar}
      </Typography>
      <Typography component="p" sx={{ fontSize: '28px', width: '60%', margin: '0 auto' }}>
        {t.welcomeThirdChar}
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
        {developers.map((developer: IDeveloper, i) => (
          <DeveloperCard key={i} developer={developer} />
        ))}
      </Box>
    </>
  );
}

export default Welcome;
