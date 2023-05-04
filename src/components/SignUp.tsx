import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TextField, Box, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { changeAuthState } from '../features/authentication/authenticationSlice';
import { selectTranslations } from '../features/translation/translationSlice';
import { validationPatterns } from '../helpers/validationPatterns';
import { SignUpInput } from '../types/types';
import { InputErrorMessage } from './InputErrorMessage';

export function SignUp() {
  const t = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const methods = useForm<SignUpInput>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = React.useState(false);

  const [isLoginError, setIsLoginError] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);
  const [isRepeatedPasswordError, setIsRepeatedPasswordError] = React.useState(false);

  const watchPasswordValue = watch('password');
  const passwordValue = React.useRef<HTMLInputElement>(null);

  const onFormSubmit = (data: SignUpInput): void => {
    // there will be script to post input data to firebase
    console.log(data);
    console.log(watchPasswordValue);
    reset();
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
            label={t.login}
            variant="outlined"
            type="text"
            {...register('login', {
              required: validationPatterns.login.requireErrorMessage,
              pattern: {
                value: validationPatterns.login.pattern,
                message: validationPatterns.login.patternErrorMessage,
              },
            })}
          />
          {errors.login && <InputErrorMessage error={errors.login} />}
          <TextField
            error={isEmailError}
            fullWidth={true}
            label={t.email}
            variant="outlined"
            type="text"
            {...register('email', {
              required: validationPatterns.email.requireErrorMessage,
              pattern: {
                value: validationPatterns.email.pattern,
                message: validationPatterns.email.patternErrorMessage,
              },
            })}
          />
          {errors.email && <InputErrorMessage error={errors.email} />}
          <TextField
            inputRef={passwordValue}
            error={isPasswordError}
            fullWidth={true}
            label={t.password}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: validationPatterns.password.requireErrorMessage,
              pattern: {
                value: validationPatterns.password.pattern,
                message: validationPatterns.password.patternErrorMessage,
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
          {errors.password && <InputErrorMessage error={errors.password} />}
          <TextField
            error={isRepeatedPasswordError}
            fullWidth={true}
            label={t.repeatPassword}
            variant="outlined"
            type={showRepeatedPassword ? 'text' : 'password'}
            {...register('repeatedPassword', {
              required: validationPatterns.repeatedPassword.requireErrorMessage,
              pattern: {
                value: new RegExp(`^${watchPasswordValue}`),
                message: validationPatterns.repeatedPassword.patternErrorMessage,
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
          {errors.repeatedPassword && <InputErrorMessage error={errors.repeatedPassword} />}
          <Button type="submit" variant="contained">
            {t.signUp}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{t.haveAcc}</Typography>
            <Button onClick={() => dispatch(changeAuthState('signIn'))}>{t.signIn}</Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
