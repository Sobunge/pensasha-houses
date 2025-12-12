// src/components/Auth/LoginPage/LoginForm.jsx
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
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LockIcon from "@mui/icons-material/Lock";
import { useNotification } from "../../../components/NotificationProvider";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../../../api/api";

export default function LoginForm({ switchToSignup, onClose }) {
  const [formData, setFormData] = useState({ idNumber: "", password: "" });
  const { notify } = useNotification();
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to backend
      const response = await api.post("/auth/login", {
        idNumber: formData.idNumber,
        password: formData.password,
      });

      const { accessToken, roles, username } = response.data;

      // Store access token in memory
      setAccessToken(accessToken);

      // convert role to lowercase
      const normalizedRole = roles[0].toLowerCase();
      // Save user info in context and optionally localStorage
      const user = { idNumber: username, role: normalizedRole };
      loginAs(user);
      localStorage.setItem("user", JSON.stringify(user));

      notify("Login successful!", "success", 3000);

      // Redirect based on role
      const roleRedirects = {
        tenant: "/tenant",
        landlord: "/landlord",
        caretaker: "/caretaker",
        admin: "/admin",
      };

      if (onClose) onClose();
      setTimeout(() => {
        navigate(roleRedirects[user.role] || "/");
      }, 200);
    } catch (err) {
      console.error(err);
      notify(
        err.response?.data?.error || "Invalid credentials or server error",
        "error",
        3500
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Avatar sx={{ bgcolor: "#f8b500", width: 56, height: 56, mb: 1 }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Welcome Back
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Please log in to continue
      </Typography>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <TextField
          fullWidth
          label="ID Number"
          name="idNumber"
          type="text"
          value={formData.idNumber}
          onChange={handleChange}
          required
          placeholder="Enter your ID Number"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeOutlinedIcon color="action" />
                </InputAdornment>
              ),
            },
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
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <Box sx={{ width: "100%", textAlign: "right", mt: 1 }}>
        <MuiLink href="/forgot-password" fontSize="0.85rem">
          Forgot password?
        </MuiLink>
      </Box>

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
