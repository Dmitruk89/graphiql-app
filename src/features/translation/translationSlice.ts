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
      welcomeDescr:
        'GraphQL is a syntax that describes how to query data, and is mainly used by the client to download data from the server. GraphQL has three main characteristics:',
      welcomeFirstChar: 'Allows the client to specify exactly what data they need.',
      welcomeSecondChar: 'Facilitates the aggregation of data from multiple sources.',
      welcomeThirdChar: 'Uses a type system to describe data.',
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
      title: 'ГрафиКуЭль-клон',
      welcomeDescr:
        'ГрафиКуЭль это синтаксис, который описывает как запрашивать данные, и, в основном, используется клиентом для загрузки данных с сервера. ГрафиКуЭль имеет три основные характеристики:',
      welcomeFirstChar: 'Позволяет клиенту точно указать, какие данные ему нужны.',
      welcomeSecondChar: 'Облегчает агрегацию данных из нескольких источников.',
      welcomeThirdChar: 'Использует систему типов для описания данных.',
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
