import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";

function AnnouncementsCard() {
  // Placeholder data
  const latestAnnouncement = "Water maintenance scheduled for Friday, 10 AM.";

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#fff" }}>
      <CardContent>
        {/* Title with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <CampaignIcon sx={{ color: "#f8b500" }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#111" }}>
            Announcements
          </Typography>
        </Box>

        {/* Latest Announcement */}
        <Typography variant="body1" sx={{ color: "#555" }}>
          {latestAnnouncement}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AnnouncementsCard;
