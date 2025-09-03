import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
} from "@mui/material";

function MessagesCard({ compact }) {
  // Placeholder data
  const messages = [
    {
      id: 1,
      sender: "Caretaker",
      text: "Your maintenance request has been updated.",
      time: "2h ago",
      avatar: "/assets/images/avatar1.png",
    },
    {
      id: 2,
      sender: "Landlord",
      text: "Please remember your rent is due tomorrow.",
      time: "1d ago",
      avatar: "/assets/images/avatar2.png",
    },
    {
      id: 3,
      sender: "Support",
      text: "Water issue in Block B is resolved.",
      time: "3d ago",
      avatar: "/assets/images/avatar3.png",
    },
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: compact ? 0 : 2,
        bgcolor: "#fff",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#111", mb: 1 }}
        >
          Messages
        </Typography>

        {/* Messages List */}
        <List disablePadding>
          {messages.map((msg, index) => (
            <Box key={msg.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  px: 0,
                  py: 1,
                  "&:hover": {
                    bgcolor: "#f7f7f7",
                    borderRadius: 2,
                    cursor: "pointer",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={msg.avatar} alt={msg.sender} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 600, color: "#111" }}>
                      {msg.sender}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        sx={{ color: "#555", display: "block" }}
                      >
                        {msg.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#888" }}
                      >
                        {msg.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < messages.length - 1 && <Divider />}
            </Box>
          ))}
        </List>

        {/* View All */}
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Link
            href="/tenant/messages"
            underline="none"
            sx={{
              color: "#f8b500",
              fontWeight: 600,
              fontSize: "0.9rem",
              "&:hover": { color: "#c59000" },
            }}
          >
            View All
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MessagesCard;
