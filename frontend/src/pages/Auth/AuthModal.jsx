// src/components/modals/AuthModal.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import LoginForm from "../Auth/LoginPage/LoginForm";
import RegistrationForm from "../Auth/RegistrationPage/RegistrationForm";
import { useNotification } from "../../components/NotificationProvider";
import { AuthContext } from "../../pages/Auth/AuthContext";
import { users } from "../../config/users";

export default function AuthModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { loginAs, redirectAfterAuth, setRedirectAfterAuth } = useContext(AuthContext);

  // -----------------------
  // Tab switching
  // -----------------------
  const handleTabChange = (_, newValue) => setActiveTab(newValue);
  const switchToLogin = () => setActiveTab(0);
  const switchToSignup = () => setActiveTab(1);

  // -----------------------
  // Login handler
  // -----------------------
  const handleLoginSuccess = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      notify("Invalid email or password!", "error");
      return;
    }

    loginAs(user);
    notify(`Welcome back, ${user.name}!`, "success");
    onClose?.();

    // ✅ Redirect if user had an intended page (like property page)
    if (redirectAfterAuth) {
      navigate(redirectAfterAuth);
      setRedirectAfterAuth(null);
      return;
    }

    // ✅ Default role-based redirect
    const roleRedirects = {
      tenant: "/tenant",
      landlord: "/landlord",
      caretaker: "/caretaker",
      admin: "/admin",
    };
    navigate(roleRedirects[user.role] || "/");
  };

  // -----------------------
  // Registration handler
  // -----------------------
  const handleRegisterSuccess = (newUserData) => {
    const user = {
      name: `${newUserData.firstName} ${newUserData.lastName}`,
      role: newUserData.role,
      email: newUserData.email || "",
      phone: newUserData.phone,
    };

    loginAs(user);
    notify("Account created successfully!", "success");
    onClose?.();

    // ✅ Redirect if user had an intended page
    if (redirectAfterAuth) {
      navigate(redirectAfterAuth);
      setRedirectAfterAuth(null);
      return;
    }

    // ✅ Default redirect after signup
    navigate("/");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      {/* Header with Tabs and Close button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" sx={{ flex: 1 }}>
          <Tab icon={<LoginIcon />} iconPosition="start" label="Login" />
          <Tab icon={<PersonAddIcon />} iconPosition="start" label="Sign Up" />
        </Tabs>
        <IconButton onClick={onClose} sx={{ mr: 1 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Dialog content */}
      <DialogContent>
        {activeTab === 0 ? (
          <LoginForm
            onSuccess={handleLoginSuccess}
            onClose={onClose}
            switchToSignup={switchToSignup}
          />
        ) : (
          <RegistrationForm
            onSuccess={handleRegisterSuccess}
            switchToLogin={switchToLogin}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
