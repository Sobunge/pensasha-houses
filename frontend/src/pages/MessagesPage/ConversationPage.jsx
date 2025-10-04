// src/pages/LandlordPage/ConversationPage.jsx
import React, { useState } from "react";
import { Box, Stack, Typography, Paper, Button, Avatar } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MessageBubble from "../MessagesPage/MessageBubble";
import ReplyInput from "../MessagesPage/ReplyInput";

const PAGE_SIZE = 5;

// Initial conversation history
const seedMessages = [
  { sender: "tenant", text: "Hello, my rent is due tomorrow.", time: "10:00 AM", status: "read" },
  { sender: "landlord", text: "Thanks for the reminder! I’ll check.", time: "10:05 AM", status: "read" },
  { sender: "tenant", text: "Also, the sink is leaking.", time: "10:06 AM", status: "read" },
  { sender: "landlord", text: "I’ll send a caretaker today.", time: "10:10 AM", status: "read" },
];

export default function ConversationPage() {
  const [messages, setMessages] = useState(seedMessages);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(messages.length / PAGE_SIZE);

  // Slice messages for current page (newest last)
  const startIndex = Math.max(messages.length - currentPage * PAGE_SIZE, 0);
  const endIndex = messages.length - (currentPage - 1) * PAGE_SIZE;
  const pageMessages = messages.slice(startIndex, endIndex);

  const handleSend = (text) => {
    const now = new Date();
    const newMsg = {
      sender: "landlord",
      text,
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages((prev) => {
      const updated = [...prev, newMsg];
      const msgIndex = updated.length - 1;

      // Simulate message status updates
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m, i) =>
            i === msgIndex ? { ...m, status: "delivered" } : m
          )
        );
      }, 1500);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m, i) =>
            i === msgIndex ? { ...m, status: "read" } : m
          )
        );
      }, 4000);

      return updated;
    });

    setCurrentPage(1); // go to the latest page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
        p: 2,
        gap: 1,
      }}
    >
      {/* Header */}
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <ChatIcon sx={{ color: "#f8b500" }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Conversation
        </Typography>
      </Stack>

      {/* Messages container */}
      <Paper
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          p: 1.5,
          overflow: "hidden",
        }}
      >
        {/* Pagination controls */}
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Button
            size="small"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage >= totalPages}
          >
            Older
          </Button>
          <Button
            size="small"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage <= 1}
          >
            Newer
          </Button>
        </Stack>

        {/* Messages */}
        {pageMessages.map((msg, i) => {
          const globalIndex = startIndex + i;

          return (
            <Box
              key={globalIndex}
              sx={{
                display: "flex",
                justifyContent: msg.sender === "landlord" ? "flex-end" : "flex-start",
                alignItems: "flex-end",
                mb: 0.8,
              }}
            >
              {msg.sender === "tenant" && (
                <Avatar sx={{ mr: 1, width: 32, height: 32 }}>T</Avatar>
              )}

              <MessageBubble message={msg} isSender={msg.sender === "landlord"} />

              {msg.sender === "landlord" && (
                <Avatar sx={{ ml: 1, width: 32, height: 32 }}>L</Avatar>
              )}
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
