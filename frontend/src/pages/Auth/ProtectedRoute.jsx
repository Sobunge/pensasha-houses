// src/pages/Auth/ProtectedRoute.jsx
import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { useNotification } from "../../components/NotificationProvider";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const { notify } = useNotification();
  const notifiedRef = useRef(false);

  // Normalize roles to lowercase for comparison
  const userRoles = user?.roles?.map((r) => r.toLowerCase()) || [];

  // Check if user has any allowed role
  const unauthorized =
    allowedRoles &&
    !allowedRoles.some((role) => userRoles.includes(role.toLowerCase()));

  useEffect(() => {
    if (unauthorized && !notifiedRef.current) {
      notify("You don’t have access to this page", "warning", 3000);
      notifiedRef.current = true;
    }
  }, [unauthorized, notify]);

  // Redirect unauthenticated users to landing page
  if (!user) return <Navigate to="/" replace />;

  // Redirect unauthorized users to their defaultRoute (first role if multi)
  if (unauthorized)
    return (
      <Navigate
        to={user.defaultRoute || "/dashboard"}
        replace
      />
    );

  return children;
};

export default ProtectedRoute;