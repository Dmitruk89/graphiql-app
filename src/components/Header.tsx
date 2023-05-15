import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LanguageSwitcher from './LanguageSwitcher';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import { useDispatch } from 'react-redux';
import { setDocsOpen } from '../features/graphql/graphqlSlice';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { RootState } from '../store';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { removeTokenExpirationFromLocalStorage } from '../helpers/helperFuntions';

export default function Header() {
  const t = useSelector(selectTranslations);
  const open = useSelector((state: RootState) => state.graphql.isDocsOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth();
  const [user] = useAuthState(auth);

  const drawerWidth = useSelector((state: RootState) => state.graphql.docsWidth);

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const handleDocsOpen = () => {
    dispatch(setDocsOpen(true));
  };

  const handleLogOutClick = () => {
    signOut(auth)
      .then(() => {
        removeTokenExpirationFromLocalStorage();
        navigate('/');
      })
      .catch(() => {
        console.error;
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            size="large"
            aria-label="open drawer"
            onClick={handleDocsOpen}
            edge="start"
            color="inherit"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <AssignmentIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t.header.title}
          </Typography>
          {user ? <Typography component="div">{user.email}</Typography> : <></>}
          <Button
            onClick={handleLogOutClick}
            color="info"
            variant="contained"
            sx={{ margin: ' 0 0.65rem 0 1rem' }}
          >
            {t.header.logoutButton}
          </Button>
          <LanguageSwitcher></LanguageSwitcher>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
