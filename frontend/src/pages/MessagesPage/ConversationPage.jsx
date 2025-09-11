// src/pages/MessagesPage/ConversationPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { Box, Stack, Typography, Toolbar, Paper } from "@mui/material";
import UsersNavbar from "../../components/UsersNavbar";
import UserSidebar from "../../components/UserSidebar"; // ✅ replace import
import MessageBubble from "./MessageBubble";
import ReplyInput from "./ReplyInput";
import ChatIcon from "@mui/icons-material/Chat";

// Sample messages
const initialMessages = [
  { text: "Hello!", time: "10:00 AM", sender: "other", status: "read" },
  { text: "Hi, how are you?", time: "10:01 AM", sender: "me", status: "read" },
  { text: "I'm good, thanks!", time: "10:02 AM", sender: "other", status: "read" },
];

function ConversationPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSend = (text) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [
      ...prev,
      { text, time: timeString, sender: "me", status: "sent" },
    ]);

    // Simulate message delivered
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m, idx) =>
          idx === prev.length - 1 ? { ...m, status: "delivered" } : m
        )
      );
    }, 500);

    // Simulate message read
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m, idx) =>
          idx === prev.length - 1 ? { ...m, status: "read" } : m
        )
      );
    }, 1500);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <UsersNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <UserSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} /> 
      {/* ✅ replaced TenantSidebar */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          bgcolor: "#f7f7f7",
          minHeight: "87.25vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />

        {/* Conversation Title */}
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <ChatIcon sx={{ color: "#f8b500" }} />
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#111111" }}>
            Conversation
          </Typography>
        </Stack>

        {/* Messages Card */}
        <Paper
          elevation={3}
          sx={{
            flexGrow: 1,
            p: 2,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mb: 2,
            bgcolor: "#fff",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          <Stack spacing={1}>
            {messages.map((msg, index) => (
              <MessageBubble key={index} message={msg} isSender={msg.sender === "me"} />
            ))}
            <div ref={messagesEndRef} />
          </Stack>
        </Paper>

        {/* Reply Input */}
        <ReplyInput onSend={handleSend} />
      </Box>
    </Box>
  );
}

export default ConversationPage;
