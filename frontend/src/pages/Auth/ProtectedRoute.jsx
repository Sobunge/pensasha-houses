import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { useNotification } from "../../components/NotificationProvider"; // correct path

// helper that triggers a single notify (provider dedupe prevents duplicates) then redirects
const RedirectWithNotify = ({ to, message, severity = "info", duration = 2000, state }) => {
  const { notify } = useNotification();
  const notifiedRef = React.useRef(false);

  React.useEffect(() => {
    if (!notifiedRef.current) {
      notify(message, severity, duration);
      notifiedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, severity, duration]);

  return <Navigate to={to} replace state={state} />;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <RedirectWithNotify
        to="/"
        message="Not logged in! Please log in."
        severity="error"
        duration={2000}
        state={{ from: location }}
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <RedirectWithNotify
        to="/"
        message="Unauthorized access!"
        severity="warning"
        duration={2000}
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
