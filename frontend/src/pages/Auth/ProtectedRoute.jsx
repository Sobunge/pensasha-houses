import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { useNotification } from "../../components/NotificationProvider";

// ProtectedRoute handles role-based access and redirects
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const { notify } = useNotification();

  if (loading) return <p>Loading...</p>;

  // If user is not logged in, just redirect to landing page (no notification)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user is logged in but doesn't have required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    notify("Unauthorized access!", "warning", 2000);
    return <Navigate to="/" replace />;
  }

  // User is logged in and authorized
  return children;
};

export default ProtectedRoute;
