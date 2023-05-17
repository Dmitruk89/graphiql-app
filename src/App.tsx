import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useIdToken } from 'react-firebase-hooks/auth';
import { store } from './store';
import { Provider } from 'react-redux';
import { apiSlice } from './features/api/apiSlice';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import Welcome from './pages/Welcome';
import Main from './pages/Main';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import { checkTokenExpiration } from './helpers/helperFuntions';
import PageLayout from './components/PageLayout';

export function App() {
  const auth = getAuth();
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
    <Routes>
      <Route index element={<Welcome />} />
      <Route path="/auth/:path" element={<Auth />} />
      <Route path="/" element={<PageLayout />}>
        <Route path="main" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApiProvider>
  );
}
