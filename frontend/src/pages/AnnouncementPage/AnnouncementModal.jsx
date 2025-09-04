// src/pages/tenant/AnnouncementModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AnnouncementModal({ announcement, onClose }) {
  if (!announcement) return null;

  return (
    <Dialog
      open={Boolean(announcement)}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          fontWeight: 600,
          color: "#111",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {announcement.title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="subtitle2" sx={{ mb: 1, color: "#c59000" }}>
          {announcement.category} • {announcement.date}
        </Typography>

        <Typography variant="body1" sx={{ color: "#2a2a2a" }}>
          {announcement.description}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default AnnouncementModal;
