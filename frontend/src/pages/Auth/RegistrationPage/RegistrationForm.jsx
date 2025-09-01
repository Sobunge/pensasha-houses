import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  MenuItem,
  Stack,
  Divider,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Link } from "react-router-dom";

export default function RegistrationForm() {
  const [role, setRole] = React.useState("");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: "69px",
        bgcolor: "#f7f7f7", // light background
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          maxWidth: { xs: 320, sm: 400 },
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
          my: "20px",
          bgcolor: "#f7f7f7",
        }}
      >
        {/* Icon + Heading */}
        <Avatar
          sx={{
            bgcolor: "#f8b500",
            width: 48,
            height: 48,
            mx: "auto",
            mb: 1.5,
          }}
        >
          <PersonAddAltIcon fontSize="small" />
        </Avatar>
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontWeight: 600, color: "#111111", mb: 2 }}
        >
          Create Account
        </Typography>

        {/* Form Fields */}
        <Stack spacing={1.5}>
          {/* Names */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField fullWidth label="First Name" size="small" />
            <TextField fullWidth label="Second Name" size="small" />
            <TextField fullWidth label="Third Name" size="small" />
          </Stack>

          <TextField
            fullWidth
            label="ID Number"
            type="number"
            size="small"
            helperText="National ID or passport"
          />
          <TextField
            fullWidth
            label="Phone Number"
            type="tel"
            size="small"
            helperText="+254 712 345 678"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            size="small"
            helperText="Minimum 8 characters"
          />

          <Button variant="outlined" component="label" fullWidth size="small">
            Upload Profile Picture
            <input type="file" hidden accept="image/*" />
          </Button>

          <TextField
            select
            fullWidth
            label="Role"
            size="small"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="tenant">Tenant</MenuItem>
            <MenuItem value="landlord">Landlord</MenuItem>
          </TextField>
        </Stack>

        {/* Submit */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2.5,
            mb: 1,
            fontWeight: "bold",
            textTransform: "none",
            py: 1,
            bgcolor: "#f8b500",
            color: "#111111",
            "&:hover": { bgcolor: "#ffc62c" },
          }}
        >
          Register
        </Button>

        {/* Divider + Login */}
        <Divider sx={{ my: 1 }}>or</Divider>
        <Typography variant="body2" sx={{ color: "#2a2a2a" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#c59000",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
