import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext"; // adjust path

function NotFound() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Determine fallback route based on role
  const getRedirectPath = () => {
    if (!user) return "/"; // not logged in → home page

    const roleRedirects = {
      tenant: "/tenant",
      landlord: "/landlord",
      caretaker: "/caretaker",
      admin: "/admin",
    };

    return roleRedirects[user.role] || "/";
  };

  return (
    <Box
      sx={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F8FAFC",
        py: { xs: 4, md: 6 },
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: "16px",
            bgcolor: "#FFFFFF",
            /* Gold border matching accent */
            border: "1px solid #D4AF37",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(212, 175, 55, 0.12)",
          }}
        >
          {/* Gold Icon Badge */}
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "16px",
              color: "#D4AF37",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 40 }} />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "4.5rem", sm: "6rem" },
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-2px",
              lineHeight: 1,
              mb: 1,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "#0F172A",
              mb: 1.5,
              fontWeight: 700,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#64748B",
              mb: 4,
              fontSize: "0.95rem",
              lineHeight: 1.6,
              maxWidth: "380px",
              mx: "auto",
            }}
          >
            The page you are looking for doesn't exist or may have been moved. Let's get you back on track.
          </Typography>

          <Button
            variant="contained"
            startIcon={<HomeOutlinedIcon />}
            sx={{
              bgcolor: "#D4AF37",
              color: "#0F172A",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              px: 3.5,
              py: 1.2,
              borderRadius: "10px",
              border: "1px solid #0F172A",
              boxShadow: "none",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#1E293B",
                color:"#FFFFFF",
                borderColor: "#D4AF37",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.25)",
              },
            }}
            onClick={() => navigate(getRedirectPath())}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default NotFound;