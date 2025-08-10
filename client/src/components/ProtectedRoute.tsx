import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;


