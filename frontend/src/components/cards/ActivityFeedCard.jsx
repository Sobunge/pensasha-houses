import React from "react";
import { Box, Stack, Typography, Divider, Avatar, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

function ActivityFeedCard({ activities = [], compact = false }) {
  const navigate = useNavigate();

  // Sample data if none provided
  const defaultActivities = [
    { id: 1, title: "Payment Received", description: "Rent payment for Sept.", time: "10:00 AM" },
    { id: 2, title: "Maintenance Update", description: "Plumbing request approved.", time: "11:30 AM" },
    { id: 3, title: "New Announcement", description: "Community meeting scheduled.", time: "1:00 PM" },
  ];

  const displayActivities = activities.length ? activities : defaultActivities;
  const itemsToShow = compact ? displayActivities.slice(0, 3) : displayActivities;

  return (
    <Box sx={{ p: 2 }}>
      {/* Header / Title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <NotificationsIcon sx={{ color: "#1976d2" }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Activity Feed
        </Typography>
      </Box>

      <Stack spacing={compact ? 1.5 : 2}>
        {itemsToShow.map((activity) => (
          <Box
            key={activity.id}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              p: 1,
              borderRadius: 2,
              cursor: "pointer",
              bgcolor: "#f7f7f7",
              "&:hover": { bgcolor: "#e9ecef" },
            }}
            onClick={() => !compact && console.log("Clicked activity", activity.id)}
          >
            <Avatar sx={{ bgcolor: "#1976d2", width: 36, height: 36 }}>
              {activity.title[0]}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }} noWrap>
                {activity.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {activity.description}
              </Typography>
            </Box>
            {!compact && (
              <Typography variant="caption" color="text.secondary">
                {activity.time}
              </Typography>
            )}
          </Box>
        ))}

        {/* View All button for compact mode */}
        {compact && (
          <>
            <Divider sx={{ my: 1 }} />
            <Button
              fullWidth
              variant="contained"
              size="small"
              sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#115293" } }}
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/tenant/activities")}
            >
              View All
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default ActivityFeedCard;
