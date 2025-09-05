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

function ActivityModal({ activity, open, onClose }) {
  if (!activity) return null;

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

        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button
            onClick={onClose}
            variant="contained"
            startIcon={<CloseIcon />}
            sx={{
              bgcolor: "#e53935", // red shade
              color: "#fff",
              "&:hover": { bgcolor: "#c62828" }, // darker red on hover
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
