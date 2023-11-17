
import AuthorizedLayout from "layouts/AuthorizedLayout";
import NotFound from "components/Common/NotFound";
import Login from "pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";


const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AuthorizedLayout />}>
        <Route path="*" element={<NotFound />} />
        ... other routes with layout ...
      </Route>
    </Routes>
  );
}

export default AppRouter;