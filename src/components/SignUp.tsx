import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TextField, Box, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { changeAuthState } from '../features/authentication/authenticationSlice';
import { selectTranslations } from '../features/translation/translationSlice';

import { SignUpInput } from '../types/types';

export function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = React.useState(false);

  const [isLoginError, setIsLoginError] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);
  const [isRepeatedPasswordError, setIsRepeatedPasswordError] = React.useState(false);

  const t = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const methods = useForm<SignUpInput>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onFormSubmit = (data: SignUpInput): void => {
    reset();
    console.log(data);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatedPassword = () => setShowRepeatedPassword((show) => !show);

  React.useEffect(() => {
    errors.login ? setIsLoginError(true) : setIsLoginError(false);
    errors.email ? setIsEmailError(true) : setIsEmailError(false);
    errors.password ? setIsPasswordError(true) : setIsPasswordError(false);
    errors.repeatedPassword ? setIsRepeatedPasswordError(true) : setIsRepeatedPasswordError(false);
  }, [errors.login, errors.password, errors.email, errors.repeatedPassword]);

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
            {...register('login', { required: 'login error' })}
          />
          {errors.login && <Box sx={{ color: 'red' }}>{errors.login.message}</Box>}
          <TextField
            error={isEmailError}
            fullWidth={true}
            label={t.auth.email}
            variant="outlined"
            type="text"
            {...register('email', { required: 'email error' })}
          />
          {errors.email && <Box sx={{ color: 'red' }}>{errors.email.message}</Box>}
          <TextField
            error={isPasswordError}
            fullWidth={true}
            label={t.auth.password}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'password error' })}
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
          <TextField
            error={isRepeatedPasswordError}
            fullWidth={true}
            label={t.auth.repeatPassword}
            variant="outlined"
            type={showRepeatedPassword ? 'text' : 'password'}
            {...register('repeatedPassword', { required: 'repeatedPassword error' })}
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
          {errors.repeatedPassword && (
            <Box sx={{ color: 'red' }}>{errors.repeatedPassword.message}</Box>
          )}
          <Button type="submit" variant="contained">
            {t.auth.signUp}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{t.auth.haveAcc}</Typography>
            <Button onClick={() => dispatch(changeAuthState('signIn'))}>{t.auth.signIn}</Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
