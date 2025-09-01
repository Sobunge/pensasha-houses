import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginForm from "../Auth/LoginPage/LoginForm";
import RegistrationForm from "../Auth/RegistrationPage/RegistrationForm";

function AuthModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const switchToLogin = () => setActiveTab(0);
  const switchToSignup = () => setActiveTab(1);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      {/* Top Bar with Tabs + Close Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ flex: 1 }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {/* Close Button */}
        <IconButton onClick={onClose} sx={{ mr: 1 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent>
        {activeTab === 0 ? (
          <LoginForm onSuccess={onClose} switchToSignup={switchToSignup} />
        ) : (
          <RegistrationForm
            onSuccess={onClose}
            switchToLogin={switchToLogin}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
