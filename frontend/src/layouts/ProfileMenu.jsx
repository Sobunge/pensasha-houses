import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useNotification } from "../components/NotificationProvider";
import { useAuth } from "../pages/Auth/AuthContext";
import api from "../api/api"; // ✅ use your axios instance

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { notify } = useNotification();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const profileLink = "/dashboard/profile";

  const hoverStyle = {
    backgroundColor: "#f8b500",
    color: "#111",
    "& .MuiListItemIcon-root": { color: "#111" },
  };

  // 🔥 CORRECT LOGOUT FLOW
  const handleLogout = async () => {
    handleClose();

    try {
      // 1. Invalidate session on backend (delete refresh token + clear cookie)
      await api.post("/auth/logout");

      // 2. Clear frontend auth state
      logout();

      notify("You have logged out successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);

      // fallback to avoid broken state
      logout();

      notify("Logout failed. You have been logged out locally.", "warning");
      navigate("/");
    }
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpen}
        aria-label="open profile menu"
      >
        <AccountCircleIcon sx={{ fontSize: 28, color: "#111" }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: 2,
            minWidth: 200,
            boxShadow: 4,
            bgcolor: "#fff",
            color: "#111",
          },
        }}
      >
        {/* Profile */}
        <MenuItem
          component={RouterLink}
          to={profileLink}
          onClick={handleClose}
          sx={{
            px: 2,
            py: 1,
            transition: "background-color 0.3s",
            "&:hover": hoverStyle,
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            My Profile
          </Typography>
        </MenuItem>

        <Divider sx={{ borderColor: "#eee" }} />

        {/* Logout */}
        <MenuItem
          onClick={handleLogout}
          sx={{
            px: 2,
            py: 1,
            transition: "background-color 0.3s",
            "&:hover": hoverStyle,
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProfileMenu;