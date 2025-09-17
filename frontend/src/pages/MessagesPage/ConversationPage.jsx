import React, { useState } from "react";
import { Box, Stack, Typography, Paper, Button, Avatar } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MessageBubble from "./MessageBubble";
import ReplyInput from "./ReplyInput";

const PAGE_SIZE = 5;

const initialMessages = Array.from({ length: 50 }, (_, i) => ({
  text: `Message ${i + 1}`,
  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  sender: i % 2 === 0 ? "me" : "other",
}));

export default function ConversationPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(messages.length / PAGE_SIZE);

  // Get messages for current page (newest messages at the bottom)
  const startIndex = Math.max(messages.length - currentPage * PAGE_SIZE, 0);
  const endIndex = messages.length - (currentPage - 1) * PAGE_SIZE;
  const pageMessages = messages.slice(startIndex, endIndex);

  const handleSend = (text) => {
    const now = new Date();
    const newMsg = {
      text,
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "me",
    };
    setMessages((prev) => [...prev, newMsg]);
    setCurrentPage(1); // jump to latest page
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "80vh", p: 2, gap: 1 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <ChatIcon sx={{ color: "#f8b500" }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Conversation
        </Typography>
      </Stack>

      {/* Messages */}
      <Paper sx={{ flex: 1, display: "flex", flexDirection: "column", borderRadius: 3, p: 1.5, overflow: "hidden" }}>
        {/* Pagination Controls */}
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Button size="small" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage >= totalPages}>
            Older
          </Button>
          <Button size="small" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage <= 1}>
            Newer
          </Button>
        </Stack>

        {/* Message list */}
        {pageMessages.map((msg, i) => {
          // Compute global index in the full messages array
          const globalIndex = startIndex + i;
          const prevMsg = globalIndex > 0 ? messages[globalIndex - 1] : null;
          const showAvatar = !prevMsg || prevMsg.sender !== msg.sender;

          return (
            <Box key={globalIndex} sx={{ display: "flex", justifyContent: msg.sender === "me" ? "flex-end" : "flex-start", mb: 0.8 }}>
              {msg.sender === "other" && showAvatar && <Avatar sx={{ mr: 1, width: 32, height: 32 }}>O</Avatar>}
              <MessageBubble message={msg} isSender={msg.sender === "me"} />
              {msg.sender === "me" && showAvatar && <Avatar sx={{ ml: 1, width: 32, height: 32 }}>Me</Avatar>}
            </Box>
          );
        })}
      </Paper>

      {/* Reply input */}
      <Box sx={{ mt: 0.5 }}>
        <ReplyInput onSend={handleSend} />
      </Box>
    </Box>
  );
}
