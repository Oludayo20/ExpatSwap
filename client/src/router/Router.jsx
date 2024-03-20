import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateUser from '../pages/CreateUser';
import AllUser from '../pages/AllUser';
import Public from '../components/Public';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/all-user" />} />
      <Route element={<Public />}>
        <Route path="create-user" element={<CreateUser />} />
        <Route path="all-user" element={<AllUser />} />
      </Route>
    </Routes>
  );
};

export default Router;
