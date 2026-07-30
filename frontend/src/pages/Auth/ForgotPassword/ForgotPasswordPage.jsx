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

/* ---------------- Global Font Family Constant ---------------- */
const fontFamilyStyle =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

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
            Reset Password
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontFamily: fontFamilyStyle,
              mb: 3,
            }}
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
                sx={premiumInputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlinedIcon
                        sx={{ color: "#475569", mr: 0.5, fontSize: "1.1rem" }}
                      />
                      <Typography
                        sx={{
                          color: "#0F172A",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          fontFamily: fontFamilyStyle,
                        }}
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
                sx={{
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
                {loading ? "Sending Link..." : "Send Reset Link"}
              </Button>

              {/* Back to Home / Login Option */}
              <Box sx={{ pt: 1 }}>
                <MuiLink
                  component={RouterLink}
                  to="/"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontSize: "0.85rem",
                    color: "#64748B",
                    fontFamily: fontFamilyStyle,
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": { color: "#0F172A", textDecoration: "underline" },
                  }}
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