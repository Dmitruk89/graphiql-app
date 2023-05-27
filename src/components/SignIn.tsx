import React from 'react';
import { Link } from 'react-router-dom';
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

import { Auth, signInWithEmailAndPassword } from 'firebase/auth';

import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import { InputErrorMessage } from './InputErrorMessage';
import { SignInInput } from '../types/types';
import { setTokenExpirationToLocalStorage } from '../helpers/helperFuntions';

export function SignIn(props: { auth: Auth }) {
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

  const [showPassword, setShowPassword] = React.useState(false);
  const [isFirebaseLoading, setIsFirebaseLoading] = React.useState(false);
  const [isFirebaseError, setIsFirebaseError] = React.useState(false);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = React.useState('');
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);

  const onFormSubmit = (data: SignInInput): void => {
    setIsFirebaseLoading(true);
    signInWithEmailAndPassword(props.auth, data.email, data.password)
      .then(({ user }) => user.getIdTokenResult())
      .then((data) => setTokenExpirationToLocalStorage(new Date(data.expirationTime).getTime()))
      .catch((err) => {
        if (err.message.includes('invalid-email')) setFirebaseErrorMessage(t.auth.wrongEmail);
        if (err.message.includes('user-not-found')) setFirebaseErrorMessage(t.auth.wrongUser);
        if (err.message.includes('wrong-password')) setFirebaseErrorMessage(t.auth.wrongPassword);
        setIsFirebaseError(true);
      })
      .finally(() => setIsFirebaseLoading(false));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  React.useEffect(() => {
    errors.email ? setIsEmailError(true) : setIsEmailError(false);
    errors.password ? setIsPasswordError(true) : setIsPasswordError(false);
  }, [errors.email, errors.password]);

  if (isFirebaseLoading) {
    return (
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
    );
  }

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
          {isFirebaseError && <InputErrorMessage error={firebaseErrorMessage} />}
          <TextField
            error={isEmailError || isFirebaseError}
            fullWidth={true}
            label={t.auth.email}
            variant="outlined"
            type="text"
            {...register('email', { required: t.auth.emailRequireErrorMessage })}
          />
          {errors.email && <InputErrorMessage error={errors.email.message} />}
          <TextField
            error={isPasswordError || isFirebaseError}
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
  );
}
