import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import api from "../../../api/api";
import { useNotification } from "../../../components/NotificationProvider";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true); // State for initial token check

  // 1. INITIAL VERIFICATION: Check if token is valid on mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Calling the new verification endpoint
        await api.get(`/auth/verify-reset-token?token=${token}`);
        setVerifying(false);
      } catch (err) {
        const message = err?.response?.data || "This reset link is invalid or has expired.";
        notify(message, "error");
        navigate("/", { replace: true });
      }
    };

    if (token) {
      verifyToken();
    } else {
      navigate("/");
    }
  }, [token, navigate, notify]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 5) {
      notify("Password must be at least 5 characters.", "error");
      return;
    }
    if (password !== confirmPassword) {
      notify("Passwords do not match.", "error");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        token: token,
        newPassword: password,
      });

      notify("Password reset successful! Please login with your new password.", "success");
      navigate("/", { replace: true });
    } catch (err) {
      const message = err?.response?.data || "Failed to reset password.";
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while verifying the token
  if (verifying) {
    return (
      <Box sx={{ display: "flex", height: "80vh", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress sx={{ color: "#F8B500" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        /* Adjusted minHeight to prevent scrolling issues with fixed headers */
        minHeight: "calc(100vh - 64px)", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        px: { xs: 2, sm: 0 },
        py: { xs: 4, md: 0 },

        backgroundImage: "url('/assets/images/background_2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "#111" }}>
            New Password
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Secure your Pensasha account by entering a new password below.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#F8B500", mr: 1 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm New Password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              sx={{ mb: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#F8B500", mr: 1 }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.8,
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: 2,
                bgcolor: "#F8B500",
                color: "#111",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#e0a400",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 15px rgba(248,181,0,0.3)",
                },
                transition: "all 0.2s ease",
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Update Password"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}