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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

export default function LoginForm({ onSuccess, switchToSignup }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
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
        p: { xs: 3, sm: 4 },
      }}
    >
      {/* Icon */}
      <Avatar sx={{ bgcolor: "#f8b500", width: 56, height: 56, mb: 1 }}>
        <LockOutlinedIcon />
      </Avatar>

      {/* Heading */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Welcome Back
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Please log in to continue
      </Typography>

      {/* Inputs */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
          placeholder="Enter your email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              transition: "0.3s",
              "&:hover fieldset": {
                borderColor: "#f8b500",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#f8b500",
                borderWidth: 2,
              },
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
          autoComplete="current-password"
          required
          placeholder="Enter your password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              transition: "0.3s",
              "&:hover fieldset": {
                borderColor: "#f8b500",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#f8b500",
                borderWidth: 2,
              },
            },
          }}
        />
      </Stack>

      {/* Forgot password */}
      <Box sx={{ width: "100%", textAlign: "right", mt: 1 }}>
        <MuiLink
          href="/forgot-password"
          fontSize="0.85rem"
          sx={{
            color: "#1976d2", // base blue
            fontWeight: 500,
            textDecoration: "none", // remove default underline
            position: "relative",
            transition: "color 0.3s ease, transform 0.2s ease",
            "&:after": {
              content: '""',
              position: "absolute",
              left: 0,
              bottom: -2,
              width: "100%",
              height: "2px",
              backgroundColor: "#1976d2",
              transform: "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.3s ease",
            },
            "&:hover": {
              color: "#115293", // darker blue
              transform: "scale(1.02)",
            },
            "&:hover:after": {
              transform: "scaleX(1)", // animate underline on hover
              backgroundColor: "#115293",
            },
          }}
        >
          Forgot password?
        </MuiLink>
      </Box>

      {/* Actions */}
      <Stack spacing={1.5} sx={{ width: "100%", mt: 2 }}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          startIcon={<LockOutlinedIcon />}
          sx={{
            bgcolor: "#f8b500", // primary yellow
            color: "#111111",
            fontWeight: 600,
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#c59000", // stronger hover
              transform: "scale(1.03)",
              boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            },
          }}
        >
          Login
        </Button>

        {/* Divider */}
        <Divider sx={{ my: 1 }} />

        {/* Switch to Signup */}
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: "text.secondary" }}
        >
          Don’t have an account?{" "}
          <MuiLink
            component="button"
            onClick={switchToSignup}
            sx={{
              color: "#115293",
              fontWeight: 600,
              textDecoration: "none", // remove default underline
              position: "relative",
              transition: "color 0.3s ease, transform 0.2s ease",
              "&:after": {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: -2,
                width: "100%",
                height: "2px",
                backgroundColor: "#115293",
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.3s ease",
              },
              "&:hover": {
                color: "#f8b500",
                transform: "scale(1.03)",
              },
              "&:hover:after": {
                transform: "scaleX(1)", // underline only on hover
                backgroundColor: "#f8b500",
              },
            }}
          >
            Sign Up
          </MuiLink>
        </Typography>

      </Stack>
    </Box>
  );
}
