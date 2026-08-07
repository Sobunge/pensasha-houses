// src/components/NotificationProvider.jsx
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Snackbar, Alert, Slide, Button, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

const SlideDown = (props) => <Slide {...props} direction="down" />;

export const NotificationProvider = ({ children }) => {
  const theme = useTheme();
  const [queue, setQueue] = useState([]);

  const notify = useCallback(
    (
      message,
      severity = "info",
      duration = 4000,
      position = { vertical: "top", horizontal: "center" },
      action = null,
      actionLabel = null
    ) => {
      // Deduplicate identical pending messages
      setQueue((prev) => {
        if (prev.some((n) => n.message === message && n.severity === severity)) return prev;
        return [
          ...prev,
          { id: Date.now() + Math.random(), message, severity, duration, position, action, actionLabel },
        ];
      });
    },
    []
  );

  // Global listener for non-React contexts (e.g., Axios Interceptors in api.js)
  useEffect(() => {
    const handleGlobalNotification = (event) => {
      const { message, severity, duration, position, action, actionLabel } = event.detail || {};
      if (message) {
        notify(message, severity || "warning", duration, position, action, actionLabel);
      }
    };

    window.addEventListener("app-notification", handleGlobalNotification);
    return () => {
      window.removeEventListener("app-notification", handleGlobalNotification);
    };
  }, [notify]);

  const handleClose = (id) => {
    setQueue((prev) => prev.filter((n) => n.id !== id));
  };

  const severityIcons = {
    success: <CheckCircleIcon sx={{ fontSize: 22 }} />,
    error: <ErrorIcon sx={{ fontSize: 22 }} />,
    warning: <WarningIcon sx={{ fontSize: 22 }} />,
    info: <InfoIcon sx={{ fontSize: 22 }} />,
  };

  // Modern Theme Color Mapping (Slate & Gold Aesthetic)
  const severityColors = {
    success: "#10B981", // Soft Emerald
    error: "#EF4444",   // Soft Red
    warning: "#D97706", // Brand Warm Gold/Mustard
    info: "#0F172A",    // Deep Dark Slate
  };

  const severityBorders = {
    success: "#A7F3D0",
    error: "#FECACA",
    warning: "#FDE68A",
    info: "#CBD5E1",
  };

  const current = queue[0] || null;

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      {current && (
        <Snackbar
          key={current.id}
          open
          autoHideDuration={current.duration}
          onClose={() => handleClose(current.id)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={SlideDown}
          sx={{
            top: { xs: 16, sm: 24 },
            left: "50%",
            right: "auto",
            transform: "translateX(-50%)",
          }}
        >
          <Alert
            role="alert"
            onClose={() => handleClose(current.id)}
            severity={current.severity}
            icon={severityIcons[current.severity]}
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#1E293B" : "#FFFFFF",
              border: `1.5px solid ${severityBorders[current.severity]}`,
              borderRadius: "12px",
              width: { xs: "calc(100vw - 32px)", sm: "420px" },
              maxWidth: "100%",
              boxShadow:
                "0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04)",
              display: "flex",
              alignItems: "center",
              py: 1,
              px: 2,
              "& .MuiAlert-icon": {
                color: `${severityColors[current.severity]} !important`,
                mr: 1.5,
              },
              "& .MuiAlert-message": {
                flex: 1,
                textAlign: "left",
                fontSize: "0.925rem",
                color: theme.palette.mode === "dark" ? "#F8FAFC" : "#0F172A",
                fontWeight: 600,
                lineHeight: 1.4,
              },
              "& .MuiAlert-action": {
                pt: 0,
                alignItems: "center",
              },
            }}
            action={
              current.action ? (
                <Button
                  size="small"
                  onClick={() => {
                    try {
                      current.action();
                    } catch (e) {
                      console.error("Notification action failed:", e);
                    }
                    handleClose(current.id);
                  }}
                  sx={{
                    color: "#D97706",
                    fontWeight: 700,
                    fontSize: "0.825rem",
                    textTransform: "none",
                    borderRadius: "6px",
                    px: 1.5,
                    py: 0.5,
                    bgcolor: "#FEF3C7",
                    "&:hover": {
                      bgcolor: "#FDE68A",
                    },
                  }}
                >
                  {current.actionLabel || "Action"}
                </Button>
              ) : undefined
            }
          >
            {current.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
};