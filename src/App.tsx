import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import { store } from './store';
import { Provider } from 'react-redux';
import { apiSlice } from './features/api/apiSlice';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import Welcome from './pages/Welcome';
import Layout from './components/Layout';

export function App() {
  return (
    <Routes>
      <Route index element={<Welcome />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
      </Route>
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
