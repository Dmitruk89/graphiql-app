export const validationPatterns = {
  email: /^([-$!%*#?&\w]\.?){3,}@{1}([a-z]\.?)+\.([a-z]{2,5})$/i,
  password: /^(?=.*[a-z])(?=.*\d)(?=.*[-_@$!%*#?&])([-$!%*#?&\w]){8,}$/i,
};
