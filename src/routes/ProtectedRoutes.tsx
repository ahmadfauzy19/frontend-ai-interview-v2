import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';

type ProtectedRouteProps = {
  role?: string | string[];
};

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { isAuthenticated, userData } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (role) {
    const roles = Array.isArray(role) ? role : [role];

    if (!roles.includes(userData?.role)) {
      return <Navigate to="/403" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;