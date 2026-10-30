// src/pages/ForgotPasswordPage.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  CircularProgress,
  Avatar,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const digits = phone.replace(/\D/g, "");
      const normalizedPhone =
        "+254" + (digits.startsWith("0") ? digits.substring(1) : digits);

      await api.post("/auth/forgot-password", { phoneNumber: normalizedPhone });

      notify(
        "If an account exists, a reset link has been sent to the registered email.",
        "success"
      );

      setPhone("");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      const message = "Server error. Please try again later.";
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

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
          backgroundColor: `${theme.palette.primary.main}8C`, // ~55% primary dark overlay
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
            Reset Password
          </Typography>

          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              mb: 3,
            })}
          >
            Enter your phone number below. We'll send a secure reset link to your email.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ width: "100%" }}
          >
            <Stack spacing={2.5} sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Phone Number"
                placeholder="7XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                size="small"
                sx={getPremiumInputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlinedIcon
                        sx={(theme) => ({ color: theme.palette.text.secondary, mr: 0.5, fontSize: "1.1rem" })}
                      />
                      <Typography
                        sx={(theme) => ({
                          color: theme.palette.text.primary,
                          fontWeight: 700,
                          fontSize: "0.9rem",
                        })}
                      >
                        +254
                      </Typography>
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
                    <SendIcon sx={{ fontSize: "1.1rem !important" }} />
                  )
                }
                sx={(theme) => ({
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
                {loading ? "Sending Link..." : "Send Reset Link"}
              </Button>

              {/* Back to Home / Login Option */}
              <Box sx={{ pt: 1 }}>
                <MuiLink
                  component={RouterLink}
                  to="/"
                  sx={(theme) => ({
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontSize: "0.85rem",
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": { color: theme.palette.text.primary, textDecoration: "underline" },
                  })}
                >
                  <ArrowBackIcon sx={{ fontSize: "1rem" }} />
                  Back to Home
                </MuiLink>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}