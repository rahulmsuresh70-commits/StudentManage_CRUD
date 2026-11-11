import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const accessToken = localStorage.getItem("admin_access_token");

  if (!accessToken) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;