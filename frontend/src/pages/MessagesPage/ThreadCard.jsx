// src/pages/MessagesPage/ThreadCard.jsx
import React from "react";
import { Card, CardContent, Typography, Button, Stack, Chip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";

function ThreadCard({ thread, onView }) {
  return (
    <Card
      sx={{
        borderLeft: thread.unread ? "4px solid #f8b500" : "4px solid transparent",
        cursor: "pointer",
        "&:hover": { bgcolor: "#fffbe6" },
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* Message title with icon, left-aligned */}
          <Stack spacing={0.5} alignItems="flex-start" flex={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <MarkEmailUnreadIcon sx={{ color: "#f8b500" }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, textAlign: "left" }}>
                {thread.sender}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left" }}>
              {thread.lastMessage} • {thread.date}
            </Typography>
          </Stack>

          {/* Actions */}
          <Stack direction="row" spacing={1} alignItems="center">
            {thread.unread && <Chip label="Unread" size="small" color="warning" />}
            <Button
              variant="contained"
              size="small"
              startIcon={<VisibilityIcon />}
              sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#115293" } }}
              onClick={() => onView(thread)}
            >
              View
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ThreadCard;
