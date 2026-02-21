import React, { createContext, useContext, useState, useCallback } from "react";
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
    (message, severity = "info", duration = 4000, position = { vertical: "top", horizontal: "center" }, action = null, actionLabel = null) => {
      // Deduplicate
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

  const handleClose = (id) => {
    setQueue((prev) => prev.filter((n) => n.id !== id));
  };

  const severityIcons = {
    success: <CheckCircleIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    info: <InfoIcon />,
  };

  const severityColors = {
    success: "#4CAF50",
    error: "#F44336",
    warning: "#FF9800",
    info: "#2196F3",
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
          anchorOrigin={current.position}
          TransitionComponent={SlideDown}
        >
          <Alert
            role="alert"
            onClose={() => handleClose(current.id)}
            severity={current.severity}
            icon={severityIcons[current.severity]}
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#222" : "#fff",
              border: `2px solid ${severityColors[current.severity]}`,
              borderRadius: 3,
              width: { xs: "90%", sm: "400px" },
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              "& .MuiAlert-icon": { color: severityColors[current.severity] },
              "& .MuiAlert-message": {
                flex: 1,
                textAlign: "center",
                fontSize: "0.95rem",
                color: severityColors[current.severity],
                fontWeight: 600,
              },
            }}
            action={
              current.action ? (
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    try {
                      current.action();
                    } catch (e) {
                      console.error("Notification action failed:", e);
                    }
                    handleClose(current.id);
                  }}
                >
                  {current.actionLabel || "ACTION"}
                </Button>
              ) : null
            }
          >
            {current.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
};