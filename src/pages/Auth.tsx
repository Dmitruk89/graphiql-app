import React from 'react';
import {
  Container,
  TextField,
  Box,
  Link,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';

import Header from '../components/Header';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Auth() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const signIn = (): JSX.Element => {
    return (
      <>
        <TextField fullWidth={true} label="Login" variant="outlined" type="text" />
        <TextField
          fullWidth={true}
          label="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained">Sign In</Button>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Dont have an account?</Typography>
          <Link>
            <Button>Sign up</Button>
          </Link>
        </Box>
      </>
    );
  };

  const signUp = (): JSX.Element => {
    return (
      <>
        <TextField fullWidth={true} label="Enter Login" variant="outlined" type="text" />
        <TextField fullWidth={true} label="Enter e-mail" variant="outlined" type="email" />
        <TextField
          fullWidth={true}
          label="Enter Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          error
          fullWidth={true}
          label="Repeat Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained">Sign Up</Button>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Already have an account?</Typography>
          <Link>
            <Button>Sign in</Button>
          </Link>
        </Box>
      </>
    );
  };

  return (
    <>
      <Header></Header>
      <Container sx={{ margin: '1rem 0' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            margin: 'auto',
            maxWidth: '300px',
          }}
        ></Box>
      </Container>
    </>
  );
}

export default Auth;
