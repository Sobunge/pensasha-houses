// src/components/Auth/RegistrationPage/RegistrationForm.jsx
import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  MenuItem,
  Avatar,
  Divider,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import api from "../../../api/api";
import { useNotification } from "../../../components/NotificationProvider";

/* ---------------- Phone Helpers ---------------- */

// Convert to +254XXXXXXXXX
const normalizePhone = (phone) => {
  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    digits = "254" + digits.substring(1);
  }

  if (digits.startsWith("254")) return "+" + digits;

  return "+254" + digits; // fallback
};

const validatePhoneNumber = (value) => {
  if (!value) return "Phone number is required";

  const digits = value.replace(/\D/g, "");

  const valid = /^(7|1)\d{8}$/.test(digits); // user enters 7XXXXXXXX or 1XXXXXXXX

  if (!valid) return "Enter a valid phone number";

  return null;
};

/* ---------------- Password & Role ---------------- */

const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters";
  return null;
};

const validateRole = (value) => {
  if (!value) return "Role is required";
  return null;
};

/* ---------------- Registration Form ---------------- */

export default function RegistrationForm({ onSuccess, switchToLogin }) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [touched, setTouched] = useState({
    phoneNumber: false,
    password: false,
    confirmPassword: false,
    role: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { notify } = useNotification();

  /* ---------------- Validation ---------------- */

  const phoneError = validatePhoneNumber(formData.phoneNumber);
  const passwordError = validatePassword(formData.password);

  const confirmError =
    formData.confirmPassword &&
      formData.password !== formData.confirmPassword
      ? "Passwords do not match"
      : null;

  const roleError = validateRole(formData.role);

  const showPhoneError = touched.phoneNumber && Boolean(phoneError);
  const showPasswordError = touched.password && Boolean(passwordError);
  const showConfirmError = touched.confirmPassword && Boolean(confirmError);
  const showRoleError = touched.role && Boolean(roleError);

  /* ---------------- Handlers ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneError || passwordError || confirmError || roleError) {
      setTouched({
        phoneNumber: true,
        password: true,
        confirmPassword: true,
        role: true,
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        phoneNumber: normalizePhone(formData.phoneNumber),
        password: formData.password,
        role: formData.role,
      };

      await api.post("/auth/register", payload);

      notify("Registration successful!", "success", 3000);
      onSuccess?.();
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);

      notify(
        err.response?.data?.error || "Registration failed. Try again.",
        "error",
        3500
      );
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
        <PersonAddIcon />
      </Avatar>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
        Create Your Account
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", textAlign: "center", mb: 3 }}
      >
        Register using your phone number.
      </Typography>

      <Stack spacing={2} sx={{ width: "100%" }}>

        {/* Phone Number */}
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur("phoneNumber")}
          size="small"
          required
          placeholder="7XXXXXXXX"
          error={showPhoneError}
          helperText={showPhoneError ? phoneError : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography sx={{ fontWeight: 500 }}>
                  +254
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        
        {/* Password */}
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur("password")}
          size="small"
          required
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
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password */}
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirm ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur("confirmPassword")}
          size="small"
          required
          placeholder="Re-enter your password"
          error={showConfirmError}
          helperText={showConfirmError ? confirmError : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirm(!showConfirm)}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Role */}
        <TextField
          select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          onBlur={handleBlur("role")}
          size="small"
          required
          error={showRoleError}
          helperText={showRoleError ? roleError : ""}
        >
          <MenuItem value="" disabled>
            Select Role
          </MenuItem>
          <MenuItem value="TENANT">Tenant</MenuItem>
          <MenuItem value="LANDLORD">Landlord</MenuItem>
        </TextField>

        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          size="small"
          fullWidth
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} /> : <PersonAddIcon />
          }
          sx={{
            mt: 1,
            py: 1.2,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#f8b500", color: "#000" },
          }}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <MuiLink
            component="button"
            onClick={switchToLogin}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: 500,
              color: "primary.main",
              "&:hover": {
                textDecoration: "underline",
                color: "primary.dark",
              },
            }}
          >
            Sign In
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  );
}
