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
  CircularProgress,
  IconButton,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useNotification } from "../../../components/NotificationProvider";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../../../api/api";

/* ---------------- Phone Helpers ---------------- */
const normalizePhone = (value) => {
  if (!value) return "";
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = digits.substring(1);
  return "+254" + digits;
};

const validatePhoneNumber = (value) => {
  if (!value) return "Phone number is required";
  const digits = value.replace(/\D/g, "");
  if (!/^(7|1)\d{8}$/.test(digits)) return "Enter a valid phone number";
  return null;
};

const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 5) return "Password must be at least 5 characters";
  return null;
};

/* ---------------- Component ---------------- */
export default function LoginForm({ switchToSignup, onClose }) {
  const [formData, setFormData] = useState({ phoneNumber: "", password: "" });
  const [touched, setTouched] = useState({ phoneNumber: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { notify } = useNotification();
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const phoneError = validatePhoneNumber(formData.phoneNumber);
  const passwordError = validatePassword(formData.password);

  const showPhoneError = touched.phoneNumber && Boolean(phoneError);
  const showPasswordError = touched.password && Boolean(passwordError);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneError || passwordError) {
      setTouched({ phoneNumber: true, password: true });
      return;
    }

    setLoading(true);
    try {
      const normalizedPhone = normalizePhone(formData.phoneNumber);

      const { data } = await api.post("/auth/login", {
        phoneNumber: normalizedPhone,
        password: formData.password,
      });

      const { accessToken, principal } = data;

      if (!accessToken || !principal) {
        throw new Error("Invalid login response");
      }

      // ✅ Set token globally for all API calls
      setAccessToken(accessToken);

      // Normalize roles: ensure it's always an array
      const roles = Array.isArray(principal.roles)
        ? principal.roles
        : [principal.role];

      const user = {
        id: principal.id,
        phoneNumber: principal.phoneNumber,
        roles,
        defaultRoute: "/dashboard", // unified multi-role dashboard
        accessToken,
      };

      // Save user in session & AuthContext
      sessionStorage.setItem("user", JSON.stringify(user));
      loginAs(user);

      notify("Login successful!", "success");

      if (onClose) onClose();

      // Navigate to unified dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      const message =
        err?.message ||
        err?.response?.data?.message ||
        "Unable to login. Please try again.";

      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
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
        Login with your phone number
      </Typography>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur("phoneNumber")}
          required
          size="small"
          placeholder="7XXXXXXXX"
          error={showPhoneError}
          helperText={showPhoneError ? phoneError : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography sx={{ fontWeight: 500 }}>+254</Typography>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur("password")}
          required
          size="small"
          placeholder="Enter your password"
          error={showPasswordError}
          helperText={showPasswordError ? passwordError : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Box sx={{ width: "100%", textAlign: "right", mt: 1 }}>
        <MuiLink href="/forgot-password" sx={{ fontSize: "0.85rem" }}>
          Forgot password?
        </MuiLink>
      </Box>

      <Stack spacing={1.5} sx={{ width: "100%", mt: 2 }}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="small"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} /> : <LockOutlinedIcon />
          }
          sx={{
            py: 1.2,
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" textAlign="center">
          Don’t have an account?{" "}
          <MuiLink
            component="button"
            type="button"
            onClick={switchToSignup}
            sx={{ fontWeight: 500 }}
          >
            Sign Up
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  );
}