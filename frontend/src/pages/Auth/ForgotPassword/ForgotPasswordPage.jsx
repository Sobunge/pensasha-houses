import React, { useState } from "react";
import { Box, Container, TextField, Button, Typography, Paper, InputAdornment } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import api from "../../api/api";
import { useNotification } from "../../components/NotificationProvider";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Normalize phone to match backend (+254...)
      const digits = phone.replace(/\D/g, "");
      const normalizedPhone = "+254" + (digits.startsWith("0") ? digits.substring(1) : digits);

      await api.post("/auth/forgot-password", { phoneNumber: normalizedPhone });
      notify("If an account exists, a reset link has been sent to the registered email.", "success");
    } catch (err) {
      notify("Failed to send reset link. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", pt: 12 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "#111" }}>
            Reset Password
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Enter your phone number below. We will find your account and send a secure reset link to your email.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="7XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "#F8B500", mr: 1 }} />
                    <Typography sx={{ fontWeight: 600 }}>+254</Typography>
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
              {loading ? "Sending link..." : "Send Reset Link"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}