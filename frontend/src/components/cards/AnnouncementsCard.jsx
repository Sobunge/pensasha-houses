import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";

function AnnouncementsCard() {
  // Placeholder data
  const latestAnnouncement = "Water maintenance scheduled for Friday, 10 AM.";

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Title with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <CampaignIcon sx={{ color: "#f8b500" }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#111111" }}>
            Announcements
          </Typography>
        </Box>

        {/* Latest Announcement */}
        <Typography
          variant="body1"
          sx={{ color: "#555", mb: 2, lineHeight: 1.6 }}
        >
          {latestAnnouncement}
        </Typography>
      </CardContent>

      {/* Footer Action */}
      <Divider />
      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          size="small"
          sx={{
            color: "#f8b500",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { color: "#c59000", bgcolor: "transparent" },
          }}
        >
          View All →
        </Button>
      </Box>
    </Card>
  );
}

export default AnnouncementsCard;
