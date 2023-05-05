import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

export default function PageLayout() {
  return (
    <>
      <Header />
      <div className="layout">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
