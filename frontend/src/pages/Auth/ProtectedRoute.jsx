import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { useNotification } from "../../components/NotificationProvider";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const { notify } = useNotification();
  const notifiedRef = useRef(false);

  // Normalize roles to lowercase for comparison
  const unauthorized =
    user &&
    allowedRoles &&
    !allowedRoles.some((role) => role.toLowerCase() === user.role.toLowerCase());

  useEffect(() => {
    if (unauthorized && !notifiedRef.current) {
      notify("You don’t have access to this page", "warning", 3000);
      notifiedRef.current = true;
    }
  }, [unauthorized, notify]);

  // Redirect unauthenticated users to landing page
  if (!user) return <Navigate to="/" replace />;

  // Redirect unauthorized users to their defaultRoute
  if (unauthorized)
    return <Navigate to={user.defaultRoute?.toLowerCase() || "/"} replace />;

  return children;
};

export default ProtectedRoute;