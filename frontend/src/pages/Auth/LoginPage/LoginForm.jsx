import { Link } from "react-router-dom";
import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function LoginForm({ onSuccess }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 2,
      }}
    >
      {/* Icon */}
      <Avatar sx={{ bgcolor: "#f8b500", width: 56, height: 56 }}>
        <LockOutlinedIcon />
      </Avatar>

      {/* Heading */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Welcome Back
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        Please login to continue
      </Typography>

      {/* Email */}
      <TextField
        fullWidth
        label="Email Address"
        type="email"
        variant="outlined"
      />

      {/* Password */}
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
      />

      {/* Forgot password */}
      <Box sx={{ width: "100%", textAlign: "right" }}>
        <Link to="/forgot-password" style={{ fontSize: "0.85rem" }}>
          Forgot password?
        </Link>
      </Box>

      {/* Login Button */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{
          mt: 1,
          mb: 2,
          bgcolor: "#f8b500",
          color: "#111",
          fontWeight: 600,
          "&:hover": { bgcolor: "#ffc62c" },
        }}
        onClick={onSuccess}
      >
        Login
      </Button>

      <Divider sx={{ width: "100%", my: 1 }}>or</Divider>

      <Typography variant="body2">
        Don’t have an account?{" "}
        <Link to="/register" style={{ color: "#c59000", fontWeight: 600 }}>
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
}
