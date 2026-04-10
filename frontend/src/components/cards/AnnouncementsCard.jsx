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
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Link } from "react-router-dom";
import { useTenantAnnouncements } from "../hooks/useTenantAnnouncements";

function AnnouncementsCard({ userId }) {
  const { announcements, loading, error } = useTenantAnnouncements(userId);
  const latestAnnouncement = announcements?.[0];

  return (
    <Card
      elevation={0}
      sx={{
        flex: { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: { xs: "100%", sm: "320px" }, // Added minWidth for consistency
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": { 
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)", 
          transform: "translateY(-5px)" 
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: "rgba(248, 181, 0, 0.04)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <CampaignIcon sx={{ color: "#f8b500" }} />
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          Announcements
        </Typography>
      </Box>

      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
          minHeight: 140, 
        }}
      >
        {loading ? (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={24} sx={{ color: "#f8b500", mb: 1 }} />
            <Typography variant="body2" color="text.secondary">Checking updates...</Typography>
          </Box>
        ) : error || !latestAnnouncement ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <InfoOutlinedIcon sx={{ color: "text.disabled", fontSize: 32 }} />
            <Typography variant="body2" color="text.secondary">No announcements today.</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              p: 2,
              bgcolor: "rgba(248, 181, 0, 0.08)",
              border: "1px solid rgba(248, 181, 0, 0.15)",
              borderRadius: 2,
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                lineHeight: 1.6, 
                color: "text.primary", 
                fontWeight: 500,
                // Prevents overflow if message is very long without spaces
                wordBreak: "break-word" 
              }}
            >
              {latestAnnouncement.message}
            </Typography>
          </Box>
        )}
      </CardContent>

      <Divider sx={{ borderStyle: "dashed", opacity: 0.6 }} />

      <Box 
        sx={{ 
          p: 2, 
          display: "flex", 
          justifyContent: { xs: "center", sm: "flex-end" } // Centers button on mobile
        }}
      >
        <Button
          component={Link}
          to="/tenant/announcements"
          variant="contained"
          startIcon={<NotificationsActiveIcon />}
          sx={{
            bgcolor: "#f8b500",
            color: "#000000",
            textTransform: "none",
            fontWeight: 800,
            // Fluid typography and padding for mobile
            fontSize: { xs: "0.8rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: 1.2,
            borderRadius: 2.5,
            width: { xs: "100%", sm: "auto" }, // Full width button on very small screens
            boxShadow: "0 4px 12px 0 rgba(248, 181, 0, 0.25)",
            "& .MuiButton-startIcon": { color: "#000000" },
            "&:hover": { 
              bgcolor: "#eab000", 
              boxShadow: "0 6px 16px rgba(248, 181, 0, 0.4)",
            }
          }}
        >
          View Bulletin Board
        </Button>
      </Box>
    </Card>
  );
}

export default AnnouncementsCard;