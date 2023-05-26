import React, { lazy, Suspense } from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
const UserMenu = lazy(() => import('./UserMenu'));
import { useScrollTrigger } from '@mui/material';
import { Loading } from './Loading';

export default function Header() {
  const t = useSelector(selectTranslations);
  const open = useSelector((state: RootState) => state.graphql.isDocsOpen);
  const dispatch = useDispatch();

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
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.up(1000)]: {
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        width: `calc(100% - ${drawerWidth}px)`,
      }),
    },
  }));

  const trigger = useScrollTrigger({
    disableHysteresis: false,
    threshold: 0,
  });

  const handleDocsOpen = () => {
    dispatch(setDocsOpen(true));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ height: trigger ? '40px' : '80px' }}>
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
          <Suspense fallback={<Loading text={null} fullHeight={false} />}>
            <UserMenu></UserMenu>
          </Suspense>
          <LanguageSwitcher></LanguageSwitcher>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
