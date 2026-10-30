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
        sx: (theme) => ({ 
          borderRadius: `${theme.shape.borderRadius * 2}px`,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: `0 25px 50px -12px ${theme.palette.primary.main}40`,
          overflow: "hidden",
          maxHeight: "90vh", // Keeps dialog within screen viewport
        })
      }}
    >
      {/* Top Navigation Bar */}
      <Box 
        sx={(theme) => ({ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          pt: 0.5,
          px: 1,
          zIndex: 10
        })}
      >
        <Tabs 
          value={activeTab} 
          onChange={(_, val) => setActiveTab(val)} 
          variant="fullWidth" 
          sx={(theme) => ({ 
            flex: 1,
            "& .MuiTab-root": { 
              py: 1.5, 
              fontWeight: 600, 
              textTransform: "none",
              color: theme.palette.text.secondary,
              "&.Mui-selected": { color: theme.palette.secondary.main }
            },
            "& .MuiTabs-indicator": { 
              backgroundColor: theme.palette.secondary.main, 
              height: 3, 
              borderRadius: "3px 3px 0 0" 
            }
          })}
        >
          <Tab icon={<LoginIcon fontSize="small" />} iconPosition="start" label="Login" />
          <Tab icon={<PersonAddIcon fontSize="small" />} iconPosition="start" label="Sign Up" />
        </Tabs>
        
        <IconButton 
          onClick={onClose} 
          sx={(theme) => ({ 
            color: theme.palette.text.secondary, 
            "&:hover": { 
              color: theme.palette.text.primary, 
              bgcolor: `${theme.palette.primary.main}0A` 
            } 
          })}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Content Area with Hidden Scrollbar */}
      <DialogContent 
        sx={(theme) => ({ 
          bgcolor: theme.palette.background.paper, 
          pt: 3, 
          pb: 3, 
          px: { xs: 2.5, sm: 3 },
          overflowY: "auto",
          /* Hide scrollbar for Chrome, Safari, Opera, Edge, Firefox */
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        })}
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