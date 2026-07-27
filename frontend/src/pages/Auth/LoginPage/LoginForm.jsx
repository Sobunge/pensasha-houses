// src/components/Auth/LoginPage/LoginForm.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Stack,
  Link as MuiLink,
  InputAdornment,
  CircularProgress,
  IconButton,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useNotification } from "../../../components/NotificationProvider";
import { useAuth } from "../AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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

/* ---------------- Premium High-Contrast Input Styles ---------------- */
const premiumInputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#FAFAFA",
    color: "#0F172A",
    fontSize: "0.95rem",
    fontWeight: 500,
    "& fieldset": {
      borderColor: "#CBD5E1", // Visible, high-contrast border
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
    "&.Mui-focused": {
      color: "#D4AF37",
    },
  },
  "& input::placeholder": {
    color: "#94A3B8",
    opacity: 1,
  },
  "& .MuiFormHelperText-root": {
    color: "#DC2626",
    fontWeight: 500,
  },
};

export default function LoginForm({ switchToSignup, onClose }) {
  const [formData, setFormData] = useState({ phoneNumber: "", password: "" });
  const [touched, setTouched] = useState({ phoneNumber: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { notify } = useNotification();
  const { loginAs, redirectAfterAuth, setRedirectAfterAuth } = useAuth();
  const navigate = useNavigate();

  const phoneError = validatePhoneNumber(formData.phoneNumber);
  const passwordError = validatePassword(formData.password);

  const showPhoneError = touched.phoneNumber && Boolean(phoneError);
  const showPasswordError = touched.password && Boolean(passwordError);

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

      setAccessToken(accessToken);

      const roles = Array.isArray(principal.roles) ? principal.roles : [principal.role];
      const permissions = Array.isArray(principal.permissions) ? principal.permissions : [];

      const user = {
        id: principal.id,
        name: principal.firstname,
        roles,
        permissions,
        defaultRoute: "/dashboard",
        accessToken,
      };

      sessionStorage.setItem("user", JSON.stringify(user));
      loginAs(user);
      notify("Login successful!", "success");

      if (onClose) onClose();
      window.scrollTo(0, 0);

      if (redirectAfterAuth && redirectAfterAuth !== "rent-request") {
        navigate(redirectAfterAuth, { replace: true });
        setRedirectAfterAuth(null);
      } else if (redirectAfterAuth !== "rent-request") {
        navigate("/dashboard", { replace: true });
      }

    } catch (err) {
      console.error("Login error:", err);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to login. Please try again.";
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          color: "#0F172A",
          letterSpacing: "-0.02em",
          mb: 0.5,
          textAlign: "center",
        }}
      >
        Welcome Back
      </Typography>

      <Typography 
        variant="body2" 
        sx={{ color: "#64748B", mb: 2.5, textAlign: "center" }}
      >
        Login with your phone number
      </Typography>

      {/* Inputs */}
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
          sx={premiumInputStyles}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneOutlinedIcon sx={{ color: "#475569", mr: 0.5, fontSize: "1.1rem" }} />
                <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.9rem" }}>
                  +254
                </Typography>
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
          sx={{
            ...premiumInputStyles,
            "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon sx={{ color: "#475569", fontSize: "1.1rem" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                  sx={{ color: "#64748B" }}
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
      </Stack>

      {/* Forgot Password */}
      <Box sx={{ width: "100%", textAlign: "right", mt: 1 }}>
        <MuiLink
          component={RouterLink}
          to="/forgot-password"
          onClick={onClose}
          sx={{
            fontSize: "0.85rem",
            color: "#D4AF37",
            textDecoration: "none",
            fontWeight: 700,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Forgot password?
        </MuiLink>
      </Box>

      {/* Submit Button & Switch Link */}
      <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
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
              <LockOutlinedIcon sx={{ fontSize: "1.1rem !important" }} />
            )
          }
          sx={{
            py: 1.4,
            borderRadius: "50px",
            fontWeight: 700,
            fontSize: "0.95rem",
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
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Divider sx={{ borderColor: "#F1F5F9", my: 0.5 }} />

        <Typography variant="body2" textAlign="center" sx={{ color: "#64748B" }}>
          Don’t have an account?{" "}
          <MuiLink
            component="button"
            type="button"
            onClick={switchToSignup}
            sx={{
              fontWeight: 700,
              color: "#D4AF37",
              textDecoration: "none",
              ml: 0.5,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign Up
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  );
}