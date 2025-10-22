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

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { notify } = useNotification();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Get user role dynamically
  const role = user?.role; // fallback if role not set

  // Dynamic profile link
  const profileLink = `/${role}/user-profile`;

  const hoverStyle = {
    backgroundColor: "#f8b500",
    color: "#111",
    "& .MuiListItemIcon-root": { color: "#111" },
  };

  const handleLogout = () => {
    try {
      handleClose();
      logout();
      notify("You have logged out successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      notify("Logout failed. Please try again.", "error");
    }
  };

  return (
    <>
      {/* Profile Icon Button */}
      <IconButton
        color="inherit"
        onClick={handleOpen}
        aria-label="open profile menu"
      >
        <AccountCircleIcon sx={{ fontSize: 28, color: "#111" }} />
      </IconButton>

      {/* Dropdown Menu */}
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
        {/* My Profile (dynamic link) */}
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
          <Typography variant="body2" sx={{ fontWeight: 500, color: "inherit" }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProfileMenu;
