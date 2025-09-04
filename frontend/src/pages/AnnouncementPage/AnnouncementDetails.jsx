import React from "react";
import { Box, Typography, Chip, Divider } from "@mui/material";
import { useParams } from "react-router-dom";

// Mock data for demo
const mockData = {
  1: {
    title: "Water Outage Scheduled",
    category: "Maintenance",
    date: "2025-09-01",
    author: "Caretaker James",
    content:
      "Please note there will be no water supply tomorrow (Sept 1) from 8 AM to 5 PM due to maintenance work on the main pipeline. We apologize for the inconvenience.",
  },
  2: {
    title: "Rent Payment Reminder",
    category: "Payments",
    date: "2025-09-02",
    author: "Landlord Admin",
    content:
      "Kindly ensure your September rent is paid before the 5th to avoid penalties. Payments can be made through the portal or via MPesa Paybill.",
  },
};

function AnnouncementDetails() {
  const { id } = useParams();
  const announcement = mockData[id];

  if (!announcement) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Announcement not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
        {announcement.title}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Chip
          label={announcement.category}
          size="small"
          sx={{ bgcolor: "#f8b500", color: "#111" }}
        />
        <Typography variant="body2" sx={{ color: "#777" }}>
          {announcement.date} • {announcement.author}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body1" sx={{ color: "#2a2a2a", lineHeight: 1.6 }}>
        {announcement.content}
      </Typography>
    </Box>
  );
}

export default AnnouncementDetails;
