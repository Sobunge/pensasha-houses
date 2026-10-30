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

  // Standardized luxury hover state using theme tokens
  const menuItemStyle = (theme) => ({
    px: 2,
    py: 1.25,
    borderRadius: "8px",
    mx: 1,
    my: 0.25,
    color: theme.palette.primary.light,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: `${theme.palette.secondary.main}1A`, // ~10% opacity gold
      color: theme.palette.primary.main,
      "& .MuiListItemIcon-root": { color: theme.palette.secondary.main },
    },
  });

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
        sx={(theme) => ({
          p: 0.5,
          border: "1.5px solid",
          borderColor: Boolean(anchorEl) ? theme.palette.secondary.main : "transparent",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            borderColor: theme.palette.secondary.main,
            backgroundColor: `${theme.palette.secondary.main}14`, // ~8% opacity gold
          },
        })}
      >
        <Avatar
          sx={(theme) => ({
            width: 36,
            height: 36,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            fontSize: "0.875rem",
            fontWeight: 700,
            boxShadow: `0 2px 8px ${theme.palette.primary.main}26`,
          })}
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
          sx: (theme) => ({
            mt: 1.5,
            borderRadius: "16px",
            minWidth: 240,
            boxShadow: `0px 14px 35px -5px ${theme.palette.primary.main}26`,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            py: 1,
          }),
        }}
      >
        {/* User Details Header */}
        <Box sx={{ px: 2, py: 1.5, display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="subtitle2" sx={(theme) => ({ fontWeight: 700, color: theme.palette.text.primary })} noWrap>
              {user?.name || "User Account"}
            </Typography>

            {/* Role Badge */}
            <Chip
              label={role}
              size="small"
              sx={(theme) => ({
                height: 20,
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                bgcolor: `${theme.palette.secondary.main}26`, // ~15% opacity gold
                color: theme.palette.secondary.main,
                border: `1px solid ${theme.palette.secondary.main}4D`, // ~30% opacity gold border
              })}
            />
          </Box>

          <Typography variant="caption" sx={(theme) => ({ color: theme.palette.text.secondary })} noWrap>
            {user?.email || "user@example.com"}
          </Typography>
        </Box>

        <Divider sx={(theme) => ({ my: 1, borderColor: theme.palette.divider })} />

        {/* My Profile */}
        <MenuItem component={RouterLink} to={profileLink} onClick={handleClose} sx={menuItemStyle}>
          <ListItemIcon sx={(theme) => ({ minWidth: 32, color: theme.palette.text.secondary })}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
            My Profile
          </Typography>
        </MenuItem>

        {/* Settings */}
        <MenuItem component={RouterLink} to={settingsLink} onClick={handleClose} sx={menuItemStyle}>
          <ListItemIcon sx={(theme) => ({ minWidth: 32, color: theme.palette.text.secondary })}>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
            Account Settings
          </Typography>
        </MenuItem>

        <Divider sx={(theme) => ({ my: 1, borderColor: theme.palette.divider })} />

        {/* Logout */}
        <MenuItem
          onClick={handleLogout}
          sx={(theme) => ({
            px: 2,
            py: 1.25,
            borderRadius: "8px",
            mx: 1,
            my: 0.25,
            color: theme.palette.error?.main || "#EF4444",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: `${theme.palette.error?.main || "#EF4444"}14`,
              color: theme.palette.error?.dark || "#DC2626",
              "& .MuiListItemIcon-root": { color: theme.palette.error?.dark || "#DC2626" },
            },
          })}
        >
          <ListItemIcon sx={(theme) => ({ minWidth: 32, color: theme.palette.error?.main || "#EF4444" })}>
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