export const validationPatterns = {
  login: /^[A-Za-z]{3,}$/,
  email: /^(?=.*[A-Z])(?=.*\d)(?=.*[$!%*#?&])[A-Za-z\d$!%*#?&.]{8,}@{1}([A-Za-z]+\.)([a-z]{2,5})$/,
  password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};
