import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  MenuItem,
  Avatar,
  Link as MuiLink,
  Divider,
  InputAdornment,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";

function RegistrationForm({ onSuccess, switchToLogin }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registration Data:", formData);
    onSuccess?.();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

      }}
    >
      {/* Icon */}
      <Avatar sx={{ bgcolor: "#f8b500", width: 56, height: 56, mb: 1 }}>
        <PersonAddIcon />
      </Avatar>

      {/* Heading */}
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
        Create Your Account
      </Typography>

      {/* Intro */}
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          textAlign: "center",
          mb: 3,
          maxWidth: 360,
        }}
      >
        Fill in your details below to join and get started.
      </Typography>

      {/* Form Fields */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        {/* Name Group */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            size="small"
            required
            placeholder="John"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            size="small"
            required
            placeholder="Doe"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          size="small"
          required
          placeholder="+254 712 345 678"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          size="small"
          required
          placeholder="Enter a strong password"
          helperText="At least 8 characters"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          size="small"
          required
          placeholder="Select Role"
        >
          <MenuItem value="tenant">Tenant</MenuItem>
          <MenuItem value="landlord">Landlord</MenuItem>
        </TextField>

        {/* Sign Up Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          startIcon={<PersonAddIcon />}
          sx={{
            mt: 1,
            py: 1.2,
            bgcolor: "#f8b500",
            color: "#111111",
            fontWeight: 600,
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#c59000",
              transform: "scale(1.03)",
              boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            },
          }}
        >
          Sign Up
        </Button>

        {/* Divider */}
        <Divider sx={{ my: 1 }} />

        {/* Switch to Login */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 1, color: "text.secondary" }}
        >
          Already have an account?{" "}
          <MuiLink
            component="button"
            onClick={switchToLogin}
            sx={{
              color: "#115293",
              fontWeight: 600,
              textDecoration: "none",
              position: "relative",
              transition: "color 0.3s ease, transform 0.2s ease",
              "&:hover": {
                color: "#ffc62c",
                transform: "scale(1.05)",
                textShadow: "0 0 6px rgba(248, 181, 0, 0.6)",
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

export default RegistrationForm;
