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
  
  // State
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Extract token from URL: /reset-password?token=...
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
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
      // Redirect to home so they can open the Login Modal
      navigate("/", { replace: true });
    } catch (err) {
      const message = err?.response?.data || "Failed to reset password. The link may be expired.";
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", pt: 12, pb: 6 }}>
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            New Password
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
            Please enter and confirm your new password below.
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
                    <LockIcon sx={{ color: "#F8B500" }} />
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
                    <LockIcon sx={{ color: "#F8B500" }} />
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
                py: 1.5,
                fontWeight: 700,
                bgcolor: "#F8B500",
                color: "#111",
                "&:hover": { bgcolor: "#e0a400" },
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