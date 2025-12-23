import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import { Link } from "react-router-dom";
import { useTenantAnnouncements } from "../hooks/useTenantAnnouncements";

function AnnouncementsCard({ tenantId }) {
  const { announcements, loading, error } = useTenantAnnouncements(tenantId);

  const latestAnnouncement = announcements[0];

  if (loading) {
    return (
      <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#fff", minWidth: 250, textAlign: "center" }}>
        <CardContent>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Loading announcements...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#fff", minWidth: 250, textAlign: "center" }}>
        <CardContent>
          <Typography color="error">Failed to load announcements</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#fff", display: "flex", flexDirection: "column", height: "100%" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <CampaignIcon sx={{ color: "#f8b500" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#111111" }}>
            Announcements
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: "#555", mb: 2, lineHeight: 1.6 }}>
          {latestAnnouncement ? latestAnnouncement.message : "No announcements yet."}
        </Typography>
      </CardContent>

      <Divider />
      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          component={Link}
          to="/tenant/announcements"
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
