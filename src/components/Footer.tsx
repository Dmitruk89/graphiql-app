import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const theme = useTheme();
  const isSMScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <React.Fragment>
      <AppBar
        component="footer"
        position="static"
        color="primary"
        sx={{ top: 'auto', bottom: 0, padding: '15px' }}
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
      </AppBar>
    </React.Fragment>
  );
}
