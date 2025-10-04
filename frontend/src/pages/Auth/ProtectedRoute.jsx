import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { useNotification } from "../../components/NotificationProvider";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const { notify } = useNotification();
  const notifiedRef = useRef(false);

  const unauthorized = user && allowedRoles && !allowedRoles.includes(user.role);

  // Always call hooks at top level
  useEffect(() => {
    if (unauthorized && !notifiedRef.current) {
      notify("You don’t have access to this page", "warning", 3000);
      notifiedRef.current = true;
    }
  }, [unauthorized, notify]);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/" replace />;

  if (unauthorized) return <Navigate to={`/${user.role}`} replace />;

  return children;
};

export default ProtectedRoute;
