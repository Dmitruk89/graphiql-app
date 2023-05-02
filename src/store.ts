import { configureStore } from '@reduxjs/toolkit';
import i18nReducer from './features/translation/translationSlice';
import translationReducer from './features/translation/translationSlice';

export const store = configureStore({
  reducer: {
    translation: translationReducer,
    i18n: i18nReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
