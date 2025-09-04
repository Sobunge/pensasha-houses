import React from "react";
import { Box, Stack, Typography, Divider, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

function MessagesCard({ messages = [], compact = false }) {
  const navigate = useNavigate();

  // Show only latest 3 messages if compact
  const displayMessages = compact ? messages.slice(0, 3) : messages;

  return (
    <Box sx={{ p: 2 }}>
      {/* Header / Title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <MailOutlineIcon sx={{ color: "#f8b500" }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Messages
        </Typography>
      </Box>

      <Stack spacing={compact ? 1.5 : 2}>
        {displayMessages.map((msg) => (
          <Box
            key={msg.id}
            onClick={() => navigate(`/tenant/messages/${msg.id}`)}
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
            {/* Avatar with first letter */}
            <Avatar sx={{ bgcolor: "#f8b500", width: 36, height: 36 }}>
              {msg.sender[0]}
            </Avatar>

            {/* Message content */}
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

        {compact && (
          <>
            <Divider sx={{ my: 1 }} />
            <Button
              fullWidth
              variant="contained"
              size="small"
              sx={{ bgcolor: "#f8b500", "&:hover": { bgcolor: "#c59000" } }}
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/tenant/messages")}
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
