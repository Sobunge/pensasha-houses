import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import BuildIcon from "@mui/icons-material/Build";

function ActivityItem({ activity }) {
  const getIcon = (type) => {
    switch (type) {
      case "property":
        return <HomeIcon />;
      case "payment":
        return <PaymentIcon />;
      case "maintenance":
        return <BuildIcon />;
      default:
        return <HomeIcon />;
    }
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "primary.main" }}>{getIcon(activity.type)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={activity.message}
        secondary={
          <Typography variant="caption" color="text.secondary">
            {new Date(activity.timestamp).toLocaleString()}
          </Typography>
        }
      />
    </ListItem>
  );
}

export default ActivityItem;
