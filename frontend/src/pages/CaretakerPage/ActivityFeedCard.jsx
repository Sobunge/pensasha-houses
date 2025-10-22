import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const activities = [
  { text: "Admin assigned you to Room 204 maintenance", time: "30m ago" },
  { text: "You completed plumbing task in Block A", time: "3h ago" },
  { text: "Tenant Brian left a new message", time: "1d ago" },
];

const ActivityFeedCard = () => (
  <Card sx={{ width: "100%", borderRadius: 3, boxShadow: 3, bgcolor: "#fff" }}>
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Activity Feed
      </Typography>

      <List disablePadding>
        {activities.map((a, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={<Typography variant="body2">{a.text}</Typography>}
                secondary={<Typography variant="caption">{a.time}</Typography>}
              />
            </ListItem>
            {index < activities.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default ActivityFeedCard;
