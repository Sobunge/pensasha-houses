// src/components/ActivityFeedCard.jsx
import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/Auth/AuthContext";
import ActivityModal from "../../pages/ActivityFeedPage/ActivityModal";

function ActivityFeedCard({ activities = [], compact = false, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role || "tenant";

  // Fallback activities if none provided
  const defaultActivities = [
    { id: 1, type: "Payment Received", message: "Rent payment for Sept.", date: "10:00 AM", status: "Unread" },
    { id: 2, type: "Maintenance Update", message: "Plumbing request approved.", date: "11:30 AM", status: "Read" },
    { id: 3, type: "New Announcement", message: "Community meeting scheduled.", date: "1:00 PM", status: "Unread" },
  ];

  const [activityList, setActivityList] = useState(activities.length ? activities : defaultActivities);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const itemsToShow = compact ? activityList.slice(0, 3) : activityList;

  // Open activity and mark as read if unread
  const handleOpenActivity = (activity) => {
    let updated = activity;
    if (activity.status === "Unread") {
      setActivityList((prev) =>
        prev.map((a) => (a.id === activity.id ? { ...a, status: "Read" } : a))
      );
      updated = { ...activity, status: "Read" };
    }
    setSelectedActivity(updated);
  };

  // Mark an activity as read from modal
  const handleMarkRead = (id) => {
    let updated;
    setActivityList((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          updated = { ...a, status: "Read" };
          return updated;
        }
        return a;
      })
    );
    if (selectedActivity?.id === id) setSelectedActivity(updated);
    setSelectedActivity(null);
  };

  const handleViewAll = () => {
    navigate(`/${role}/activities`);
    if (onClose) onClose();
  };

  return (
    <Box
      sx={{
        p: 2.5,
        width: compact ? { xs: 300, sm: 360 } : "100%",
        bgcolor: "#FFFFFF",
      }}
    >
      {/* Header with Close Button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "8px",
            bgcolor: "rgba(212, 175, 55, 0.12)",
            color: "#D4AF37",
            mr: 1.5,
          }}
        >
          <NotificationsIcon sx={{ fontSize: 18 }} />
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "#0F172A", flexGrow: 1, letterSpacing: "-0.2px" }}
        >
          Activity Feed
        </Typography>

        {onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: "#64748B",
              "&:hover": { bgcolor: "#F1F5F9", color: "#0F172A" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mb: 2, borderColor: "#E2E8F0" }} />

      {/* Activity List */}
      <Stack spacing={1}>
        {itemsToShow.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
            No activities recorded.
          </Typography>
        ) : (
          itemsToShow.map((activity) => (
            <Box
              key={activity.id}
              onClick={() => handleOpenActivity(activity)}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                p: 1.25,
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                bgcolor: activity.status === "Unread" ? "rgba(212, 175, 55, 0.05)" : "transparent",
                border: "1px solid",
                borderColor: activity.status === "Unread" ? "rgba(212, 175, 55, 0.25)" : "transparent",
                "&:hover": {
                  bgcolor: "rgba(212, 175, 55, 0.10)",
                  borderColor: "rgba(212, 175, 55, 0.4)",
                  transform: "translateX(2px)",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: activity.status === "Unread" ? "#0F172A" : "#64748B",
                  color: activity.status === "Unread" ? "#D4AF37" : "#FFFFFF",
                  width: 36,
                  height: 36,
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  border: activity.status === "Unread" ? "1.5px solid #D4AF37" : "none",
                }}
              >
                {activity.type ? activity.type[0].toUpperCase() : "A"}
              </Avatar>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: activity.status === "Unread" ? 700 : 500,
                      color: "#0F172A",
                      fontSize: "0.875rem",
                    }}
                    noWrap
                  >
                    {activity.type}
                  </Typography>

                  {/* Unread Glowing Dot */}
                  {activity.status === "Unread" && (
                    <Box
                      sx={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        bgcolor: "#D4AF37",
                        boxShadow: "0 0 6px rgba(212, 175, 55, 0.8)",
                      }}
                    />
                  )}
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: activity.status === "Unread" ? "#334155" : "#64748B",
                    fontSize: "0.78rem",
                    fontWeight: activity.status === "Unread" ? 500 : 400,
                  }}
                  noWrap
                >
                  {activity.message}
                </Typography>
              </Box>

              {!compact && (
                <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "0.7rem" }}>
                  {activity.date}
                </Typography>
              )}
            </Box>
          ))
        )}

        {/* View All Button */}
        {compact && (
          <Box sx={{ pt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              onClick={handleViewAll}
              endIcon={<ArrowForwardIcon fontSize="small" />}
              sx={{
                bgcolor: "#0F172A",
                color: "#FFFFFF",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "10px",
                py: 1,
                fontSize: "0.8125rem",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                "&:hover": {
                  bgcolor: "#D4AF37",
                  color: "#0F172A",
                  boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
                },
              }}
            >
              View All Activities
            </Button>
          </Box>
        )}
      </Stack>

      {/* Activity Modal */}
      <ActivityModal
        open={!!selectedActivity}
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onMarkRead={handleMarkRead}
      />
    </Box>
  );
}

export default ActivityFeedCard;