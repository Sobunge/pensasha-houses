import React from "react";
import { Modal, Box, Typography, Divider, Button } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";

function MaintenanceRequestModal({ request, onClose }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "In Progress":
        return "#f8b500"; // theme yellow
      case "Pending":
      default:
        return "red";
    }
  };

  return (
    <Modal open={Boolean(request)} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500 },
          bgcolor: "#fff",
          borderRadius: 2,
          p: 3,
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ color: "#2a2a2a" }}
        >
          {request.title}
        </Typography>
        <Divider />
        <Typography variant="body2">
          <strong>Type:</strong> {request.type}
        </Typography>
        <Typography variant="body2">
          <strong>Priority:</strong> {request.priority}
        </Typography>
        <Typography variant="body2" sx={{ color: getStatusColor(request.status) }}>
          <strong>Status:</strong> {request.status || "Pending"}
        </Typography>
        <Typography variant="body2">
          <strong>Description:</strong> {request.description}
        </Typography>
        <Typography variant="body2">
          <strong>Date:</strong> {request.date}
        </Typography>
        {request.file && (
          <Button
            variant="contained"
            color="warning"
            startIcon={<AttachFileIcon />}
            href={request.file}
            target="_blank"
            sx={{ textTransform: "none" }}
          >
            View Attachment
          </Button>
        )}
        <Button
          variant="contained"
          startIcon={<CloseIcon />}
          onClick={onClose}
          sx={{
            textTransform: "none",
            bgcolor: "#e57373", // soft red
            color: "#fff",
            "&:hover": {
              bgcolor: "#f44336", // darker red on hover
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default MaintenanceRequestModal;
