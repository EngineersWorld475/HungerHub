import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { existingUser } = useSelector((state) => state.hunguser);
  return existingUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
