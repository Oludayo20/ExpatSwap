import React from 'react';
import UseTheme from '../hooks/useTheme';
import Router from '../router/Router';

const Layout = () => {
  return (
    <UseTheme>
      <Router />
    </UseTheme>
  );
};

export default Layout;
