import { useAuth } from '@/context/auth/AuthContext';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';

const InterviewPage = React.lazy(() => import('@/pages/interviews'));
const NotFoundPage = React.lazy(() => import('@/pages/fallback/not-found'));
const AccessDeniedPage = React.lazy(() => import('@/pages/fallback/access-denied'));
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
const InterviewAnswerPage = React.lazy(
  () => import('@/pages/interviews/detail/answer')
);

const MonitoringPage = React.lazy(() => import('@/pages/monitoring'));

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
      <Route element={<ProtectedRoute role={["ADMIN", "CANDIDATE", "INTERVIEWER"]}/>}>
        <Route element={<MainLayout />}>
          <Route path="/interviews" element={<InterviewPage />} />
          <Route path="/interviews/:id/edit" element={<EditInterviewPage />} />
        </Route>
      </Route>
      <Route element={ <ProtectedRoute role={["ADMIN","INTERVIEWER"]}/> }>
        {/* <Route element={<MainLayout />}> */}
          <Route path="/interviews/:id" element={<DetailInterviewPage />} />
          <Route
            path="/interviews/:id/answer/:userId"
            element={<InterviewAnswerPage />}
          />
          <Route element={<MainLayout />}>
            <Route path="/monitoring" element={<MonitoringPage />} />
          </Route>
        {/* </Route> */}
      </Route>
      <Route element={ <ProtectedRoute role={"CANDIDATE"}/> }>
        <Route path="/interviews/call/:id" element={<CallInterviewPage />} />
      </Route>
      <Route path="/403" element={<AccessDeniedPage />} />
    </Routes>
    
  );
};

export default AppRoutes;
