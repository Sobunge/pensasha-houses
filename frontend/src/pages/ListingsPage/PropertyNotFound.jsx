// src/pages/ListingsPage/PropertyNotFound.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";

export default function PropertyNotFound() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f8b500, #ffc62c)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          mb: 3,
        }}
      >
        <HomeWorkIcon sx={{ fontSize: 50, color: "#fff" }} />
      </Box>

      {/* Text */}
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Property Not Found
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 420, mb: 3, lineHeight: 1.7 }}
      >
        The property you’re looking for might have been removed, renamed,
        or is temporarily unavailable. Please check again or explore other
        listings.
      </Typography>

      {/* Button */}
      <Button
        component={RouterLink}
        to="/properties"
        variant="contained"
        startIcon={<ArrowBackIcon />}
        sx={{
          background: "linear-gradient(45deg, #f8b500, #ffc62c)",
          color: "#111",
          fontWeight: 700,
          borderRadius: 2,
          px: 3,
          py: 1.2,
          textTransform: "none",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          "&:hover": {
            background: "linear-gradient(45deg, #ffc62c, #f8b500)",
            transform: "scale(1.05)",
          },
        }}
      >
        Back to Listings
      </Button>
    </Box>
  );
}
