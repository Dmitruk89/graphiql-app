import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { TextField, Box, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import { validationPatterns } from '../helpers/validationPatterns';
import { SignUpInput } from '../types/types';
import { InputErrorMessage } from './InputErrorMessage';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../features/authentication/authenticationSlice';

export function SignUp() {
  const dispatch = useDispatch();
  const t = useSelector(selectTranslations);
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

  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);
  const [isRepeatedPasswordError, setIsRepeatedPasswordError] = React.useState(false);

  const watchPasswordValue = watch('password');

  const navigate = useNavigate();

  const onFormSubmit = (data: SignUpInput): void => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.repeatedPassword)
      .then(({ user }) => {
        user.getIdToken().then((token) => {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: token,
            })
          );
          navigate('/home');
          reset();
        });
      })
      .catch(() => {
        console.error;
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatedPassword = () => setShowRepeatedPassword((show) => !show);

  React.useEffect(() => {
    errors.email ? setIsEmailError(true) : setIsEmailError(false);
    errors.password ? setIsPasswordError(true) : setIsPasswordError(false);
    errors.repeatedPassword ? setIsRepeatedPasswordError(true) : setIsRepeatedPasswordError(false);
  }, [errors.password, errors.email, errors.repeatedPassword]);

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
            error={isEmailError}
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
          {errors.email && <InputErrorMessage error={errors.email} />}
          <TextField
            error={isPasswordError}
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
          {errors.password && <InputErrorMessage error={errors.password} />}
          <TextField
            error={isRepeatedPasswordError}
            fullWidth={true}
            label={t.auth.repeatPassword}
            variant="outlined"
            type={showRepeatedPassword ? 'text' : 'password'}
            {...register('repeatedPassword', {
              required: t.auth.repeatedPasswordRequireErrorMessage,
              pattern: {
                value: new RegExp(`^${watchPasswordValue}$`),
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
          {errors.repeatedPassword && <InputErrorMessage error={errors.repeatedPassword} />}
          <Button type="submit" variant="contained">
            {t.auth.signUp}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{t.auth.haveAcc}</Typography>
            <Link to="/auth/signIn">
              <Button>{t.auth.signIn}</Button>
            </Link>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
