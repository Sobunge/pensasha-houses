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
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNotification } from "../../../components/NotificationProvider";

// ⬅️ Import hardcoded users
import { users } from "../../../config/Users";

export default function LoginForm({ onSuccess, switchToSignup }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { notify } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔎 check user exists
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === formData.email.toLowerCase() &&
        u.password === formData.password // you can skip this if no password needed
    );

    if (user) {
      console.log("Login Success:", user);
      onSuccess?.(user.email); // pass email up to AuthModal
    } else {
      notify("Invalid email or password!", "error");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Please log in to continue
      </Typography>

      {/* Inputs */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* Forgot Password */}
      <Box sx={{ width: "100%", textAlign: "right", mt: 1 }}>
        <MuiLink href="/forgot-password" fontSize="0.85rem">
          Forgot password?
        </MuiLink>
      </Box>

      {/* Actions */}
      <Stack spacing={1.5} sx={{ width: "100%", mt: 2 }}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          startIcon={<LockOutlinedIcon />}
          sx={{
            bgcolor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#c59000" },
          }}
        >
          Login
        </Button>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" textAlign="center">
          Don’t have an account?{" "}
          <MuiLink component="button" onClick={switchToSignup}>
            Sign Up
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  );
}
