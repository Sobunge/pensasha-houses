// src/pages/ListingsPage/PropertyNotFound.jsx
import React from "react";
import { Box, Typography, Toolbar, Button, Container, useTheme } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";

export default function PropertyNotFound() {
  const theme = useTheme();

  return (
    <Container maxWidth="sm">

 {/* Navbar space offset */}
      <Toolbar sx={{ minHeight: { xs: 60, md: 72 } }} />

      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
          py: 6,
          my: 4,
          bgcolor: "#FFFFFF",
          borderRadius: "16px",
          border: "1.5px solid #FDE68A", // Soft gold border
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
        }}
      >
        {/* Icon Badge */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "#F1F5F9",
            color: "#0F172A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <HomeWorkIcon sx={{ fontSize: 40, color: "#0F172A" }} />
        </Box>

        {/* Text */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: theme.palette.text.primary,
            letterSpacing: "-0.02em",
            mb: 1,
          }}
        >
          Property Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 400,
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          The property you’re looking for might have been unlisted, rented out,
          or is temporarily unavailable.
        </Typography>

        {/* Primary Action Button */}
        <Button
          component={RouterLink}
          to="/properties"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            bgcolor: "#D97706",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "0.95rem",
            borderRadius: "10px",
            px: 3.5,
            py: 1.25,
            textTransform: "none",
            boxShadow: "0 4px 14px rgba(217, 119, 6, 0.3)",
            "&:hover": {
              bgcolor: "#B45309",
              boxShadow: "0 6px 18px rgba(217, 119, 6, 0.4)",
            },
          }}
        >
          Back to All Listings
        </Button>
      </Box>
    </Container>
  );
}