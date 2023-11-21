import React from "react";
import AuthorizedLayout from "layouts/AuthorizedLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { isUserAuthorized } from "utils/authorization";

const NotFound = React.lazy(() => import('components/Common/NotFound'));
const Login = React.lazy(() => import('pages/Login'));
const Dashboard = React.lazy(() => import('pages/Dashboard'));
const Campaign = React.lazy(() => import('pages/Campaign'));

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="" element={<Navigate to="/user/login" replace />} />
      <Route path="user/login" element={<Login />} />
      {
        // !isUserAuthorized() &&
        <Route element={<AuthorizedLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="campaign" element={<Campaign />} />
        </Route>
      }
    </Routes>
  );
}

export default AppRouter;