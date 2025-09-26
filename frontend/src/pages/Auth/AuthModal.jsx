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

// ⬅️ import AuthContext + users
import { AuthContext } from "./AuthContext"; // ✅ check path
import { users } from "../../config/users" // ✅ lowercase file name

function AuthModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { notify } = useNotification();

  // from context
  const { loginAs } = useContext(AuthContext);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const switchToLogin = () => setActiveTab(0);
  const switchToSignup = () => setActiveTab(1);

  // ✅ Updated: check both email + password
  const handleSuccess = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      loginAs(user); // store full user object in context
      notify(`Welcome back, ${user.name}!`, "success");
      onClose?.(); // Close modal

      // redirect based on role
      switch (user.role) {
        case "tenant":
          navigate("/tenant");
          break;
        case "landlord":
          navigate("/landlord");
          break;
        case "caretaker":
          navigate("/caretaker");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    } else {
      notify("Invalid email or password!", "error");
    }
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

        <IconButton onClick={onClose} sx={{ mr: 1 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent>
        {activeTab === 0 ? (
          <LoginForm
            onSuccess={handleSuccess} // expects (email, password)
            onClose={onClose} // <-- Pass onClose to LoginForm
            switchToSignup={switchToSignup}
          />
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
