// src/components/cards/ActivityFeedCard.jsx
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

  const defaultActivities = [
    { id: 1, type: "Payment Received", message: "Rent payment for Sept.", date: "10:00 AM", status: "Unread" },
    { id: 2, type: "Maintenance Update", message: "Plumbing request approved.", date: "11:30 AM", status: "Read" },
    { id: 3, type: "New Announcement", message: "Community meeting scheduled.", date: "1:00 PM", status: "Unread" },
  ];

  const [activityList, setActivityList] = useState(activities.length ? activities : defaultActivities);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const itemsToShow = compact ? activityList.slice(0, 3) : activityList;

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
      sx={(theme) => ({
        p: 2.5,
        // Fluid width that respects screen edges safely
        width: compact ? { xs: "calc(100vw - 24px)", sm: 420 } : "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        boxShadow: `0 25px 50px -12px ${theme.palette.primary.main}66, 0 0 0 1px ${theme.palette.divider}`,
        border: `2px solid ${theme.palette.secondary.main}`,
        zIndex: theme.zIndex.tooltip + 10,
      })}
    >
      {/* Header with Close Button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5, minWidth: 0 }}>
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: `${theme.shape.borderRadius}px`,
            bgcolor: `${theme.palette.secondary.main}26`,
            color: theme.palette.secondary.main,
            mr: 1.5,
            border: `1px solid ${theme.palette.secondary.main}66`,
            flexShrink: 0,
          })}
        >
          <NotificationsIcon sx={{ fontSize: 18 }} />
        </Box>

        <Typography
          variant="subtitle1"
          sx={(theme) => ({
            fontWeight: 800,
            color: theme.palette.primary.main,
            flexGrow: 1,
            letterSpacing: "-0.2px",
            minWidth: 0,
          })}
          noWrap
        >
          Activity Feed
        </Typography>

        {onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              borderRadius: `${theme.shape.borderRadius}px`,
              flexShrink: 0,
              ml: 1,
              "&:hover": {
                bgcolor: `${theme.palette.primary.main}0A`,
                color: theme.palette.text.primary,
              },
            })}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Divider sx={(theme) => ({ mb: 2, borderColor: theme.palette.divider })} />

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
              sx={(theme) => ({
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                p: 1.5,
                borderRadius: `${theme.shape.borderRadius * 1.5}px`,
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                bgcolor: activity.status === "Unread" ? `${theme.palette.secondary.main}14` : theme.palette.background.default,
                border: "1px solid",
                borderColor: activity.status === "Unread" ? `${theme.palette.secondary.main}66` : theme.palette.divider,
                minWidth: 0,
                boxSizing: "border-box",
                "&:hover": {
                  bgcolor: `${theme.palette.secondary.main}26`,
                  borderColor: theme.palette.secondary.main,
                  transform: "translateX(2px)",
                },
              })}
            >
              <Avatar
                sx={(theme) => ({
                  bgcolor: activity.status === "Unread" ? theme.palette.primary.main : theme.palette.action.hover,
                  color: activity.status === "Unread" ? theme.palette.secondary.main : theme.palette.text.secondary,
                  width: 38,
                  height: 38,
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  flexShrink: 0,
                  border: activity.status === "Unread" ? `1.5px solid ${theme.palette.secondary.main}` : `1px solid ${theme.palette.divider}`,
                })}
              >
                {activity.type ? activity.type[0].toUpperCase() : "A"}
              </Avatar>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: 0 }}>
                  <Typography
                    variant="subtitle2"
                    sx={(theme) => ({
                      fontWeight: activity.status === "Unread" ? 800 : 600,
                      color: theme.palette.primary.main,
                      fontSize: "0.875rem",
                      minWidth: 0,
                    })}
                    noWrap
                  >
                    {activity.type}
                  </Typography>

                  {activity.status === "Unread" && (
                    <Box
                      sx={(theme) => ({
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: theme.palette.secondary.main,
                        boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
                        flexShrink: 0,
                        ml: 1,
                      })}
                    />
                  )}
                </Box>

                <Typography
                  variant="body2"
                  sx={(theme) => ({
                    color: activity.status === "Unread" ? theme.palette.text.primary : theme.palette.text.secondary,
                    fontSize: "0.78rem",
                    fontWeight: activity.status === "Unread" ? 600 : 400,
                    minWidth: 0,
                    mt: 0.25,
                  })}
                  noWrap
                >
                  {activity.message}
                </Typography>
              </Box>

              {!compact && (
                <Typography variant="caption" sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: "0.7rem", fontWeight: 500, flexShrink: 0, pt: 0.25 })}>
                  {activity.date}
                </Typography>
              )}
            </Box>
          ))
        )}

        {/* View All Button */}
        {compact && (
          <Box sx={{ pt: 1, minWidth: 0 }}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              onClick={handleViewAll}
              endIcon={<ArrowForwardIcon fontSize="small" />}
              sx={(theme) => ({
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: `${theme.shape.borderRadius}px`,
                py: 1.1,
                fontSize: "0.8125rem",
                boxShadow: `0 4px 12px ${theme.palette.primary.main}26`,
                "&:hover": {
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                  boxShadow: `0 6px 16px ${theme.palette.secondary.main}4D`,
                },
              })}
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