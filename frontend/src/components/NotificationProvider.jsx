import React, { createContext, useContext, useState, useEffect } from "react";
import { Snackbar, Alert, Slide, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

const SlideDown = (props) => <Slide {...props} direction="down" />;

export const NotificationProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);   // waiting notifications
  const [current, setCurrent] = useState(null); // active notification

  const notify = (
    message,
    severity = "info",
    duration = 4000,
    position = { vertical: "top", horizontal: "center" },
    action = null,
    actionLabel = null
  ) => {
    // Dedupe: if identical message+severity is already current or queued, ignore
    if (
      (current && current.message === message && current.severity === severity) ||
      queue.some((q) => q.message === message && q.severity === severity)
    ) {
      return;
    }

    const id = Date.now() + Math.random();
    setQueue((prev) => [
      ...prev,
      { id, message, severity, duration, position, action, actionLabel },
    ]);
  };

  // When no current is shown, pop the next one from the queue
  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue((prev) => prev.slice(1));
    }
  }, [queue, current]);

  const handleClose = (event, reason) => {
    // ignore clickaway so user can click elsewhere without closing accidentally
    if (reason === "clickaway") return;
    setCurrent(null);
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

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      {current && (
        <Snackbar
          key={current.id}
          open
          autoHideDuration={current.duration}
          onClose={handleClose}
          anchorOrigin={current.position}
          TransitionComponent={SlideDown}
        >
          <Alert
            role="alert"
            onClose={handleClose}
            severity={current.severity}
            icon={severityIcons[current.severity]}
            sx={{
              bgcolor: "#ffffff",
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
                    current.action();
                    handleClose();
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
