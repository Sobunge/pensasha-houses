import React, { useState } from "react";
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

function AuthModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const switchToLogin = () => setActiveTab(0);
  const switchToSignup = () => setActiveTab(1);
  const { notify } = useNotification();

  // This function will be passed to forms
  const handleSuccess = () => {
    onClose?.();        // Close the modal
    notify("Login successful!", "success");
    navigate("/tenant"); // Redirect to tenant page
  };

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
          <Tab icon={<LoginIcon />} iconPosition="start" label="Login" />
          <Tab icon={<PersonAddIcon />} iconPosition="start" label="Sign Up" />
        </Tabs>

        {/* Close Button */}
        <IconButton onClick={onClose} sx={{ mr: 1 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent>
        {activeTab === 0 ? (
          <LoginForm onSuccess={handleSuccess} switchToSignup={switchToSignup} />
        ) : (
          <RegistrationForm
            onSuccess={handleSuccess}
            switchToLogin={switchToLogin}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
