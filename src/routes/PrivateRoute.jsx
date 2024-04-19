import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/authService";
import { accessDenied } from "../libs/notification";

const UnauthorizedRedirect = () => {
  accessDenied("You need to log in first.");
  return <Navigate to="/login" />;
};

const PrivateRoute = ({ Component }) => {
  const isLoggedIn = isAuthenticated();

  return isLoggedIn ? <Component /> : <UnauthorizedRedirect />;
};

export default PrivateRoute;
