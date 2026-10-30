// src/components/Auth/LoginPage/LoginForm.jsx
import React from "react";
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
import { Link as RouterLink } from "react-router-dom";

import { useLoginForm } from "../../../components/hooks/auth/useLoginForm";

/* ---------------- Theme-Integrated Input Styles ---------------- */
const getPremiumInputStyles = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: `${theme.shape.borderRadius}px`,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontSize: "0.95rem",
    fontWeight: 500,
    "& fieldset": {
      borderColor: theme.palette.divider,
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.text.secondary,
    },
    "&.Mui-focused": {
      backgroundColor: theme.palette.background.paper,
      "& fieldset": {
        borderColor: theme.palette.secondary.main,
        borderWidth: "2px",
      },
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
    fontWeight: 600,
    fontSize: "0.9rem",
    "&.Mui-focused": {
      color: theme.palette.secondary.main,
    },
  },
  "& input::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
  "& .MuiFormHelperText-root": {
    color: theme.palette.error?.main || "#DC2626",
    fontWeight: 500,
  },
});

export default function LoginForm({ switchToSignup, onClose }) {
  const {
    formData,
    showPassword,
    loading,
    showPhoneError,
    phoneError,
    showPasswordError,
    passwordError,
    handleChange,
    handleBlur,
    togglePasswordVisibility,
    handleSubmit,
  } = useLoginForm(onClose);

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
        sx={(theme) => ({
          fontWeight: 800,
          color: theme.palette.text.primary,
          letterSpacing: "-0.02em",
          mb: 0.5,
          textAlign: "center",
        })}
      >
        Welcome Back
      </Typography>

      <Typography
        variant="body2"
        sx={(theme) => ({ color: theme.palette.text.secondary, mb: 2.5, textAlign: "center" })}
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
          sx={getPremiumInputStyles}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneOutlinedIcon
                  sx={(theme) => ({ color: theme.palette.text.secondary, mr: 0.5, fontSize: "1.1rem" })}
                />
                <Typography
                  sx={(theme) => ({ color: theme.palette.text.primary, fontWeight: 700, fontSize: "0.9rem" })}
                >
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
          sx={(theme) => ({
            ...getPremiumInputStyles(theme),
            "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon
                  sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: "1.1rem" })}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  onClick={togglePasswordVisibility}
                  edge="end"
                  size="small"
                  sx={(theme) => ({ color: theme.palette.text.secondary })}
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
          sx={(theme) => ({
            fontSize: "0.85rem",
            color: theme.palette.secondary.main,
            textDecoration: "none",
            fontWeight: 700,
            "&:hover": { textDecoration: "underline" },
          })}
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
          sx={(theme) => ({
            py: 1.4,
            borderRadius: "50px",
            fontWeight: 700,
            fontSize: "0.95rem",
            textTransform: "none",
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            boxShadow: `0 4px 14px ${theme.palette.secondary.main}59`,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              bgcolor: theme.palette.secondary.dark,
              boxShadow: `0 6px 18px ${theme.palette.secondary.main}73`,
            },
          })}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Divider sx={(theme) => ({ borderColor: theme.palette.divider, my: 0.5 })} />

        <Typography
          variant="body2"
          textAlign="center"
          sx={(theme) => ({ color: theme.palette.text.secondary })}
        >
          Don’t have an account?{" "}
          <MuiLink
            component="button"
            type="button"
            onClick={switchToSignup}
            sx={(theme) => ({
              fontWeight: 700,
              color: theme.palette.secondary.main,
              textDecoration: "none",
              ml: 0.5,
              "&:hover": { textDecoration: "underline" },
            })}
          >
            Sign Up
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  );
}