// src/pages/LandlordPage/LandlordMessages.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// Dummy chat messages
const initialMessages = [
  { sender: "tenant", text: "Hello, my rent is due tomorrow.", time: "10:00 AM" },
  { sender: "landlord", text: "Thanks for the reminder! I’ll check.", time: "10:05 AM" },
  { sender: "tenant", text: "Also, the sink is leaking.", time: "10:06 AM" },
  { sender: "landlord", text: "I’ll send a caretaker today.", time: "10:10 AM" },
];

const LandlordMessages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const chatEndRef = useRef(null);

  // Scroll to bottom when new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        sender: "landlord",
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <Box sx={{ minHeight: "100%", p: { xs: 1, md: 2 } }}>
      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
          bgcolor: "#fff",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, textAlign: "center", mb: 2 }}>
          Messages
        </Typography>

        {/* Chat window */}
        <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
          <Stack spacing={1}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === "landlord" ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: "75%",
                    bgcolor: msg.sender === "landlord" ? "#f8b500" : "#e0e0e0",
                    color: msg.sender === "landlord" ? "#fff" : "#000",
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", textAlign: "right", mt: 0.5 }}
                  >
                    {msg.time}
                  </Typography>
                </Paper>
              </Box>
            ))}
            <div ref={chatEndRef} />
          </Stack>
        </Box>

        {/* Input */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            placeholder="Type a message..."
            variant="outlined"
            size="small"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <IconButton color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default LandlordMessages;
