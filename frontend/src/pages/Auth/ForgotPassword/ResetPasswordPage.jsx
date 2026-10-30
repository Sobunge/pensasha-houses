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

/* ---------------- Theme-Integrated Input Styles ---------------- */
const getPremiumInputStyles = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: `${theme.shape.borderRadius}px`,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontSize: "0.95rem",
    fontWeight: 500,
    "& fieldset": {
      borderColor: theme.palette.divider,
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.text.secondary,
    },
    "&.Mui-focused": {
      backgroundColor: theme.palette.background.paper,
      "& fieldset": {
        borderColor: theme.palette.secondary.main,
        borderWidth: "2px",
      },
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
    fontWeight: 600,
    fontSize: "0.9rem",
    "&.Mui-focused": {
      color: theme.palette.secondary.main,
    },
  },
  "& input::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
  "& .MuiFormHelperText-root": {
    color: theme.palette.error?.main || "#DC2626",
    fontWeight: 500,
  },
});

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
        <CircularProgress sx={(theme) => ({ color: theme.palette.secondary.main })} />
      </Box>
    );
  }

  return (
    <Box
      sx={(theme) => ({
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
          backgroundColor: `${theme.palette.primary.main}8C`, // ~55% dark obsidian overlay
          zIndex: 1,
        },
      })}
    >
      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 2 }}>
        <Paper
          elevation={0}
          sx={(theme) => ({
            p: { xs: 3, sm: 4 },
            borderRadius: `${theme.shape.borderRadius * 2}px`,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: `0 25px 50px -12px ${theme.palette.primary.main}40`,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          })}
        >
          {/* Icon Badge above Title */}
          <Avatar
            sx={(theme) => ({
              bgcolor: `${theme.palette.secondary.main}1F`, // ~12% gold fill
              color: theme.palette.secondary.main,
              border: `1px solid ${theme.palette.secondary.main}40`, // ~25% gold border
              width: 56,
              height: 56,
              mb: 2,
            })}
          >
            <LockResetIcon sx={{ fontSize: "1.75rem" }} />
          </Avatar>

          <Typography
            variant="h5"
            sx={(theme) => ({
              fontWeight: 800,
              color: theme.palette.text.primary,
              letterSpacing: "-0.02em",
              mb: 0.5,
            })}
          >
            New Password
          </Typography>

          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              mb: 3,
            })}
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
                sx={(theme) => ({
                  ...getPremiumInputStyles(theme),
                  "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: "1.1rem" })} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={(theme) => ({ color: theme.palette.text.secondary })}
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
                sx={(theme) => ({
                  ...getPremiumInputStyles(theme),
                  "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: "1.1rem" })} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={(theme) => ({ color: theme.palette.text.secondary })}
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
                sx={(theme) => ({
                  mt: 1,
                  py: 1.4,
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textTransform: "none",
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                  boxShadow: `0 4px 14px ${theme.palette.secondary.main}59`,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: theme.palette.secondary.dark,
                    boxShadow: `0 6px 18px ${theme.palette.secondary.main}73`,
                  },
                })}
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