// src/components/modals/AuthModal.jsx
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Tabs, Tab, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import LoginForm from "../Auth/LoginPage/LoginForm";
import RegistrationForm from "../Auth/RegistrationPage/RegistrationForm";

export default function AuthModal({ open, onClose, initialTab = 0 }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (open) setActiveTab(initialTab);
  }, [open, initialTab]);

  const switchToLogin = () => setActiveTab(0);
  const switchToSignup = () => setActiveTab(1);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: "24px",
          bgcolor: "#FFFFFF",
          color: "#0F172A",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          maxHeight: "90vh", // Keeps dialog within screen viewport
        }
      }}
    >
      {/* Top Navigation Bar */}
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          borderBottom: "1px solid #E2E8F0",
          bgcolor: "#FFFFFF",
          pt: 0.5,
          px: 1,
          zIndex: 10
        }}
      >
        <Tabs 
          value={activeTab} 
          onChange={(_, val) => setActiveTab(val)} 
          variant="fullWidth" 
          sx={{ 
            flex: 1,
            "& .MuiTab-root": { 
              py: 1.5, 
              fontWeight: 600, 
              textTransform: "none",
              color: "#64748B",
              "&.Mui-selected": { color: "#D4AF37" }
            },
            "& .MuiTabs-indicator": { backgroundColor: "#D4AF37", height: 3, borderRadius: "3px 3px 0 0" }
          }}
        >
          <Tab icon={<LoginIcon fontSize="small" />} iconPosition="start" label="Login" />
          <Tab icon={<PersonAddIcon fontSize="small" />} iconPosition="start" label="Sign Up" />
        </Tabs>
        
        <IconButton 
          onClick={onClose} 
          sx={{ color: "#64748B", "&:hover": { color: "#0F172A", bgcolor: "#F1F5F9" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Content Area with Hidden Scrollbar */}
      <DialogContent 
        sx={{ 
          bgcolor: "#FFFFFF", 
          pt: 3, 
          pb: 3, 
          px: { xs: 2.5, sm: 3 },
          overflowY: "auto",
          /* Hide scrollbar for Chrome, Safari, Opera, Edge, Firefox */
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {activeTab === 0 ? (
          <LoginForm onClose={onClose} switchToSignup={switchToSignup} />
        ) : (
          <RegistrationForm onSuccess={switchToLogin} switchToLogin={switchToLogin} />
        )}
      </DialogContent>
    </Dialog>
  );
}