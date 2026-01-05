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
    <Box sx={{ p: 2 }}>
      {/* Header with Close Button */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <NotificationsIcon sx={{ color: "#1976d2", mr: 1 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600, flexGrow: 1 }}>
          Activity Feed
        </Typography>
        {onClose && (
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Divider after header */}
      <Divider sx={{ my: 2 }} />

      {/* Activity List */}
      <Stack spacing={compact ? 1.5 : 2}>
        {itemsToShow.map((activity) => (
          <Box
            key={activity.id}
            onClick={() => handleOpenActivity(activity)}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              p: 1,
              borderRadius: 2,
              cursor: "pointer",
              bgcolor: activity.status === "Unread" ? "#fffbe6" : "#f7f7f7",
              "&:hover": { bgcolor: "#e9ecef" },
            }}
          >
            <Avatar sx={{ bgcolor: "#1976d2", width: 36, height: 36 }}>
              {activity.type[0]}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: activity.status === "Unread" ? 700 : 600 }}
                noWrap
              >
                {activity.type}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {activity.message}
              </Typography>
            </Box>

            {!compact && (
              <Typography variant="caption" color="text.secondary">
                {activity.date}
              </Typography>
            )}
          </Box>
        ))}

        {/* View All Button */}
        {compact && (
          <>
            <Divider sx={{ my: 1 }} />
            <Button
              fullWidth
              variant="contained"
              size="small"
              sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#115293" } }}
              endIcon={<ArrowForwardIcon />}
              onClick={handleViewAll}
            >
              View All
            </Button>
          </>
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
