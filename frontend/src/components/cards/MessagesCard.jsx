// src/components/MessagesCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Box,
  Stack,
  Typography,
  Divider,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../pages/Auth/AuthContext";

function MessagesCard({ messages = [], compact = false, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role || "tenant";

  // Limit messages if compact mode
  const displayMessages = compact ? messages.slice(0, 3) : messages;

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
          <MailOutlineIcon sx={{ fontSize: 18 }} />
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
          Messages
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

      {/* --- Message List Area --- */}
      <CardContent
        sx={{
          p: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: displayMessages.length === 0 ? "center" : "flex-start",
          minHeight: 160,
        }}
      >
        <Stack spacing={1}>
          {displayMessages.length === 0 ? (
            <Typography
              variant="body2"
              sx={{ color: "#64748B", textAlign: "center", py: 2 }}
            >
              No recent messages available.
            </Typography>
          ) : (
            displayMessages.map((msg) => (
              <Box
                key={msg.id}
                onClick={() => handleNavigate(`/${role}/messages/${msg.id}`)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.25,
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  bgcolor: msg.unread
                    ? "rgba(212, 175, 55, 0.06)"
                    : "transparent",
                  border: "1px solid",
                  borderColor: msg.unread
                    ? "rgba(212, 175, 55, 0.25)"
                    : "transparent",
                  "&:hover": {
                    bgcolor: "rgba(212, 175, 55, 0.12)",
                    borderColor: "rgba(212, 175, 55, 0.4)",
                    transform: "translateX(3px)",
                  },
                }}
              >
                {/* Avatar with initial */}
                <Avatar
                  sx={{
                    bgcolor: msg.unread ? "#0F172A" : "#F1F5F9",
                    color: msg.unread ? "#D4AF37" : "#64748B",
                    width: 38,
                    height: 38,
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    border: msg.unread
                      ? "1.5px solid #D4AF37"
                      : "1px solid #E2E8F0",
                  }}
                >
                  {msg.sender ? msg.sender[0].toUpperCase() : "U"}
                </Avatar>

                {/* Message Details */}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: msg.unread ? 700 : 500,
                        color: "#0F172A",
                        fontSize: "0.875rem",
                      }}
                      noWrap
                    >
                      {msg.sender}
                    </Typography>

                    {/* Unread Glow Dot */}
                    {msg.unread && (
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          bgcolor: "#D4AF37",
                          boxShadow: "0 0 6px rgba(212, 175, 55, 0.8)",
                        }}
                      />
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: msg.unread ? "#334155" : "#64748B",
                      fontSize: "0.78rem",
                      fontWeight: msg.unread ? 500 : 400,
                    }}
                    noWrap
                  >
                    {msg.lastMessage}
                  </Typography>
                </Box>

                {/* Timestamp */}
                {!compact && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#94A3B8", fontSize: "0.7rem", flexShrink: 0 }}
                  >
                    {msg.time || "10:00 AM"}
                  </Typography>
                )}
              </Box>
            ))
          )}
        </Stack>
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
          endIcon={<ArrowForwardIcon />}
          onClick={() => handleNavigate(`/${role}/messages`)}
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
            "& .MuiButton-endIcon": {
              color: "#D4AF37",
            },
            "&:hover": {
              bgcolor: "#D4AF37",
              color: "#0F172A",
              boxShadow: "0 6px 16px rgba(212, 175, 55, 0.3)",
              "& .MuiButton-endIcon": {
                color: "#0F172A",
              },
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          View All Messages
        </Button>
      </Box>
    </Card>
  );
}

export default MessagesCard;