import React, { useState } from "react";
import { Box, Container, TextField, Button, Typography, Paper, InputAdornment } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import api from "../../../api/api";
import { useNotification } from "../../../components/NotificationProvider";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const digits = phone.replace(/\D/g, "");
      const normalizedPhone = "+254" + (digits.startsWith("0") ? digits.substring(1) : digits);

      // We send the request
      await api.post("/auth/forgot-password", { phoneNumber: normalizedPhone });

      // We show a success message regardless to protect user privacy
      notify("If an account exists, a reset link has been sent to the registered email.", "success");
      setPhone(""); // Clear the input
    } catch (err) {
      // This will now only trigger on actual server/network errors
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
        minHeight: "calc(100dvh - 114px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",

        px: { xs: 2, sm: 0 }, 
        py: { xs: 4, md: 0 },

        // --- BACKGROUND IMAGE SETTINGS ---
        backgroundImage: "url('/assets/images/background_2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // Keeps image still while scrolling

        // --- DARK OVERLAY ---
        // This makes the form stand out more against the photo
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            // Frosted glass effect
            bgcolor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(8px)",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "#1a1a1a" }}>
            Reset Password
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Enter your phone number below. We'll send a secure reset link to your email.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="7XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "#F8B500", mr: 1 }} />
                    <Typography sx={{ fontWeight: 700, color: "#1a1a1a" }}>+254</Typography>
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
                "&:hover": { bgcolor: "#e0a400", transform: "translateY(-1px)" },
                transition: "all 0.2s ease-in-out",
              }}
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}