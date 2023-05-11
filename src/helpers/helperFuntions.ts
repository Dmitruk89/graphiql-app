import { Auth, signOut } from 'firebase/auth';

export const setTokenExpirationToLocalStorage = (expirationStamp: number): void => {
  localStorage.setItem('DIV_RULEZZ_tokenExpirationStamp', `${expirationStamp}`);
};

export const removeTokenExpirationFromLocalStorage = (): void => {
  localStorage.removeItem('DIV_RULEZZ_tokenExpirationStamp');
};

export const checkTokenExpiration = (auth: Auth): void => {
  const expirationStamp = localStorage.getItem('DIV_RULEZZ_tokenExpirationStamp');
  const currentTimeStamp = new Date().getTime();
  if (expirationStamp) {
    if (currentTimeStamp > +expirationStamp) signOut(auth);
  }
};
