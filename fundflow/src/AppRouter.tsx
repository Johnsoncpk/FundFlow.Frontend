import React from "react";
import AuthorizedLayout from "layouts/AuthorizedLayout";
import { Navigate, Route, Routes } from "react-router-dom";

const NotFound = React.lazy(() => import('components/Common/NotFound'));
const Register = React.lazy(() => import('pages/User/Register'));
const Login = React.lazy(() => import('pages/User/Login'));
const Dashboard = React.lazy(() => import('pages/Dashboard'));
const CampaignForm = React.lazy(() => import("pages/CampaignForm"));
const CampaignList = React.lazy(() => import("pages/CampaignList"));
// const Campaign = React.lazy(() => import('pages/Campaign'));

const AppRouter: React.FC = () => {

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="" element={<Navigate to={"/user/login"} replace />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />

      <Route element={<AuthorizedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaignform" element={<CampaignForm />} />
        <Route path="/campaignlist" element={<CampaignList />} />
      </Route>

    </Routes>
  );
}

export default AppRouter;