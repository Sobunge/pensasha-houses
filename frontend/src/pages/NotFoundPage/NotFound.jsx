import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "81.11vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: 6,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Container maxWidth="sm">
        {/* Not Found Icon */}
        <ErrorOutlineIcon
          sx={{
            fontSize: { xs: 60, md: 80 },
            color: "#f8b500",
            mb: 2,
          }}
        />

        {/* 404 */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "6rem", md: "8rem" },
            fontWeight: 700,
            color: "#2A2A2A",
          }}
        >
          404
        </Typography>

        {/* Subheading */}
        <Typography
          variant="h5"
          sx={{ color: "#2A2A2A", mb: 2, fontWeight: 500 }}
        >
          Oops! Page Not Found
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{ color: "#555555", mb: 4 }}
        >
          The page you are looking for might have been removed or the URL is incorrect.
        </Typography>

        {/* Go Home Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f8b500",
            color: "#111111",
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            "&:hover": { backgroundColor: "#c59000" },
          }}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </Button>
      </Container>
    </Box>
  );
}

export default NotFound;
