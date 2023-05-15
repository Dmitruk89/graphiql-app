export const validationPatterns = {
  email: /^(?=.*[a-z])(?=.*\d)(?=.*[-_$!%*#?&])(\.*).{8,}@{1}([a-z]+\.)([a-z]{2,5})$/i,
  password: /^(?=.*[a-z])(?=.*\d)(?=.*[-_@$!%*#?&]).{8,}$/i,
};
