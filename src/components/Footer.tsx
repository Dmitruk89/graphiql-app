import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Typography } from '@mui/material';

export default function Footer() {
  return (
    <React.Fragment>
      <AppBar component="footer" position="static" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Link href="https://rs.school/" target="blanc">
            <div className="logo"></div>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup variant="text" color="inherit" aria-label="text button group">
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
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Typography>© 2023</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
