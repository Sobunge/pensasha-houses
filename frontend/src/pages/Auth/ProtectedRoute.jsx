// src/pages/Auth/ProtectedRoute.jsx
import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNotification } from "../../components/NotificationProvider";

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { user } = useAuth();
  const { notify } = useNotification();
  const notifiedRef = useRef(false);

  // ===== Permission & Auth Checks =====
  const hasPermission = !requiredPermission || user?.permissions?.includes(requiredPermission);
  const isUnauthenticated = !user;
  const isUnauthorized = user && !hasPermission;

  // ===== Notification (always safe) =====
  useEffect(() => {
    if (isUnauthorized && !notifiedRef.current) {
      notify("You don’t have access to this page", "warning", 3000);
      notifiedRef.current = true;
    }
  }, [isUnauthorized, notify]);

  // ===== Redirect Logic =====
  if (isUnauthenticated) return <Navigate to="/" replace />;
  if (isUnauthorized) return <Navigate to="/dashboard" replace />;

  return children;
};

export default ProtectedRoute;