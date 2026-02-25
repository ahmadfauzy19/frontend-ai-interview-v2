import { Navigate, Outlet } from 'react-router-dom';
import { getUserAuth } from '../utils/authUtils';

const ProtectedRoute = () => {
  const isAuthenticated = getUserAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
