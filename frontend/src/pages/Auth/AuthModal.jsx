// src/components/modals/AuthModal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, Tabs, Tab, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import LoginForm from "../Auth/LoginPage/LoginForm";
import RegistrationForm from "../Auth/RegistrationPage/RegistrationForm";
import { useNotification } from "../../components/NotificationProvider";
import { useAuth } from "../../pages/Auth/AuthContext";

export default function AuthModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { loginAs } = useAuth();

  const switchToLogin = () => setActiveTab(0);
  const switchToSignup = () => setActiveTab(1);

  const handleLoginSuccess = (user, error) => {
    if (error) {
      notify(error, "error");
      return;
    }

    loginAs(user); // sets user in AuthContext
    notify("Login successful!", "success");
    onClose?.();

    // Navigate to multi-role dashboard
    navigate("/dashboard");
  };

  const handleRegisterSuccess = () => {
    notify("Account created successfully. Please login.", "success");
    switchToLogin();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={(_, val) => setActiveTab(val)} variant="fullWidth" sx={{ flex: 1 }}>
          <Tab icon={<LoginIcon />} iconPosition="start" label="Login" />
          <Tab icon={<PersonAddIcon />} iconPosition="start" label="Sign Up" />
        </Tabs>
        <IconButton onClick={onClose} sx={{ mr: 1 }}><CloseIcon /></IconButton>
      </Box>

      <DialogContent>
        {activeTab === 0 ? (
          <LoginForm onSuccess={handleLoginSuccess} onClose={onClose} switchToSignup={switchToSignup} />
        ) : (
          <RegistrationForm onSuccess={handleRegisterSuccess} switchToLogin={switchToLogin} />
        )}
      </DialogContent>
    </Dialog>
  );
}