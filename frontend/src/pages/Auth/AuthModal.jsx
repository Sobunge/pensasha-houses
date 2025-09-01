import React, { useState } from "react";
import { Dialog, DialogContent, Tabs, Tab, Box } from "@mui/material";
import LoginForm from "../Auth/LoginPage/LoginForm";
import RegistrationForm from "../Auth/RegistrationPage/RegistrationForm";

function AuthModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
      </Box>

      {/* Content */}
      <DialogContent>
        {activeTab === 0 ? (
          <LoginForm onSuccess={onClose} />
        ) : (
          <RegistrationForm onSuccess={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
