import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TextField, Box, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { changeAuthState } from '../features/authentication/authenticationSlice';
import { selectTranslations } from '../features/translation/translationSlice';

import { SignInInput } from '../types/types';

export function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoginError, setIsLoginError] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);

  const t = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const methods = useForm<SignInInput>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onFormSubmit = (data: SignInInput): void => {
    // there will be script to check input data in firebase
    console.log(data);
    reset();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  React.useEffect(() => {
    errors.login ? setIsLoginError(true) : setIsLoginError(false);
    errors.password ? setIsPasswordError(true) : setIsPasswordError(false);
  }, [errors.login, errors.password]);

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            margin: 'auto',
            maxWidth: '300px',
          }}
        >
          <TextField
            error={isLoginError}
            fullWidth={true}
            label={t.auth.login}
            variant="outlined"
            type="text"
            {...register('login', { required: 'Please enter your login' })}
          />
          {errors.login && <Box sx={{ color: 'red' }}>{errors.login.message}</Box>}
          <TextField
            error={isPasswordError}
            fullWidth={true}
            label={t.auth.password}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Please enter your password' })}
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
          {errors.password && <Box sx={{ color: 'red' }}>{errors.password.message}</Box>}
          <Button type="submit" variant="contained">
            {t.auth.signIn}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{t.auth.dontHaveAcc}</Typography>
            <Button onClick={() => dispatch(changeAuthState('signUp'))}>{t.auth.signUp}</Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
