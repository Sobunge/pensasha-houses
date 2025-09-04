// src/pages/MessagesPage/MessageBubble.jsx
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";

function MessageBubble({ message, isSender }) {
  const bubbleColor = isSender ? "#f8b500" : "#e0e0e0"; // gold for me, gray for other
  const textColor = isSender ? "#111" : "#000";

  // Status icon for sender
  const renderStatusIcon = () => {
    if (!isSender) return null;
    switch (message.status) {
      case "sent":
        return <DoneIcon sx={{ fontSize: 16, ml: 0.5, color: "#555" }} />;
      case "delivered":
        return <DoneAllIcon sx={{ fontSize: 16, ml: 0.5, color: "#555" }} />;
      case "read":
        return <DoneAllIcon sx={{ fontSize: 16, ml: 0.5, color: "#1976d2" }} />;
      default:
        return null;
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent={isSender ? "flex-end" : "flex-start"}
      sx={{ width: "100%" }}
    >
      <Box
        sx={{
          maxWidth: "75%",
          bgcolor: bubbleColor,
          color: textColor,
          p: 1.5,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="body2">{message.text}</Typography>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={0.5}>
          <Typography variant="caption" sx={{ color: "#555" }}>
            {message.time}
          </Typography>
          {renderStatusIcon()}
        </Stack>
      </Box>
    </Stack>
  );
}

export default MessageBubble;
