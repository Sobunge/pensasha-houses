// src/components/AnnouncementsCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  CircularProgress,
  Stack,
  IconButton,
} from "@mui/material";
import CampaignIcon from "@mui/icons-material/CampaignOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/Auth/AuthContext";
import { useTenantAnnouncements } from "../hooks/useTenantAnnouncements";

function AnnouncementsCard({ userId, compact = false, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role || "tenant";
  
  const { announcements, loading, error } = useTenantAnnouncements(userId);
  const latestAnnouncement = announcements?.[0];

  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <Card
      elevation={0}
      sx={{
        flex: compact
          ? undefined
          : { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: compact
          ? { xs: 300, sm: 360 }
          : { xs: "100%", sm: "320px" },
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0px 12px 32px rgba(15, 23, 42, 0.08)",
          transform: "translateY(-4px)",
          borderColor: "rgba(212, 175, 55, 0.4)",
        },
      }}
    >
      {/* --- Header --- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: "rgba(212, 175, 55, 0.04)",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "8px",
            bgcolor: "rgba(212, 175, 55, 0.12)",
            color: "#D4AF37",
          }}
        >
          <CampaignIcon sx={{ fontSize: 18 }} />
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: "#0F172A",
            flexGrow: 1,
            fontSize: "1rem",
            letterSpacing: "-0.2px",
          }}
        >
          Announcements
        </Typography>

        {onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: "#64748B",
              "&:hover": { bgcolor: "rgba(15, 23, 42, 0.05)", color: "#0F172A" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* --- Main Content --- */}
      <CardContent
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
          minHeight: 140,
        }}
      >
        {loading ? (
          <Stack alignItems="center" spacing={1.5}>
            <CircularProgress size={28} sx={{ color: "#D4AF37" }} />
            <Typography
              variant="body2"
              sx={{ color: "#64748B", fontWeight: 500 }}
            >
              Checking updates...
            </Typography>
          </Stack>
        ) : error || !latestAnnouncement ? (
          <Stack
            alignItems="center"
            spacing={1}
            sx={{ py: 2, color: "#64748B" }}
          >
            <InfoOutlinedIcon sx={{ color: "#94A3B8", fontSize: 32 }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              No announcements today.
            </Typography>
          </Stack>
        ) : (
          <Box
            sx={{
              p: 2,
              bgcolor: "rgba(212, 175, 55, 0.06)",
              border: "1px solid rgba(212, 175, 55, 0.25)",
              borderRadius: "12px",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                bgcolor: "rgba(212, 175, 55, 0.10)",
                borderColor: "rgba(212, 175, 55, 0.4)",
              },
            }}
          >
            {latestAnnouncement.title && (
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: "#0F172A",
                  mb: 0.5,
                  fontSize: "0.875rem",
                }}
              >
                {latestAnnouncement.title}
              </Typography>
            )}
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.6,
                color: "#334155",
                fontWeight: 500,
                fontSize: "0.8125rem",
                wordBreak: "break-word",
              }}
            >
              {latestAnnouncement.message}
            </Typography>
          </Box>
        )}
      </CardContent>

      <Divider sx={{ borderStyle: "dashed", borderColor: "#E2E8F0" }} />

      {/* --- Action Footer --- */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
      >
        <Button
          variant="contained"
          startIcon={<NotificationsActiveIcon />}
          endIcon={<ArrowForwardIcon />}
          onClick={() => handleNavigate(`/${role}/announcements`)}
          sx={{
            bgcolor: "#0F172A",
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: 700,
            fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: 1.2,
            borderRadius: "10px",
            width: { xs: "100%", sm: "auto" },
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            "& .MuiButton-startIcon, & .MuiButton-endIcon": {
              color: "#D4AF37",
            },
            "&:hover": {
              bgcolor: "#D4AF37",
              color: "#0F172A",
              boxShadow: "0 6px 16px rgba(212, 175, 55, 0.3)",
              "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                color: "#0F172A",
              },
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          View Bulletin Board
        </Button>
      </Box>
    </Card>
  );
}

export default AnnouncementsCard;