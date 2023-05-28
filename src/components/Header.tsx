import React, { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LanguageSwitcher from './LanguageSwitcher';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDocsOpen } from '../features/graphql/graphqlSlice';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { RootState } from '../store';
const UserMenu = lazy(() => import('./UserMenu'));
import { useScrollTrigger } from '@mui/material';
import { Loading } from './Loading';

export default function Header() {
  const open = useSelector((state: RootState) => state.graphql.isDocsOpen);
  const dispatch = useDispatch();

  const drawerWidth = useSelector((state: RootState) => state.graphql.docsWidth);

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  interface ElevationProps {
    children: React.ReactElement;
  }

  function ElevationScroll(props: ElevationProps) {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 6 : 0,
    });
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.complex,
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.up(1000)]: {
      ...(open && {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.complex,
        }),
        marginLeft: 0,
        width: `calc(100% - ${drawerWidth}px)`,
      }),
    },
  }));

  const handleDocsOpen = () => {
    dispatch(setDocsOpen(true));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll>
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
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
              <Suspense fallback={<Loading text={null} fullHeight={false} />}>
                <UserMenu></UserMenu>
              </Suspense>
              <LanguageSwitcher></LanguageSwitcher>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}
