import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import {
  TextField,
  Box,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import { InputErrorMessage } from './InputErrorMessage';
import { SignInInput } from '../types/types';
import { setTokenExpirationToLocalStorage } from '../helpers/helperFuntions';

export function SignIn() {
  const methods = useForm<SignInInput>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const t = useSelector(selectTranslations);
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const [showPassword, setShowPassword] = React.useState(false);
  const [isFirebaseLoading, setIsFirebaseLoading] = React.useState(false);
  const [isFirebaseError, setIsFirebaseError] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);

  const onFormSubmit = (data: SignInInput): void => {
    setIsFirebaseLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user }) => user.getIdTokenResult())
      .then((data) => setTokenExpirationToLocalStorage(new Date(data.expirationTime).getTime()))
      .catch(() => {
        setIsFirebaseError(true);
        setIsEmailError(true);
        setIsPasswordError(true);
      })
      .finally(() => setIsFirebaseLoading(false));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  React.useEffect(() => {
    errors.email ? setIsEmailError(true) : setIsEmailError(false);
    errors.password ? setIsPasswordError(true) : setIsPasswordError(false);
  }, [errors.email, errors.password]);

  React.useEffect(() => {
    if (loading) return;
    if (user) {
      setIsFirebaseError(false);
      setIsEmailError(false);
      setIsPasswordError(false);
      navigate('/main');
    }
  }, [user, loading, error, navigate]);

  return (
    (loading && (
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    )) ||
    (user && <Typography>{t.auth.redirecting}</Typography>) ||
    (isFirebaseLoading && (
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>{t.auth.connectingToFirebase}</Typography>
        <CircularProgress color="inherit" />
      </Box>
    )) || (
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
            {isFirebaseError && <InputErrorMessage error={t.auth.wrongEmail} />}
            <TextField
              error={isEmailError}
              fullWidth={true}
              label={t.auth.email}
              variant="outlined"
              type="text"
              {...register('email', { required: t.auth.emailRequireErrorMessage })}
            />
            {errors.email && <InputErrorMessage error={errors.email.message} />}
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
            {errors.password && <InputErrorMessage error={errors.password.message} />}
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
    )
  );
}
