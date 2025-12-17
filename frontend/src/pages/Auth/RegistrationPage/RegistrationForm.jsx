// src/components/Auth/RegistrationPage/RegistrationForm.jsx
import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  MenuItem,
  Avatar,
  Divider,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LockIcon from "@mui/icons-material/Lock";
import api from "../../../api/api";
import { useNotification } from "../../../components/NotificationProvider";

/* ---------------- Validation ---------------- */

const validateIdNumber = (value) => {
  if (!value) return "ID Number is required";
  if (value.length < 7 || value.length > 8) {
    return "ID Number must be 7 or 8 digits";
  }
  return null;
};

const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 5) {
    return "Password must be at least 5 characters";
  }
  return null;
};

const validateRole = (value) => {
  if (!value) return "Role is required";
  return null;
};

export default function RegistrationForm({ onSuccess, switchToLogin }) {
  const [formData, setFormData] = useState({
    idNumber: "",
    password: "",
    role: "",
  });

  const [touched, setTouched] = useState({
    idNumber: false,
    password: false,
    role: false,
  });

  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  /* ---------------- Derived validation ---------------- */

  const idError = validateIdNumber(formData.idNumber);
  const passwordError = validatePassword(formData.password);
  const roleError = validateRole(formData.role);

  const showIdError = touched.idNumber && Boolean(idError);
  const showPasswordError = touched.password && Boolean(passwordError);
  const showRoleError = touched.role && Boolean(roleError);

  /* ---------------- Handlers ---------------- */

  const handleIdChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({
      ...prev,
      idNumber: digitsOnly.slice(0, 8),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // final guard
    if (idError || passwordError || roleError) {
      setTouched({
        idNumber: true,
        password: true,
        role: true,
      });
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", formData);
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
        Enter your ID, choose a password, and select your role.
      </Typography>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <TextField
          fullWidth
          label="ID Number"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleIdChange}
          onBlur={handleBlur("idNumber")}
          size="small"
          required
          placeholder="Enter your ID Number"
          error={showIdError}
          helperText={showIdError ? idError : ""}
          slotProps={{
            input: {
              inputMode: "numeric",
              pattern: "[0-9]*",
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeOutlinedIcon />
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
          onBlur={handleBlur("password")}
          size="small"
          required
          placeholder="Enter your password"
          error={showPasswordError}
          helperText={showPasswordError ? passwordError : ""}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            },
          }}
        />

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
            bgcolor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#c59000" },
          }}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <Button onClick={switchToLogin} sx={{ p: 0, textTransform: "none" }}>
            Sign In
          </Button>
        </Typography>
      </Stack>
    </Box>
  );
}
