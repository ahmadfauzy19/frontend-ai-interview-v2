import { useAuth } from '@/context/auth/AuthContext';
import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';

const InterviewPage = React.lazy(() => import('@/pages/interviews'));
const NotFoundPage = React.lazy(() => import('@/pages/fallback/not-found'));
const MainLayout = React.lazy(() => import('@/layout/main'));
const AuthLayout = React.lazy(() => import('@/pages/auth'));
const LoginPage = React.lazy(() => import('@/pages/auth/login'));
const SignUpPage = React.lazy(() => import('@/pages/auth/sign-up'));
const CallInterviewPage = React.lazy(() => import('@/pages/interviews/call'));
const DetailInterviewPage = React.lazy(
  () => import('@/pages/interviews/detail')
);
const EditInterviewPage = React.lazy(
  () => import('@/pages/interviews/detail/edit')
);

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/interviews" /> : <LoginPage />
          }
        />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/interviews" element={<InterviewPage />} />
          <Route path="/interviews/:id" element={<DetailInterviewPage />} />
          <Route path="/interviews/:id/edit" element={<EditInterviewPage />} />
          <Route path="/interviews/:id/answer/:userId" element={<Outlet />} />
        </Route>
      </Route>
      <Route path="/interviews/call/:id" element={<CallInterviewPage />} />
    </Routes>
  );
};

export default AppRoutes;
