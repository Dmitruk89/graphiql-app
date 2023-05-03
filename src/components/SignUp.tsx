import React from 'react';
import { TextField, Box, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { changeAuthState } from '../features/authentication/authenticationSlice';

export function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatedPassword = () => setShowRepeatedPassword((show) => !show);
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
        fullWidth={true}
        label="Repeat Password"
        variant="outlined"
        type={showRepeatedPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowRepeatedPassword}
                edge="end"
              >
                {showRepeatedPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained">Sign Up</Button>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Already have an account?</Typography>
        <Button onClick={() => dispatch(changeAuthState('signIn'))}>Sign in</Button>
      </Box>
    </>
  );
}
