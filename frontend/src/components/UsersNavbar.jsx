import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import ProfileMenu from "../pages/Tenant/ProfileMenu";
import ActivityFeedCard from "./cards/ActivityFeedCard";
import MessagesCard from "./cards/MessagesCard";
import { useNavigate } from "react-router-dom";

// Sample messages (replace with actual state from backend)
const sampleMessages = [
  { id: 1, sender: "Alice", lastMessage: "Hi there!", unread: true },
  { id: 2, sender: "Bob", lastMessage: "Please review the payment.", unread: false },
  { id: 3, sender: "Charlie", lastMessage: "Maintenance request approved.", unread: true },
  { id: 4, sender: "David", lastMessage: "Can we schedule a visit?", unread: false },
];

function UsersNavbar({ onMenuClick }) {
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElMessages, setAnchorElMessages] = useState(null);

  const navigate = useNavigate();

  // Notifications popover
  const handleOpenNotifications = (event) => setAnchorElNotifications(event.currentTarget);
  const handleCloseNotifications = () => setAnchorElNotifications(null);

  // Messages popover
  const handleOpenMessages = (event) => setAnchorElMessages(event.currentTarget);
  const handleCloseMessages = () => setAnchorElMessages(null);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        color: "#111",
        boxShadow: 2,
        borderBottom: "1px solid #eee",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Sidebar Menu (mobile) */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo (mobile centered) */}
        <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1, justifyContent: "center" }}>
          <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 32 }} />
        </Box>

        {/* Logo + Dashboard Title (desktop) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
          <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#111", pl: 26 }}>
            Tenant – Dashboard
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }} />

        {/* ===== Messages Dropdown ===== */}
        <IconButton color="inherit" onClick={handleOpenMessages}>
          <Badge
            badgeContent={sampleMessages.filter((m) => m.unread).length}
            color="warning"
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <Popover
          open={Boolean(anchorElMessages)}
          anchorEl={anchorElMessages}
          onClose={handleCloseMessages}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ sx: { mt: 1.5, borderRadius: 3, boxShadow: 4, width: 320 } }}
        >
          <MessagesCard messages={sampleMessages} compact />
        </Popover>

        {/* ===== Notifications Dropdown ===== */}
        <IconButton color="inherit" onClick={handleOpenNotifications}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popover
          open={Boolean(anchorElNotifications)}
          anchorEl={anchorElNotifications}
          onClose={handleCloseNotifications}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ sx: { mt: 1.5, borderRadius: 3, boxShadow: 4, width: 320 } }}
        >
          <ActivityFeedCard compact />
        </Popover>

        {/* Profile Menu */}
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
}

export default UsersNavbar;
