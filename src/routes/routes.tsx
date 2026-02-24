import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AuthPage = React.lazy(() => import('../pages/auth'));
const NotFoundPage = React.lazy(() => import('../pages/fallback/not-found'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
