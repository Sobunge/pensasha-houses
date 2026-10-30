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
      sx={(theme) => ({
        flex: compact
          ? undefined
          : { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: compact
          ? { xs: 300, sm: 360 }
          : { xs: "100%", sm: "320px" },
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        border: `1.5px solid ${theme.palette.secondary.main}`, // Gold border applied
        boxShadow: `0 10px 30px ${theme.palette.primary.main}14`,
        bgcolor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: `0 14px 36px ${theme.palette.primary.main}1F`,
          transform: "translateY(-4px)",
          borderColor: theme.palette.secondary.dark,
        },
      })}
    >
      {/* --- Header --- */}
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: `${theme.palette.secondary.main}0A`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: `${theme.shape.borderRadius}px`,
            bgcolor: `${theme.palette.secondary.main}1F`, // ~12% gold fill
            color: theme.palette.secondary.main,
          })}
        >
          <CampaignIcon sx={{ fontSize: 18 }} />
        </Box>

        <Typography
          variant="subtitle1"
          sx={(theme) => ({
            fontWeight: 700,
            color: theme.palette.text.primary,
            flexGrow: 1,
            fontSize: "1rem",
            letterSpacing: "-0.2px",
          })}
        >
          Announcements
        </Typography>

        {onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              "&:hover": {
                bgcolor: `${theme.palette.primary.main}0D`,
                color: theme.palette.text.primary,
              },
            })}
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
            <CircularProgress size={28} sx={(theme) => ({ color: theme.palette.secondary.main })} />
            <Typography
              variant="body2"
              sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}
            >
              Checking updates...
            </Typography>
          </Stack>
        ) : error || !latestAnnouncement ? (
          <Stack
            alignItems="center"
            spacing={1}
            sx={(theme) => ({ py: 2, color: theme.palette.text.secondary })}
          >
            <InfoOutlinedIcon sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: 32 })} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              No announcements today.
            </Typography>
          </Stack>
        ) : (
          <Box
            sx={(theme) => ({
              p: 2,
              bgcolor: `${theme.palette.secondary.main}0F`,
              border: `1px solid ${theme.palette.secondary.main}40`,
              borderRadius: `${theme.shape.borderRadius * 1.5}px`,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                bgcolor: `${theme.palette.secondary.main}1A`,
                borderColor: `${theme.palette.secondary.main}66`,
              },
            })}
          >
            {latestAnnouncement.title && (
              <Typography
                variant="subtitle2"
                sx={(theme) => ({
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 0.5,
                  fontSize: "0.875rem",
                })}
              >
                {latestAnnouncement.title}
              </Typography>
            )}
            <Typography
              variant="body2"
              sx={(theme) => ({
                lineHeight: 1.6,
                color: theme.palette.text.primary,
                fontWeight: 500,
                fontSize: "0.8125rem",
                wordBreak: "break-word",
              })}
            >
              {latestAnnouncement.message}
            </Typography>
          </Box>
        )}
      </CardContent>

      <Divider sx={(theme) => ({ borderStyle: "dashed", borderColor: theme.palette.divider })} />

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
          sx={(theme) => ({
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            textTransform: "none",
            fontWeight: 700,
            fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: 1.2,
            borderRadius: `${theme.shape.borderRadius}px`,
            width: { xs: "100%", sm: "auto" },
            boxShadow: `0 4px 12px ${theme.palette.primary.main}26`,
            "& .MuiButton-startIcon, & .MuiButton-endIcon": {
              color: theme.palette.secondary.main,
            },
            "&:hover": {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              boxShadow: `0 6px 16px ${theme.palette.secondary.main}4D`,
              "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                color: theme.palette.primary.main,
              },
            },
            transition: "all 0.2s ease-in-out",
          })}
        >
          View Bulletin Board
        </Button>
      </Box>
    </Card>
  );
}

export default AnnouncementsCard;