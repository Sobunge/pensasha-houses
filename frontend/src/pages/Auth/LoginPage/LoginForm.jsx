import { Link } from "react-router-dom";
import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function LoginForm() {
  return (
    <Box
      sx={{
        minHeight: "94vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f7f7f7",
        px: { xs: 2, sm: 3, md: 6 }, // responsive padding
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, sm: 4 }, // less padding on small devices
          maxWidth: { xs: 300, sm: 360, md: 400 }, // responsive width
          width: "100%",
          textAlign: "center",
          borderRadius: 4,
          minHeight: { xs: 340, sm: 400, md: 440 }, // smaller on phones
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: { xs: 8, sm: 10 }, // 🔥 pushes below navbar (adjust to match your navbar height)
          mb: { xs: 4, sm: 6 }, // 🔥 keeps space above footer
        }}
      >
        {/* Icon */}
        <Avatar
          sx={{
            bgcolor: "#f8b500",
            mx: "auto",
            mb: 2,
            width: { xs: 40, sm: 48 }, // smaller on phones
            height: { xs: 40, sm: 48 },
          }}
        >
          <LockOutlinedIcon fontSize="small" />
        </Avatar>

        {/* Heading */}
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 600,
            color: "#111111",
            mb: 3,
            fontSize: { xs: "1.25rem", sm: "1.5rem" }, // smaller text on phones
          }}
        >
          Sign In
        </Typography>

        {/* Email Field */}
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          variant="outlined"
          type="email"
        />

        {/* Password Field */}
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
        />

        {/* Login Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            mb: 2,
            fontWeight: "bold",
            textTransform: "none",
            py: { xs: 1, sm: 1.2 }, // smaller button height on phones
            fontSize: { xs: "0.9rem", sm: "1rem" },
            bgcolor: "#f8b500",
            color: "#111111",
            "&:hover": { bgcolor: "#ffc62c" },
          }}
        >
          Login
        </Button>

        {/* Extra Links */}
        <Typography
          variant="body2"
          sx={{
            color: "#2a2a2a",
            mt: 1,
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
          }}
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#c59000", cursor: "pointer", textDecoration: "none" }}
          >
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
