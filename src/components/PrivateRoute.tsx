import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>; // Or a loading spinner
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
