// src/components/ProfileMenu.jsx
import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Typography,
  Divider,
  Avatar,
  Box,
  Chip,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import { useNotification } from "../components/NotificationProvider";
import { useAuth } from "../pages/Auth/AuthContext";
import api from "../api/api";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { notify } = useNotification();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const role = user?.role || "tenant";
  const profileLink = `/${role}/profile`;
  const settingsLink = `/${role}/settings`;

  // Standardized luxury hover state
  const menuItemStyle = {
    px: 2,
    py: 1.25,
    borderRadius: "8px",
    mx: 1,
    my: 0.25,
    color: "#334155",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(212, 175, 55, 0.10)",
      color: "#0F172A",
      "& .MuiListItemIcon-root": { color: "#D4AF37" },
    },
  };

  // Logout Flow
  const handleLogout = async () => {
    handleClose();

    try {
      // 1. Invalidate session on backend
      await api.post("/auth/logout");

      // 2. Clear frontend auth state
      logout();

      notify("You have logged out successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);

      // Fallback to avoid broken state
      logout();

      notify("Logout failed. You have been logged out locally.", "warning");
      navigate("/");
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Trigger Button */}
      <IconButton
        onClick={handleOpen}
        aria-label="open profile menu"
        sx={{
          p: 0.5,
          border: "1.5px solid",
          borderColor: Boolean(anchorEl) ? "#D4AF37" : "transparent",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            borderColor: "#D4AF37",
            backgroundColor: "rgba(212, 175, 55, 0.08)",
          },
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "#0F172A",
            color: "#D4AF37",
            fontSize: "0.875rem",
            fontWeight: 700,
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.15)",
          }}
        >
          {getInitials(user?.name || user?.email)}
        </Avatar>
      </IconButton>

      {/* Profile Popover Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: "16px",
            minWidth: 240,
            boxShadow: "0px 14px 35px -5px rgba(15, 23, 42, 0.15)",
            border: "1px solid #E2E8F0",
            bgcolor: "#FFFFFF",
            py: 1,
          },
        }}
      >
        {/* User Details Header Header */}
        <Box sx={{ px: 2, py: 1.5, display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0F172A" }} noWrap>
              {user?.name || "User Account"}
            </Typography>

            {/* Role Badge */}
            <Chip
              label={role}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                bgcolor: "rgba(212, 175, 55, 0.15)",
                color: "#D4AF37",
                border: "1px solid rgba(212, 175, 55, 0.3)",
              }}
            />
          </Box>

          <Typography variant="caption" sx={{ color: "#64748B" }} noWrap>
            {user?.email || "user@example.com"}
          </Typography>
        </Box>

        <Divider sx={{ my: 1, borderColor: "#E2E8F0" }} />

        {/* My Profile */}
        <MenuItem component={RouterLink} to={profileLink} onClick={handleClose} sx={menuItemStyle}>
          <ListItemIcon sx={{ minWidth: 32, color: "#64748B" }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
            My Profile
          </Typography>
        </MenuItem>

        {/* Settings */}
        <MenuItem component={RouterLink} to={settingsLink} onClick={handleClose} sx={menuItemStyle}>
          <ListItemIcon sx={{ minWidth: 32, color: "#64748B" }}>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
            Account Settings
          </Typography>
        </MenuItem>

        <Divider sx={{ my: 1, borderColor: "#E2E8F0" }} />

        {/* Logout */}
        <MenuItem
          onClick={handleLogout}
          sx={{
            ...menuItemStyle,
            color: "#EF4444",
            "&:hover": {
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              color: "#DC2626",
              "& .MuiListItemIcon-root": { color: "#DC2626" },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 32, color: "#EF4444" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProfileMenu;