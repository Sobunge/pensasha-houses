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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
import { useTenantAnnouncements } from "../hooks/useTenantAnnouncements";

function AnnouncementsCard({ userId }) {
  const { announcements, loading, error } = useTenantAnnouncements(userId);
  const latestAnnouncement = announcements?.[0];

  return (
    <Card
      elevation={2}
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%", lg: "auto" },
        minWidth: 400, // minimum width applied
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: { xs: 1.5, sm: 2 },
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <CampaignIcon color="warning" />
        <Typography variant="subtitle1" fontWeight={600}>
          Announcements
        </Typography>
      </Box>

      {/* Card Content */}
      <CardContent
        sx={{
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          flexGrow: 1,
        }}
      >
        {loading ? (
          <Box
            sx={{
              minHeight: 64,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">
              Loading announcements…
            </Typography>
          </Box>
        ) : error || !latestAnnouncement ? (
          <Box
            sx={{
              minHeight: 80,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 1,
            }}
          >
            <InfoOutlinedIcon color="warning" sx={{ fontSize: 40 }} />
            <Typography variant="body2" color="text.secondary">
              No announcements yet. Stay tuned.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              p: 2,
              bgcolor: "warning.light",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.6,
                color: "text.primary",
              }}
            >
              {latestAnnouncement.message}
            </Typography>
          </Box>
        )}
      </CardContent>

      {/* Footer */}
      <Divider />
      <Box
        sx={{
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
      >
        <Button
          component={Link}
          to="/tenant/announcements"
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

export default AnnouncementsCard;
