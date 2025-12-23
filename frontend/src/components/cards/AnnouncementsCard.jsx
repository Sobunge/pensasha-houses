import React from "react";
import { Card, CardContent, Typography, Box, Button, Divider, CircularProgress } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
import { useTenantAnnouncements } from "../hooks/useTenantAnnouncements";

function AnnouncementsCard({ userId }) {
  const { announcements, loading, error } = useTenantAnnouncements(userId);

  const latestAnnouncement = announcements[0];

  if (loading) {
    return (
      <Card sx={cardStyle}>
        <CardContent sx={cardContentStyle}>
          <CircularProgress sx={{ color: "#f8b500" }} />
          <Typography variant="body2" sx={{ mt: 2, color: "#555" }}>
            Loading announcements...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (error || !latestAnnouncement) {
    return (
      <Card sx={cardStyle}>
        <CardContent sx={{ ...cardContentStyle, justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
          <InfoOutlinedIcon sx={{ fontSize: 50, color: "#f8b500", mb: 1 }} />
          <Typography variant="body1" sx={{ color: "#777", textAlign: "center", mb: 2 }}>
            No announcements yet. Stay tuned!
          </Typography>
          <Button
            component={Link}
            to="/tenant/announcements"
            size="small"
            variant="outlined"
            sx={{ color: "#f8b500", borderColor: "#f8b500", fontWeight: 600, textTransform: "none", "&:hover": { bgcolor: "#fef2b2", borderColor: "#c59000" } }}
          >
            View All →
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={cardStyle}>
      <CardContent sx={cardContentStyle}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <CampaignIcon sx={{ color: "#f8b500", fontSize: 28 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#111" }}>
            Latest Announcement
          </Typography>
        </Box>

        {/* Announcement Bubble */}
        <Box sx={{ p: 2, bgcolor: "#fff7e6", borderRadius: 2, boxShadow: 1, mb: 2 }}>
          <Typography variant="body2" sx={{ color: "#555", lineHeight: 1.6 }}>
            {latestAnnouncement.message}
          </Typography>
        </Box>
      </CardContent>

      <Divider />
      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          component={Link}
          to="/tenant/announcements"
          size="small"
          sx={buttonStyle}
        >
          View All →
        </Button>
      </Box>
    </Card>
  );
}

// Card Styles
const cardStyle = {
  borderRadius: 3,
  boxShadow: 3,
  bgcolor: "#fff",
  width: 400,
  minHeight: 100,
  display: "flex",
  flexDirection: "column",
};

const cardContentStyle = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
};

const buttonStyle = {
  color: "#f8b500",
  fontWeight: 600,
  textTransform: "none",
  "&:hover": { color: "#c59000", bgcolor: "transparent" },
};

export default AnnouncementsCard;
