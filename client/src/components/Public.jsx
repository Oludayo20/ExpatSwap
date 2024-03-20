import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Public = () => {
  return (
    <div className="h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Public;
