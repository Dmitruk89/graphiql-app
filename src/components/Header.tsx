import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageSwitcher from './LanguageSwitcher';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';

export default function Header() {
  const t = useSelector(selectTranslations);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t.header.title}
          </Typography>
          <Link style={{ color: 'inherit' }} to="/welcome">
            <Button color="inherit">{t.header.logoutButton}</Button>
          </Link>
          <LanguageSwitcher></LanguageSwitcher>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
