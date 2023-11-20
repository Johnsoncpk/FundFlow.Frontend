
import AuthorizedLayout from "layouts/AuthorizedLayout";
import { Navigate, Route, Routes } from "react-router-dom";

import NotFound from "components/Common/NotFound";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import CampaignForm from "pages/CampaignForm";

import { isUserAuthorized } from "utils/authorization";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      {
        //isUserAuthorized() &&
        <Route element={<AuthorizedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campaignform" element={<CampaignForm />} />
        </Route>
      }
    </Routes>
  );
}

export default AppRouter;