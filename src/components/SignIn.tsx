import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { TextField, Box, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';

import { InputErrorMessage } from './InputErrorMessage';
import { SignInInput } from '../types/types';

export function SignIn() {
  const t = useSelector(selectTranslations);
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

  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoginError, setIsLoginError] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);

  const navigate = useNavigate();

  const onFormSubmit = (data: SignInInput): void => {
    // there will be script to check input data in firebase
    console.log(data);
    navigate('/');
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
            {...register('login', { required: t.auth.loginRequireErrorMessage })}
          />
          {errors.login && <InputErrorMessage error={errors.login} />}
          <TextField
            error={isPasswordError}
            fullWidth={true}
            label={t.auth.password}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: t.auth.passwordRequireErrorMessage })}
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
          {errors.password && <InputErrorMessage error={errors.password} />}
          <Button type="submit" variant="contained">
            {t.auth.signIn}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{t.auth.dontHaveAcc}</Typography>
            <Link to="/auth/signUp">
              <Button>{t.auth.signUp}</Button>
            </Link>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
