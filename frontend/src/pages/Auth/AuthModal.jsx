// src/components/modals/AuthModal.jsx
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Tabs, Tab, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import LoginForm from "../Auth/LoginPage/LoginForm";
import RegistrationForm from "../Auth/RegistrationPage/RegistrationForm";

export default function AuthModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(0);

  // Reset to Login tab whenever the modal is opened fresh
  useEffect(() => {
    if (open) setActiveTab(0);
  }, [open]);

  const switchToLogin = () => setActiveTab(0);
  const switchToSignup = () => setActiveTab(1);

  /* Note: RegistrationForm calls notify() and switchToLogin() internally 
     on success. handleRegisterSuccess acts as an extra hook if needed.
  */
  const handleRegisterSuccess = () => {
    switchToLogin();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, overflow: "hidden" }
      }}
    >
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          borderBottom: 1, 
          borderColor: "divider",
          bgcolor: "#fcfcfc" 
        }}
      >
        <Tabs 
          value={activeTab} 
          onChange={(_, val) => setActiveTab(val)} 
          variant="fullWidth" 
          sx={{ 
            flex: 1,
            "& .MuiTab-root": { py: 2, fontWeight: 600, textTransform: "none" },
            "& .Mui-selected": { color: "#f8b500" },
            "& .MuiTabs-indicator": { backgroundColor: "#f8b500" }
          }}
        >
          <Tab icon={<LoginIcon fontSize="small" />} iconPosition="start" label="Login" />
          <Tab icon={<PersonAddIcon fontSize="small" />} iconPosition="start" label="Sign Up" />
        </Tabs>
        <IconButton onClick={onClose} sx={{ mr: 1 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ mt: 1, pb: 4 }}>
        {activeTab === 0 ? (
          <LoginForm 
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