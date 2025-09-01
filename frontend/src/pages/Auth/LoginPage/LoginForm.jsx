import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Divider,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function LoginForm({ onSuccess, switchToSignup }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    onSuccess?.();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: { xs: 3, sm: 4 },
      }}
    >
      {/* Icon */}
      <Avatar sx={{ bgcolor: "#f8b500", width: 56, height: 56, mb: 1 }}>
        <LockOutlinedIcon />
      </Avatar>

      {/* Heading */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Welcome Back
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        Please log in to continue
      </Typography>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
      </Stack>

      {/* Forgot password */}
      <Box sx={{ width: "100%", textAlign: "right", mt: 1 }}>
        <MuiLink href="/forgot-password" underline="hover" fontSize="0.85rem">
          Forgot password?
        </MuiLink>
      </Box>

      <Stack spacing={1.5} sx={{ width: "100%", mt: 2 }}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            "&:hover": { bgcolor: "#ffc62c" },
          }}
        >
          Login
        </Button>

        {/* Divider */}
        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" textAlign="center">
          Don’t have an account?{" "}
          <MuiLink
            component="button"
            onClick={switchToSignup}
            sx={{ color: "#f8b500", fontWeight: 600 }}
          >
            Sign Up
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  );
}
