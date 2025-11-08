import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, getAuthUser } from "../utils/auth";

const PublicRoute = ({ children }) => {
  if (isLoggedIn()) {
    const user = getAuthUser();
    const path = user?.role === "doctor" ? "/doctor" : "/user";
    return <Navigate to={path} replace />;
  }
  return children;
};

export default PublicRoute;
