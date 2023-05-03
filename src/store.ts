import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import i18nReducer from './features/translation/translationSlice';
import graphqlReducer from './features/graphql/graphqlSlice';
import translationReducer from './features/translation/translationSlice';

export const store = configureStore({
  reducer: {
    graphql: graphqlReducer,
    translation: translationReducer,
    i18n: i18nReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
