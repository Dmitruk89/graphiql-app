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

import { Auth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import { validationPatterns } from '../helpers/validationPatterns';
import { SignUpInput } from '../types/types';
import { InputErrorMessage } from './InputErrorMessage';
import { setTokenExpirationToLocalStorage } from '../helpers/helperFuntions';

export function SignUp(props: { auth: Auth }) {
  const methods = useForm<SignUpInput>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;
  const t = useSelector(selectTranslations);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = React.useState(false);
  const [isFirebaseLoading, setIsFirebaseLoading] = React.useState(false);
  const [isFirebaseError, setIsFirebaseError] = React.useState(false);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = React.useState('');
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);
  const [isRepeatedPasswordError, setIsRepeatedPasswordError] = React.useState(false);

  const watchPasswordValue = watch('password');

  const onFormSubmit = (data: SignUpInput): void => {
    setIsFirebaseLoading(true);
    createUserWithEmailAndPassword(props.auth, data.email, data.repeatedPassword)
      .then(({ user }) => user.getIdTokenResult())
      .then((data) => setTokenExpirationToLocalStorage(new Date(data.expirationTime).getTime()))
      .catch((err) => {
        if (err.message.includes('email-already-in-use'))
          setFirebaseErrorMessage(t.auth.emailInUse);
        setIsFirebaseError(true);
      })
      .finally(() => setIsFirebaseLoading(false));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatedPassword = () => setShowRepeatedPassword((show) => !show);

  React.useEffect(() => {
    errors.email ? setIsEmailError(true) : setIsEmailError(false);
    errors.password ? setIsPasswordError(true) : setIsPasswordError(false);
    errors.repeatedPassword ? setIsRepeatedPasswordError(true) : setIsRepeatedPasswordError(false);
  }, [errors.password, errors.email, errors.repeatedPassword]);

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
            {...register('email', {
              required: t.auth.emailRequireErrorMessage,
              pattern: {
                value: validationPatterns.email,
                message: t.auth.emailPatternErrorMessage,
              },
            })}
          />
          {errors.email && <InputErrorMessage error={errors.email.message} />}
          <TextField
            error={isPasswordError || isFirebaseError}
            fullWidth={true}
            label={t.auth.password}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: t.auth.passwordRequireErrorMessage,
              pattern: {
                value: validationPatterns.password,
                message: t.auth.passwordPatternErrorMessage,
              },
            })}
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
          <TextField
            error={isRepeatedPasswordError || isFirebaseError}
            fullWidth={true}
            label={t.auth.repeatPassword}
            variant="outlined"
            type={showRepeatedPassword ? 'text' : 'password'}
            {...register('repeatedPassword', {
              required: t.auth.repeatedPasswordRequireErrorMessage,
              pattern: {
                value: watchPasswordValue
                  ? new RegExp(
                      `^${watchPasswordValue
                        .replace(/\$/g, '\\$')
                        .replace(/\^/g, '\\^')
                        .replace(/\?/g, '\\?')
                        .replace(/\*/g, '\\*')
                        .replace(/\+/g, '\\+')
                        .replace(/\[/g, '\\[')
                        .replace(/\]/g, '\\]')
                        .replace(/\(/g, '\\(')
                        .replace(/\)/g, '\\)')}$`
                    )
                  : new RegExp(watchPasswordValue),
                message: t.auth.repeatedPasswordPatternErrorMessage,
              },
            })}
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
          {errors.repeatedPassword && <InputErrorMessage error={errors.repeatedPassword.message} />}
          <Button type="submit" variant="contained">
            {t.auth.signUp}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ textAlign: 'center' }}>{t.auth.haveAcc}</Typography>
            <Link to="/auth/signIn">
              <Button>{t.auth.signIn}</Button>
            </Link>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
