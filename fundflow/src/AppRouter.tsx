import AuthorizedLayout from "layouts/AuthorizedLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { isUserAuthorized } from "utils/authorization";
import NotFound from "components/Common/NotFound";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import Campaign from "pages/Campaign";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      {
        // !isUserAuthorized() &&
        <Route element={<AuthorizedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campaign" element={<Campaign />} />
        </Route>
      }
    </Routes>
  );
}

export default AppRouter;