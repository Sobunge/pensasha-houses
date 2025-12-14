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
import api from "../../../api/api";
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
      await api.post("/auth/register", formData);

      onSuccess?.();
    } catch (err) {
      console.error(err);
      notify(
        err.response?.data?.error ||
          "Registration failed. Try again.",
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
          value={formData.idNumber}
          onChange={handleChange}
          size="small"
          required
          placeholder="Enter your Id Number"
          slotProps={{
            input: {
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
          size="small"
          required
          placeholder="Enter your password"
          helperText="At least 8 characters"
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
          size="small"
          required
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
          fullWidth
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

export default RegistrationForm;
