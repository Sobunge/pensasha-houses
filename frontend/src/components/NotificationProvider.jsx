import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert, Slide } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

const SlideDown = (props) => <Slide {...props} direction="down" />;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const notify = (message, severity = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, severity }]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const severityIcons = {
    success: <CheckCircleIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    info: <InfoIcon />,
  };

  // Renowned semantic colors for UX
  const severityColors = {
    success: "#4CAF50", // green
    error: "#F44336",   // red
    warning: "#FF9800", // orange
    info: "#2196F3",    // blue
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      {notifications.map((n) => (
        <Snackbar
          key={n.id}
          open
          autoHideDuration={4000}
          onClose={() => removeNotification(n.id)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={SlideDown}
        >
          <Alert
            onClose={() => removeNotification(n.id)}
            severity={n.severity}
            icon={severityIcons[n.severity]}
            sx={{
              bgcolor: "#ffffff",                  // white background
              border: `2px solid ${severityColors[n.severity]}`, // outline color matches severity
              borderRadius: 3,
              width: { xs: "90%", sm: "400px" },
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              "& .MuiAlert-icon": { color: severityColors[n.severity] }, // icon in semantic color
              "& .MuiAlert-message": {
                flex: 1,
                textAlign: "center",
                fontSize: "0.95rem",
                color: severityColors[n.severity], // text matches severity
                fontWeight: 600,
              },
            }}
          >
            {n.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};
