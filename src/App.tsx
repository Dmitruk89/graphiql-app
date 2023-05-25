import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useIdToken } from 'react-firebase-hooks/auth';
import { store } from './store';
import { Provider } from 'react-redux';
import { apiSlice } from './features/api/apiSlice';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
const Welcome = lazy(() => import('./pages/Welcome'));
const Main = lazy(() => import('./pages/Main'));
const Auth = lazy(() => import('./pages/Auth'));
import NotFound from './pages/NotFound';
import { checkTokenExpiration } from './helpers/helperFuntions';
import { createTheme, ThemeProvider } from '@mui/material';
import { Loading } from './components/Loading';
import { useSelector } from 'react-redux';
import { selectTranslations } from './features/translation/translationSlice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#426892',
    },
  },
});

export function App() {
  const auth = getAuth();
  const t = useSelector(selectTranslations);
  const [loading] = useIdToken(auth);

  React.useEffect(() => {
    if (loading) {
      checkTokenExpiration(auth);
      return;
    }
    setInterval(() => {
      checkTokenExpiration(auth);
    }, 60000);
  }, [auth, loading]);

  return (
    <Suspense fallback={<Loading text={t.loader.app} fullHeight={true} />}>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="/auth/:path" element={<Auth />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export function WrappedApp() {
  return (
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </ApiProvider>
  );
}
