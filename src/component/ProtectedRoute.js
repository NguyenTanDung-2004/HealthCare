import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const jwtToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwtToken="))
    ?.split("=")[1];
  const role = document.cookie
    .split("; ")
    .find((row) => row.startsWith("role="))
    ?.split("=")[1];
  const location = useLocation();

  if (!jwtToken) {
    return <Navigate to="/home_out" state={{ from: location }} replace />;
  }

  if (requiredRoles && !requiredRoles.includes(role)) {
    return <Navigate to="/home_in" replace />;
  }

  return children;
};

export default ProtectedRoute;
