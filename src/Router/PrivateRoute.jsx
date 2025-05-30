import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user } = use(AuthContext);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/signin" state={location.pathname} />;
  }
  return children;
};

export default PrivateRoute;
