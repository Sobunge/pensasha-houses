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

  // Theme-Integrated Color Mapping
  const severityColors = {
    success: theme.palette.success?.main || "#10B981",
    error: theme.palette.error?.main || "#EF4444",
    warning: theme.palette.secondary.main, // Champagne Gold for warnings
    info: theme.palette.primary.main,     // Obsidian Slate for info
  };

  const severityBorders = {
    success: theme.palette.success?.light || "#A7F3D0",
    error: theme.palette.error?.light || "#FECACA",
    warning: `${theme.palette.secondary.main}66`, // Gold with opacity
    info: theme.palette.divider,
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
              bgcolor: theme.palette.background.paper,
              border: `1.5px solid ${severityBorders[current.severity]}`,
              borderRadius: `${theme.shape.borderRadius * 1.5}px`,
              width: { xs: "calc(100vw - 32px)", sm: "420px" },
              maxWidth: "100%",
              boxShadow: `0 10px 25px -5px ${theme.palette.primary.main}26, 0 8px 10px -6px ${theme.palette.primary.main}0A`,
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
                color: theme.palette.text.primary,
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
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    fontSize: "0.825rem",
                    textTransform: "none",
                    borderRadius: `${theme.shape.borderRadius}px`,
                    px: 1.5,
                    py: 0.5,
                    bgcolor: theme.palette.secondary.main,
                    "&:hover": {
                      bgcolor: theme.palette.secondary.dark,
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