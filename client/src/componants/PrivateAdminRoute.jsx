import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
Navigate;
const PrivateAdminRoute = () => {
  const { existingUser } = useSelector((state) => state.hunguser);
  return existingUser.isAdmin ? <Outlet /> : <Navigate to="sign-in" />;
};

export default PrivateAdminRoute;
