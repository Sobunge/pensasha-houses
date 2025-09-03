import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

function ActivityFeedCard({ compact = false }) {
  // Mock activity data
  const activities = [
    { id: 1, message: "Paid rent for September", time: "2h ago" },
    { id: 2, message: "Maintenance request submitted", time: "1d ago" },
    { id: 3, message: "New announcement posted", time: "3d ago" },
    { id: 4, message: "Lease document uploaded", time: "1w ago" },
  ];

  const visibleActivities = compact ? activities.slice(0, 3) : activities;

  return (
    <Card
      sx={{
        borderRadius: compact ? 2 : 3,
        boxShadow: compact ? 0 : 2,
        bgcolor: "#fff",
      }}
    >
      <CardContent sx={{ p: compact ? 2 : 3 }}>
        {/* Title with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <NotificationsIcon sx={{ color: "#f8b500" }} />
          <Typography
            variant={compact ? "subtitle1" : "h6"}
            sx={{ fontWeight: 600, color: "#111" }}
          >
            Recent Activity
          </Typography>
        </Box>

        {/* Activity List */}
        <List disablePadding>
          {visibleActivities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem
                dense
                sx={{
                  px: 1,
                  py: compact ? 0.5 : 1,
                  borderRadius: 2,
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#FFF6E0",
                    cursor: "pointer",
                  },
                }}
              >
                <ListItemText
                  primary={activity.message}
                  secondary={activity.time}
                  primaryTypographyProps={{
                    variant: "body2",
                    sx: { color: "#111" },
                  }}
                  secondaryTypographyProps={{
                    variant: "caption",
                    sx: { color: "#777" },
                  }}
                />
              </ListItem>
              {index < visibleActivities.length - 1 && (
                <Divider sx={{ my: compact ? 0.5 : 1 }} />
              )}
            </React.Fragment>
          ))}
        </List>

        {/* View All Link */}
        {compact && (
          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Link
              href="/tenant/activity"
              underline="hover"
              sx={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#f8b500",
                "&:hover": { color: "#c59000" },
              }}
            >
              View All →
            </Link>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default ActivityFeedCard;
