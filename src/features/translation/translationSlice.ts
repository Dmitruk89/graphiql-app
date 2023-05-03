import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { i18nState } from '../../types/types';

const supportedLangs = {
  en: 'English',
  ru: 'Russian',
};

const initialState = {
  lang: 'en',
  supportedLangs: { ...supportedLangs },
  translations: {
    en: {
      title: 'GraphiQL-clone',
      dontHaveAcc: "Don't have an account?",
      haveAcc: 'Already have an account?',
      signUp: 'Sign Up',
      signIn: 'Sign In',
      login: 'Enter login',
      email: 'Enter e-mail',
      password: 'Enter password',
      repeatPassword: 'Repeat password',
    },
    ru: {
      title: 'ГрафиКуЭль-клоун',
      dontHaveAcc: 'Нет аккаунта?',
      haveAcc: 'Уже есть аккаунт?',
      signUp: 'Зарегистрироваться',
      signIn: 'Войти',
      login: 'Введите логин',
      email: 'Введите e-mail',
      password: 'Введите пароль',
      repeatPassword: 'Повторите пароль',
    },
  },
};

export const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    switchLanguage: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

export const selectTranslations = (state: i18nState) => state.i18n.translations[state.i18n.lang];
export const { switchLanguage } = i18nSlice.actions;
export default i18nSlice.reducer;
