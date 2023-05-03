import React from 'react';
import { TextField, Box, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { changeAuthState } from '../features/authentication/authenticationSlice';

export function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
        <Button onClick={() => dispatch(changeAuthState('signUp'))}>Sign up</Button>
      </Box>
    </>
  );
}
