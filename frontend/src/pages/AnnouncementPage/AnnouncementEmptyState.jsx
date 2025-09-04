import React from "react";
import { Box, Typography } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";

function AnnouncementEmptyState() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        color: "#777",
      }}
    >
      <CampaignIcon sx={{ fontSize: 50, color: "#ccc", mb: 2 }} />
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        No Announcements
      </Typography>
      <Typography variant="body2">
        You’re all caught up! Check back later for updates.
      </Typography>
    </Box>
  );
}

export default AnnouncementEmptyState;
