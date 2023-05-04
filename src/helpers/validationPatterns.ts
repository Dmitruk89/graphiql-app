export const validationPatterns = {
  login: {
    pattern: /^[A-Za-z]{3,}$/,
    patternErrorMessage: 'Login must contain at least 3 and only latin letters',
    requireErrorMessage: 'Login is required',
  },
  email: {
    pattern:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$!%*#?&])[A-Za-z\d$!%*#?&.]{8,}@{1}([A-Za-z]+\.)([a-z]{2,5})$/,
    patternErrorMessage:
      'E-mail must contain minimum 8 symbols, at least one letter, one digit, one special character ($!%*#?&) only before @',
    requireErrorMessage: 'E-mail is required',
  },
  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    patternErrorMessage:
      'Password must contain minimum 8 symbols, at least one letter, one digit, one special character ($!%*#?&)',
    requireErrorMessage: 'Password is required',
  },
  repeatedPassword: {
    patternErrorMessage: 'Password mismatch',
    requireErrorMessage: 'Please repeat your password',
  },
};
