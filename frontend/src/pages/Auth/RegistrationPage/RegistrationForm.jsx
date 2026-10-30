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

import { useRegistrationForm } from "../../../components/hooks/auth/useRegistrationForm";

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
        sx={(theme) => ({
          fontWeight: 800,
          color: theme.palette.text.primary,
          letterSpacing: "-0.02em",
          mb: 0.5,
          textAlign: "center",
        })}
      >
        Create Your Account
      </Typography>

      <Typography
        variant="body2"
        sx={(theme) => ({ color: theme.palette.text.secondary, mb: 2.5, textAlign: "center" })}
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
            sx={getPremiumInputStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: "1.1rem" })} />
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
            sx={getPremiumInputStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: "1.1rem" })} />
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
          sx={getPremiumInputStyles}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon
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
          sx={getPremiumInputStyles}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: "1.1rem" })} />
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
          sx={(theme) => ({
            ...getPremiumInputStyles(theme),
            "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: "1.1rem" })} />
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
          sx={getPremiumInputStyles}
          InputLabelProps={{ shrink: true }}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              if (!selected)
                return (
                  <Typography sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: "0.9rem" })}>
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
          sx={(theme) => ({
            mt: 1,
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
          {loading ? "Processing..." : "Register"}
        </Button>

        <Divider sx={(theme) => ({ borderColor: theme.palette.divider, my: 0.5 })} />

        {/* Switch Link */}
        <Typography variant="body2" textAlign="center" sx={(theme) => ({ color: theme.palette.text.secondary })}>
          Already have an account?{" "}
          <MuiLink
            component="button"
            type="button"
            onClick={switchToLogin}
            sx={(theme) => ({
              fontWeight: 700,
              color: theme.palette.secondary.main,
              textDecoration: "none",
              ml: 0.5,
              "&:hover": { textDecoration: "underline" },
            })}
          >
            Sign In
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  );
}