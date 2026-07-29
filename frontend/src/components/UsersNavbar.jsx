// src/components/UsersNavbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Badge,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import MailIcon from "@mui/icons-material/MailOutlined";
import ProfileMenu from "../layouts/ProfileMenu";
import ActivityFeedCard from "./cards/ActivityFeedCard";
import MessagesCard from "./cards/MessagesCard";
import { DRAWER_WIDTH, NAVBAR_HEIGHT } from "../layouts/constants";

// Sample data
const sampleMessages = [
  { id: 1, sender: "Alice", lastMessage: "Hi there!", unread: true },
  { id: 2, sender: "Bob", lastMessage: "Please review the payment.", unread: false },
  { id: 3, sender: "Charlie", lastMessage: "Maintenance request approved.", unread: true },
];

function UsersNavbar({ onMenuClick }) {
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElMessages, setAnchorElMessages] = useState(null);

  const unreadMessagesCount = sampleMessages.filter((m) => m.unread).length;
  const unreadNotificationsCount = 3;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: NAVBAR_HEIGHT,
        ml: { md: `${DRAWER_WIDTH}px` },
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        // --- Luxury Glassmorphism Header with Enhanced Depth ---
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(16px)",
        color: "#0F172A",
        // Soft ambient elevation shadow to float above page content
        boxShadow: "0px 8px 24px -4px rgba(15, 23, 42, 0.06)",
        // Bottom border with subtle Champagne Gold gradient accent line
        borderBottom: "1px solid",
        borderImage: "linear-gradient(to right, rgba(212, 175, 55, 0.4), rgba(226, 232, 240, 0.6)) 1",
        justifyContent: "center",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: NAVBAR_HEIGHT, px: { xs: 2, md: 3 } }}>
        {/* Mobile logo */}
        <Box
          component="img"
          src="/assets/images/logo.svg"
          alt="Pensasha Logo"
          sx={{
            display: { xs: "block", md: "none" },
            height: 32,
            mr: { xs: 1, sm: 2 },
          }}
        />

        {/* Mobile menu toggle */}
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{
            display: { md: "none" },
            color: "#0F172A",
            mr: 1,
            bgcolor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "rgba(212, 175, 55, 0.12)",
              borderColor: "#D4AF37",
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        {/* Action Button Container */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Messages Dropdown Button */}
          <IconButton
            onClick={(e) => setAnchorElMessages(e.currentTarget)}
            sx={{
              color: "#334155",
              bgcolor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              p: 1,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                color: "#D4AF37",
                borderColor: "#D4AF37",
                backgroundColor: "rgba(212, 175, 55, 0.08)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Badge
              badgeContent={unreadMessagesCount}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#D4AF37", // Champagne Gold
                  color: "#0F172A",
                  fontWeight: 800,
                  fontSize: "0.68rem",
                  boxShadow: "0 0 0 2px #FFFFFF",
                },
              }}
            >
              <MailIcon fontSize="small" />
            </Badge>
          </IconButton>

          <Popover
            open={Boolean(anchorElMessages)}
            anchorEl={anchorElMessages}
            onClose={() => setAnchorElMessages(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: "16px",
                boxShadow: "0px 14px 35px -5px rgba(15, 23, 42, 0.15)",
                border: "1px solid #E2E8F0",
                overflow: "hidden",
              },
            }}
          >
            <MessagesCard messages={sampleMessages} compact />
          </Popover>

          {/* Notifications Dropdown Button */}
          <IconButton
            onClick={(e) => setAnchorElNotifications(e.currentTarget)}
            sx={{
              color: "#334155",
              bgcolor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              p: 1,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                color: "#D4AF37",
                borderColor: "#D4AF37",
                backgroundColor: "rgba(212, 175, 55, 0.08)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Badge
              badgeContent={unreadNotificationsCount}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#0F172A", // Deep Obsidian
                  color: "#D4AF37", // Gold Text
                  fontWeight: 800,
                  fontSize: "0.68rem",
                  boxShadow: "0 0 0 2px #FFFFFF",
                },
              }}
            >
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>

          <Popover
            open={Boolean(anchorElNotifications)}
            anchorEl={anchorElNotifications}
            onClose={() => setAnchorElNotifications(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: "16px",
                boxShadow: "0px 14px 35px -5px rgba(15, 23, 42, 0.15)",
                border: "1px solid #E2E8F0",
                overflow: "hidden",
              },
            }}
          >
            <ActivityFeedCard compact />
          </Popover>

          {/* Profile Avatar / Menu */}
          <Box sx={{ ml: 0.5 }}>
            <ProfileMenu />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default UsersNavbar;