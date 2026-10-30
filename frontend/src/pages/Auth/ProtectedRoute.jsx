// src/pages/Auth/ProtectedRoute.jsx
import React, { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNotification } from "../../components/NotificationProvider";

const ProtectedRoute = ({ children, requiredPermission, requiredRole }) => {
  const { user, roles, activeRole } = useAuth();
  const { notify } = useNotification();
  const location = useLocation();
  const notifiedRef = useRef(false);

  // ===== Permission & Role Checks =====
  const hasPermission =
    !requiredPermission || user?.permissions?.includes(requiredPermission);

  const hasRole =
    !requiredRole ||
    roles?.includes(requiredRole) ||
    roles?.includes(`ROLE_${requiredRole.toUpperCase()}`) ||
    activeRole === requiredRole ||
    activeRole === `ROLE_${requiredRole.toUpperCase()}`;

  const isUnauthenticated = !user;
  const isUnauthorized = user && (!hasPermission || !hasRole);

  // ===== Notification Warning =====
  useEffect(() => {
    if (isUnauthorized && !notifiedRef.current) {
      notify("You don’t have permission to access this page.", "warning", 3500);
      notifiedRef.current = true;
    }
  }, [isUnauthorized, notify]);

  // Reset notification ref if route parameters change
  useEffect(() => {
    notifiedRef.current = false;
  }, [location.pathname, requiredPermission, requiredRole]);

  // ===== Navigation Guards =====
  if (isUnauthenticated) {
    // Preserve intended destination for post-login redirect
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (isUnauthorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;