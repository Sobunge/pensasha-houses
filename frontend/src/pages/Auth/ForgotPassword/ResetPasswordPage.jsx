// src/pages/ResetPasswordPage.jsx
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
  Avatar,
  Stack,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { useNotification } from "../../../components/NotificationProvider";

/* ---------------- Global Font Family Constant ---------------- */
const fontFamilyStyle = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

/* ---------------- Premium High-Contrast Input Styles ---------------- */
const premiumInputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#FAFAFA",
    color: "#0F172A",
    fontSize: "0.95rem",
    fontWeight: 500,
    fontFamily: fontFamilyStyle,
    "& fieldset": {
      borderColor: "#CBD5E1",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "#94A3B8",
    },
    "&.Mui-focused": {
      backgroundColor: "#FFFFFF",
      "& fieldset": {
        borderColor: "#D4AF37",
        borderWidth: "2px",
      },
    },
  },
  "& .MuiInputLabel-root": {
    color: "#475569",
    fontWeight: 600,
    fontSize: "0.9rem",
    fontFamily: fontFamilyStyle,
    "&.Mui-focused": {
      color: "#D4AF37",
    },
  },
  "& input::placeholder": {
    color: "#94A3B8",
    opacity: 1,
    fontFamily: fontFamilyStyle,
  },
  "& .MuiFormHelperText-root": {
    color: "#DC2626",
    fontWeight: 500,
    fontFamily: fontFamilyStyle,
  },
};

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get(`/auth/verify-reset-token?token=${token}`);
        setVerifying(false);
      } catch (err) {
        const message = err?.response?.data || "This reset link is invalid or has expired.";
        notify(message, "error");
        navigate("/", { replace: true });
      }
    };

    if (token) verifyToken();
    else navigate("/");
  }, [token, navigate, notify]);

  const validate = () => {
    let tempErrors = { password: "", confirmPassword: "" };
    let isValid = true;

    if (password.length < 5) {
      tempErrors.password = "Password must be at least 5 characters.";
      isValid = false;
    }

    if (confirmPassword !== password) {
      tempErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        token: token,
        newPassword: password,
      });

      notify("Password reset successful! Please login with your new password.", "success");
      navigate("/", { replace: true, state: { openLogin: true } });
    } catch (err) {
      const message = err?.response?.data || "Failed to reset password.";
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <Box sx={{ display: "flex", height: "80vh", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress sx={{ color: "#D4AF37" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
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
        backgroundAttachment: "fixed",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(15, 23, 42, 0.55)",
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: "24px",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Icon Badge above Title */}
          <Avatar
            sx={{
              bgcolor: "rgba(212, 175, 55, 0.12)",
              color: "#D4AF37",
              border: "1px solid rgba(212, 175, 55, 0.25)",
              width: 56,
              height: 56,
              mb: 2,
            }}
          >
            <LockResetIcon sx={{ fontSize: "1.75rem" }} />
          </Avatar>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#0F172A",
              fontFamily: fontFamilyStyle,
              letterSpacing: "-0.02em",
              mb: 0.5,
            }}
          >
            New Password
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontFamily: fontFamilyStyle,
              mb: 3,
            }}
          >
            Secure your account by entering a new password below.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ width: "100%" }}
          >
            <Stack spacing={2} sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="New Password"
                placeholder="Enter your new password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                error={Boolean(errors.password)}
                helperText={errors.password}
                required
                size="small"
                sx={{
                  ...premiumInputStyles,
                  "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#475569", fontSize: "1.1rem" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: "#64748B" }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirm New Password"
                placeholder="Confirm your new password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    setErrors({ ...errors, confirmPassword: "" });
                }}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                required
                size="small"
                sx={{
                  ...premiumInputStyles,
                  "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#475569", fontSize: "1.1rem" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: "#64748B" }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <LockResetIcon sx={{ fontSize: "1.1rem !important" }} />
                  )
                }
                sx={{
                  mt: 1,
                  py: 1.4,
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  fontFamily: fontFamilyStyle,
                  textTransform: "none",
                  bgcolor: "#D4AF37",
                  color: "#000000",
                  boxShadow: "0 4px 14px rgba(212, 175, 55, 0.35)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: "#B5922B",
                    boxShadow: "0 6px 18px rgba(181, 146, 43, 0.45)",
                  },
                }}
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}