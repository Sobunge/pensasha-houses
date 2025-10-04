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

  // Default to tenant if no user is logged in
  const role = user?.role || "tenant";

  // Limit messages if compact mode
  const displayMessages = compact ? messages.slice(0, 3) : messages;

  // Navigate helper
  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) onClose(); // Close modal/popover if handler is passed
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header with Close Button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <MailOutlineIcon sx={{ color: "#f8b500", mr: 1 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600, flexGrow: 1 }}>
          Messages
        </Typography>
        {onClose && (
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Message List */}
      <Stack spacing={compact ? 1.5 : 2}>
        {displayMessages.map((msg) => (
          <Box
            key={msg.id}
            onClick={() => handleNavigate(`/${role}/messages/${msg.id}`)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1,
              borderRadius: 2,
              cursor: "pointer",
              bgcolor: msg.unread ? "#fffbe6" : "#f7f7f7",
              "&:hover": { bgcolor: "#fff3cd" },
            }}
          >
            {/* Avatar */}
            <Avatar sx={{ bgcolor: "#f8b500", width: 36, height: 36 }}>
              {msg.sender[0]}
            </Avatar>

            {/* Message Content */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: msg.unread ? 600 : 500 }}
                noWrap
              >
                {msg.sender}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {msg.lastMessage}
              </Typography>
            </Box>

            {/* Timestamp */}
            {!compact && (
              <Typography variant="caption" color="text.secondary">
                {msg.time || "10:00 AM"}
              </Typography>
            )}
          </Box>
        ))}

        {/* View All Button */}
        {compact && (
          <>
            <Divider sx={{ my: 1 }} />
            <Button
              fullWidth
              variant="contained"
              size="small"
              sx={{ bgcolor: "#f8b500", "&:hover": { bgcolor: "#c59000" } }}
              endIcon={<ArrowForwardIcon />}
              onClick={() => handleNavigate(`/${role}/messages`)}
            >
              View All
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default MessagesCard;
