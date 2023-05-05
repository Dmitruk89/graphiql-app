import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';

export default function Header() {
  const t = useSelector(selectTranslations);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t.header.title}
          </Typography>
          <Button color="inherit">Logout</Button>
          <LanguageSwitcher></LanguageSwitcher>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
