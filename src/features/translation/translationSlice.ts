import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { i18nState } from '../../types/types';
import enJSON from './en.json' assert { type: 'json' };
import ruJSON from './ru.json' assert { type: 'json' };

const supportedLangs = {
  en: 'English',
  ru: 'Russian',
};

const initialState = {
  lang: 'en',
  supportedLangs: { ...supportedLangs },
  translations: {
    en: enJSON,
    ru: ruJSON,
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
