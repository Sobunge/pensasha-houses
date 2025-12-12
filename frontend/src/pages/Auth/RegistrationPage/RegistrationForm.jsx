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
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LockIcon from "@mui/icons-material/Lock";
import api from "../../../api/api"; // Axios instance with interceptors
import { useNotification } from "../../../components/NotificationProvider";

function RegistrationForm({ onSuccess, switchToLogin }) {
  const [formData, setFormData] = useState({
    idNumber: "",
    password: "",
    role: "",
  });
  const { notify } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", formData);

      notify("Registration successful! Please login.", "success", 3000);
      onSuccess?.(); // switch to login page/modal
    } catch (err) {
      console.error(err);
      notify(
        err.response?.data?.error || "Registration failed. Try again.",
        "error",
        3500
      );
    }
  };

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
          type="text"
          value={formData.idNumber}
          onChange={handleChange}
          size="small"
          required
          placeholder="Enter your ID Number"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeOutlinedIcon color="action" />
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
          size="small"
          required
          placeholder="Enter a strong password"
          helperText="At least 8 characters"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
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
          size="small"
          required
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonAddIcon color="action" />
                </InputAdornment>
              ),
            },
          }}

        >
          <MenuItem value="" disabled>Select Role</MenuItem>
          <MenuItem value="tenant">Tenant</MenuItem>
          <MenuItem value="landlord">Landlord</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          size="small"
          fullWidth
          startIcon={<PersonAddIcon />}
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
          Register
        </Button>

        <Divider sx={{ my: 1 }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 1, color: "text.secondary" }}
        >
          Already have an account?{" "}
          <Button onClick={switchToLogin} sx={{ textTransform: "none", p: 0 }}>
            Sign In
          </Button>
        </Typography>
      </Stack>
    </Box>
  );
}

export default RegistrationForm;
