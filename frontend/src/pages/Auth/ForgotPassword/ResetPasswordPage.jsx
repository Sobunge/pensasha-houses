import React, { useState } from "react";
import { 
  Box, 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  InputAdornment, 
  IconButton,
  CircularProgress 
} from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import api from "../../../api/api";
import { useNotification } from "../../../components/NotificationProvider";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { notify } = useNotification();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      notify("Invalid or missing reset token.", "error");
      return;
    }
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
        newPassword: password
      });
      
      notify("Password reset successful! Please login with your new password.", "success");
      navigate("/", { replace: true });
    } catch (err) {
      const message = err?.response?.data || "Failed to reset password. The link may be expired.";
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        /* 1. LAYOUT: AppLayout handles pt: 64px, so we fill the rest */
        minHeight: "85vh", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        
        /* 2. BACKGROUND: Same as Forgot Password for consistency */
        backgroundImage: "url('/assets/images/background_2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        
        /* 3. DARK OVERLAY */
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
            /* 4. FROSTED GLASS EFFECT */
            bgcolor: "rgba(255, 255, 255, 0.88)", 
            backdropFilter: "blur(10px)",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "#111" }}>
            New Password
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Please enter and confirm your new password below to secure your account.
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
                    boxShadow: "0 4px 15px rgba(248,181,0,0.3)"
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