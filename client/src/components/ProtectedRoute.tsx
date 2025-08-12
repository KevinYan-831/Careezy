import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const tokenExp = typeof window !== 'undefined' ? localStorage.getItem('token_exp') : null;
  if (tokenExp) {
    const exp = parseInt(tokenExp, 10);
    if (!Number.isNaN(exp) && Date.now() > exp) {
      localStorage.removeItem('token');
      localStorage.removeItem('token_exp');
      localStorage.removeItem('user');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  if (!token) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;


