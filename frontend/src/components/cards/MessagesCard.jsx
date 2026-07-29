// src/components/MessagesCard.jsx
import React from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
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
    <Box
      sx={{
        p: 2.5,
        width: compact ? { xs: 300, sm: 360 } : "100%",
        bgcolor: "#FFFFFF",
      }}
    >
      {/* --- Header --- */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
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
            mr: 1.5,
          }}
        >
          <MailOutlineIcon sx={{ fontSize: 18 }} />
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "#0F172A", flexGrow: 1, letterSpacing: "-0.2px" }}
        >
          Messages
        </Typography>

        {onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: "#64748B",
              "&:hover": { bgcolor: "#F1F5F9", color: "#0F172A" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mb: 2, borderColor: "#E2E8F0" }} />

      {/* --- Message List --- */}
      <Stack spacing={1}>
        {displayMessages.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
            No messages available.
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
                // Subtle dark text & light warm tint for unread items
                bgcolor: msg.unread ? "rgba(212, 175, 55, 0.05)" : "transparent",
                border: "1px solid",
                borderColor: msg.unread ? "rgba(212, 175, 55, 0.25)" : "transparent",
                "&:hover": {
                  bgcolor: "rgba(212, 175, 55, 0.10)",
                  borderColor: "rgba(212, 175, 55, 0.4)",
                  transform: "translateX(2px)",
                },
              }}
            >
              {/* Avatar with initial or image */}
              <Avatar
                sx={{
                  bgcolor: msg.unread ? "#0F172A" : "#64748B",
                  color: msg.unread ? "#D4AF37" : "#FFFFFF",
                  width: 38,
                  height: 38,
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  border: msg.unread ? "1.5px solid #D4AF37" : "none",
                }}
              >
                {msg.sender ? msg.sender[0].toUpperCase() : "U"}
              </Avatar>

              {/* Message Details */}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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

              {/* Timestamp (Expanded View) */}
              {!compact && (
                <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "0.7rem" }}>
                  {msg.time || "10:00 AM"}
                </Typography>
              )}
            </Box>
          ))
        )}

        {/* --- View All Footer Button --- */}
        {compact && (
          <Box sx={{ pt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              onClick={() => handleNavigate(`/${role}/messages`)}
              endIcon={<ArrowForwardIcon fontSize="small" />}
              sx={{
                bgcolor: "#0F172A",
                color: "#FFFFFF",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "10px",
                py: 1,
                fontSize: "0.8125rem",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                "&:hover": {
                  bgcolor: "#D4AF37",
                  color: "#0F172A",
                  boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
                },
              }}
            >
              View All Messages
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default MessagesCard;