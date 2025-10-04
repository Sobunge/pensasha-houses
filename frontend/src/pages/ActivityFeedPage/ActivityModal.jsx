// src/pages/ActivityFeed/ActivityModal.jsx
import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "../Auth/AuthContext";

function ActivityModal({ activity, open, onClose, onMarkRead }) {
  const { user } = useAuth();
  const role = user?.role || "tenant";

  if (!activity) return null;

  // Role-based actions
  const roleActions = {
    tenant: {
      label: "Acknowledge",
      color: "#1976d2",
      icon: <VisibilityIcon />,
    },
    landlord: {
      label: "Resolve",
      color: "#2e7d32",
      icon: <DoneIcon />,
    },
    caretaker: {
      label: "Mark Done",
      color: "#0288d1",
      icon: <CheckCircleIcon />,
    },
    admin: {
      label: "Mark Reviewed",
      color: "#6a1b9a",
      icon: <CheckCircleIcon />,
    },
  };

  const action = roleActions[role];

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          width: { xs: "90%", md: "50%" },
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          {activity.type} Details
        </Typography>

        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600}>
              {activity.type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activity.message}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: activity.status === "Unread" ? 600 : 400,
                  color: activity.status === "Unread" ? "#c59000" : "#2a2a2a",
                }}
              >
                {activity.date} • {activity.status}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        {/* Footer Buttons */}
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          {/* Role-specific action */}
          {action && (
            <Button
              variant="contained"
              startIcon={action.icon}
              sx={{
                bgcolor: action.color,
                color: "#fff",
                "&:hover": { bgcolor: "#115293" },
              }}
              onClick={() => {
                if (activity.status === "Unread" && onMarkRead) {
                  onMarkRead(activity.id); // ✅ mark read if unread
                }
                onClose();
              }}
            >
              {action.label}
            </Button>
          )}

          {/* Close button */}
          <Button
            onClick={onClose}
            variant="contained"
            startIcon={<CloseIcon />}
            sx={{
              bgcolor: "#e53935",
              color: "#fff",
              "&:hover": { bgcolor: "#c62828" },
            }}
          >
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ActivityModal;
