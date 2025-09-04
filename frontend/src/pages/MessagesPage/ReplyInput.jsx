// src/pages/MessagesPage/ReplyInput.jsx
import React, { useState } from "react";
import { TextField, IconButton, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ReplyInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        gap: 1,
        bgcolor: "#fff",
        borderRadius: 3,
      }}
    >
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        multiline
        maxRows={4}
        onKeyPress={handleKeyPress}
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        sx={{
          bgcolor: "#f8b500",
          "&:hover": { bgcolor: "#ffc62c" },
          color: "#111",
        }}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}

export default ReplyInput;
