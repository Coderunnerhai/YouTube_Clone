import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from "../App";
import Register from './Register';
import SignIn from './Signin';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default MainRoutes;