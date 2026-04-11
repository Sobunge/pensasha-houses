import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  MenuItem,
  Avatar,
  Divider,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";

// Icons
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import api, { setAccessToken } from "../../../api/api";
import { useNotification } from "../../../components/NotificationProvider";
import { useAuth } from "../AuthContext";

/* ---------------- Helpers ---------------- */
const normalizePhone = (phone) => {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "254" + digits.substring(1);
  return digits.startsWith("254") ? "+" + digits : "+254" + digits;
};

const validateRequired = (value, fieldName) => {
  if (!value || !value.trim()) return `${fieldName} is required`;
  return null;
};

const validatePhoneNumber = (value) => {
  if (!value) return "Phone number is required";
  const digits = value.replace(/\D/g, "");
  if (!/^(7|1)\d{8}$/.test(digits)) return "Enter a valid phone number";
  return null;
};

const validateEmail = (value) => {
  if (!value) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Enter a valid email address";
  return null;
};

const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters";
  return null;
};

/* ---------------- Registration Form ---------------- */
export default function RegistrationForm({ onSuccess, switchToLogin }) {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { loginAs } = useAuth(); // Destructure the correct function from your context

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- Validation ---------------- */
  const errors = {
    firstName: validateRequired(formData.firstName, "First name"),
    lastName: validateRequired(formData.lastName, "Last name"),
    phoneNumber: validatePhoneNumber(formData.phoneNumber),
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
    role: validateRequired(formData.role, "Role"),
  };

  const hasErrors = Object.values(errors).some((err) => err !== null);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasErrors) {
      const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      setTouched(allTouched);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: normalizePhone(formData.phoneNumber),
        email: formData.email,
        password: formData.password,
        roles: [formData.role],
      };

      // 1. Register through API
      const response = await api.post("/auth/register", payload);
      
      // 2. Extract session data
      const { accessToken, principal } = response.data;

      // 3. Update API header state (api.js)
      setAccessToken(accessToken); 
      
      // 4. Update Global Auth Context
      // loginAs sets the user state, roles, and activeRole in sessionStorage
      if (loginAs) {
        loginAs(principal); 
      }

      notify("Account created successfully! Welcome.", "success", 3000);
      
      onSuccess?.();
      
      // 5. Navigate to dashboard 
      // Now ProtectedRoute will see user is authenticated
      navigate("/dashboard");
      
    } catch (err) {
      notify(err.message || "Registration failed.", "error", 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Avatar sx={{ bgcolor: "#f8b500", width: 56, height: 56, mb: 1 }}>
        <PersonAddIcon sx={{ color: "#000" }} />
      </Avatar>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
        Create Your Account
      </Typography>

      <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
        <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur("firstName")}
            size="small"
            required
            error={touched.firstName && !!errors.firstName}
            helperText={touched.firstName && errors.firstName}
            InputProps={{
              startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>,
            }}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur("lastName")}
            size="small"
            required
            error={touched.lastName && !!errors.lastName}
            helperText={touched.lastName && errors.lastName}
            InputProps={{
              startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>,
            }}
          />
        </Box>

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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography sx={{ fontWeight: 500 }}>+254</Typography>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur("email")}
          size="small"
          required
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment>,
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
          size="small"
          required
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                  {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                </IconButton>
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
          onBlur={handleBlur("role")}
          size="small"
          required
          error={touched.role && !!errors.role}
          helperText={touched.role && errors.role}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              if (!selected) return <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>Select Role</Typography>;
              return selected.charAt(0) + selected.slice(1).toLowerCase();
            },
          }}
        >
          <MenuItem value="" disabled>Select Role</MenuItem>
          <MenuItem value="TENANT">Tenant</MenuItem>
          <MenuItem value="LANDLORD">Landlord</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
          sx={{ 
            mt: 1, py: 1.2, fontWeight: 700, textTransform: "none", 
            bgcolor: "#f8b500", color: "#000",
            "&:hover": { bgcolor: "#e0a400" } 
          }}
        >
          {loading ? "Processing..." : "Register"}
        </Button>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <MuiLink 
            component="button" 
            type="button"
            onClick={switchToLogin} 
            sx={{ cursor: "pointer", textDecoration: "none", fontWeight: 700, color: "#f8b500" }}
          >
            Sign In
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  );
}