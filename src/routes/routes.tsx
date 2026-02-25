import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/main';
import { getUserAuth } from '../utils/authUtils';
import ProtectedRoute from './ProtectedRoutes';

const AuthPage = React.lazy(() => import('../pages/auth'));
const InterviewPage = React.lazy(() => import('../pages/interviews'));
const NotFoundPage = React.lazy(() => import('../pages/fallback/not-found'));

const AppRoutes = () => {
  const isAuthenticated = getUserAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/interviews" /> : <AuthPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/interviews" element={<InterviewPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
