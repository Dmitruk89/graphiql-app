import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { apiSlice } from './features/api/apiSlice';
import { ApiProvider } from '@reduxjs/toolkit/query/react';

import Home from './pages/Home';
import Welcome from './pages/WelcomeExample';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import PageLayout from './components/PageLayout';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        {/* place for private routes */}
        <Route index element={<Home />} />
      </Route>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/auth/:path" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
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
