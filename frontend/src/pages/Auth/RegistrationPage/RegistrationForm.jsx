// src/components/Auth/RegistrationPage/RegistrationForm.jsx
import React from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  MenuItem,
  Divider,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useRegistrationForm } from "../../../components/hooks/useRegistrationForm";

/* ---------------- Premium High-Contrast Input Styles ---------------- */
const premiumInputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#FAFAFA",
    color: "#0F172A",
    fontSize: "0.95rem",
    fontWeight: 500,
    "& fieldset": {
      borderColor: "#CBD5E1",
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

export default function RegistrationForm({ onSuccess, switchToLogin }) {
  const {
    formData,
    touched,
    errors,
    showPassword,
    loading,
    handleChange,
    handleBlur,
    togglePasswordVisibility,
    handleSubmit,
  } = useRegistrationForm(onSuccess);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
        Create Your Account
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "#64748B", mb: 2.5, textAlign: "center" }}
      >
        Sign up to start searching or listing properties
      </Typography>

      <Stack spacing={2} sx={{ width: "100%" }}>
        {/* Name Row */}
        <Box sx={{ display: "flex", gap: 1.5, width: "100%" }}>
          <TextField
            fullWidth
            label="First Name"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur("firstName")}
            size="small"
            required
            error={touched.firstName && !!errors.firstName}
            helperText={touched.firstName && errors.firstName}
            sx={premiumInputStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#475569", fontSize: "1.1rem" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Last Name"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur("lastName")}
            size="small"
            required
            error={touched.lastName && !!errors.lastName}
            helperText={touched.lastName && errors.lastName}
            sx={premiumInputStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#475569", fontSize: "1.1rem" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Phone */}
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
          error={touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
          sx={premiumInputStyles}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon
                  sx={{ color: "#475569", mr: 0.5, fontSize: "1.1rem" }}
                />
                <Typography
                  sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.9rem" }}
                >
                  +254
                </Typography>
              </InputAdornment>
            ),
          }}
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Email Address"
          placeholder="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur("email")}
          size="small"
          required
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={premiumInputStyles}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#475569", fontSize: "1.1rem" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Password */}
        <TextField
          fullWidth
          label="Password"
          placeholder="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur("password")}
          size="small"
          required
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          sx={{
            ...premiumInputStyles,
            "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#475569", fontSize: "1.1rem" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  onClick={togglePasswordVisibility}
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

        {/* Select Role */}
        <TextField
          select
          fullWidth
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          onBlur={handleBlur("role")}
          size="small"
          required
          error={touched.role && !!errors.role}
          helperText={touched.role && errors.role}
          sx={premiumInputStyles}
          InputLabelProps={{ shrink: true }}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              if (!selected)
                return (
                  <Typography sx={{ color: "#94A3B8", fontSize: "0.9rem" }}>
                    Select Role
                  </Typography>
                );
              return selected.charAt(0) + selected.slice(1).toLowerCase();
            },
          }}
        >
          <MenuItem value="" disabled>
            Select Role
          </MenuItem>
          <MenuItem value="TENANT">Tenant</MenuItem>
          <MenuItem value="LANDLORD">Landlord</MenuItem>
        </TextField>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <PersonAddIcon sx={{ fontSize: "1.1rem !important" }} />
            )
          }
          sx={{
            mt: 1,
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
          {loading ? "Processing..." : "Register"}
        </Button>

        <Divider sx={{ borderColor: "#F1F5F9", my: 0.5 }} />

        {/* Switch Link */}
        <Typography variant="body2" textAlign="center" sx={{ color: "#64748B" }}>
          Already have an account?{" "}
          <MuiLink
            component="button"
            type="button"
            onClick={switchToLogin}
            sx={{
              fontWeight: 700,
              color: "#D4AF37",
              textDecoration: "none",
              ml: 0.5,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign In
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  );
}