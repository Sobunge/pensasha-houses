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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LockIcon from "@mui/icons-material/Lock";
import { useNotification } from "../../../components/NotificationProvider";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../../../api/api";

/* ---------------- Validation ---------------- */
const validateIdNumber = (value) => {
  if (!value) return null;
  if (value.length < 7 || value.length > 8) return "ID Number must be 7 or 8 digits";
  return null;
};

const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 5) return "Password must be at least 5 characters";
  return null;
};

export default function LoginForm({ switchToSignup, onClose }) {
  const [formData, setFormData] = useState({ idNumber: "", password: "" });
  const [touched, setTouched] = useState({ idNumber: false, password: false });
  const [loading, setLoading] = useState(false);

  const { notify } = useNotification();
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const idError = validateIdNumber(formData.idNumber);
  const passwordError = validatePassword(formData.password);

  const showIdError = touched.idNumber && Boolean(idError);
  const showPasswordError = touched.password && Boolean(passwordError);

  /* ---------------- Handlers ---------------- */
  const handleIdChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, idNumber: digitsOnly.slice(0, 8) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (idError || passwordError) {
      setTouched({ idNumber: true, password: true });
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      const { accessToken, principal } = response.data;

      // Store token in sessionStorage + memory
      setAccessToken(accessToken);

      const user = {
        id: principal.id,
        idNumber: principal.username,
        role: principal.role,
        defaultRoute: principal.defaultRoute,
      };

      // AuthContext now handles sessionStorage internally
      loginAs(user);

      notify("Login successful!", "success", 3000);

      if (onClose) onClose();
      navigate(principal.defaultRoute || "/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      notify("Invalid credentials", "error", 3500);
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
        Please log in to continue
      </Typography>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <TextField
          fullWidth
          label="ID Number"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleIdChange}
          onBlur={handleBlur("idNumber")}
          required
          size="small"
          placeholder="Enter your ID Number"
          error={showIdError}
          helperText={showIdError ? idError : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeOutlinedIcon color="action" />
              </InputAdornment>
            ),
            inputMode: "numeric",
            pattern: "[0-9]*",
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
          required
          size="small"
          placeholder="Enter your password"
          error={showPasswordError}
          helperText={showPasswordError ? passwordError : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
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
          size="small"
          startIcon={loading ? <CircularProgress size={20} /> : <LockOutlinedIcon />}
          sx={{
            mt: 1,
            py: 1.2,
            bgcolor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#c59000" },
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
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
