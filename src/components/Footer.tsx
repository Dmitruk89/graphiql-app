import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function Footer() {
  const theme = useTheme();
  const isSMScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const drawerWidth = useSelector((state: RootState) => state.graphql.docsWidth);
  const open = useSelector((state: RootState) => state.graphql.isDocsOpen);
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    component?: 'header' | 'footer';
  }
  const FooterContainer = styled(AppBar, {
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
        marginLeft: `${drawerWidth}px`,
        width: `calc(100% - ${drawerWidth}px)`,
      }),
    },
  }));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <FooterContainer
        open={open}
        component="footer"
        sx={{ top: 'auto', bottom: 0, position: 'static', marginLeft: 0 }}
      >
        <Toolbar>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '@media (min-width:600px)': {
                alignItems: 'space-between',
                flexDirection: 'row',
              },
            }}
          >
            <Link href="https://rs.school/" target="blanc">
              <div className="logo"></div>
            </Link>
            <Box sx={{ flexGrow: 1 }}></Box>
            <ButtonGroup
              variant="text"
              color="inherit"
              aria-label="text button group"
              orientation={isSMScreen ? 'horizontal' : 'vertical'}
            >
              <Button href="https://github.com/Dmitruk89" target="blanc">
                Dmitruk89
              </Button>
              <Button href="https://github.com/IrinaBukley23" target="blanc">
                IrinaBukley23
              </Button>
              <Button href="https://github.com/liestreadt" target="blanc">
                liestreadt
              </Button>
            </ButtonGroup>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Typography>© 2023</Typography>
          </Box>
        </Toolbar>
      </FooterContainer>
    </Box>
  );
}
