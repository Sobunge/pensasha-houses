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
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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
    onSuccess(); // Close modal on success
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 2,
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
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        Create Your Account
      </Typography>

      {/* Short intro text */}
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          textAlign: "center",
          mb: 2,
          maxWidth: 360,
        }}
      >
        Fill in your details below to join and get started.
      </Typography>

      {/* Fields */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        {/* Name group */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            size="small"
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            size="small"
            required
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
          helperText="e.g. +254 712 345 678"
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
          helperText="At least 8 characters"
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
        >
          <MenuItem value="tenant">Tenant</MenuItem>
          <MenuItem value="landlord">Landlord</MenuItem>
        </TextField>

        {/* Sign Up Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            py: 1.2,
            bgcolor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            "&:hover": { bgcolor: "#e0a400" },
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
          <span
            style={{
              color: "#f8b500",
              cursor: "pointer",
              fontWeight: 600,
            }}
            onClick={switchToLogin}
          >
            Sign In
          </span>
        </Typography>
      </Stack>
    </Box>
  );
}

export default RegistrationForm;
