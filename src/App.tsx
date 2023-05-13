import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { apiSlice } from './features/api/apiSlice';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import { createTheme, ThemeProvider } from '@mui/material';

// create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#426892',
    },
  },
});

export function App() {
  return (
    <Routes>
      <Route index element={<Welcome />} />
      <Route path="/auth/:path" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
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
