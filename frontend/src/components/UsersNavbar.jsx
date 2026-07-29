// src/components/UsersNavbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Badge,
  Popover,
  useTheme,
  useMediaQuery,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        // Glassmorphism background
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(16px)",
        color: "#0F172A",
        boxShadow: "0px 8px 24px -4px rgba(15, 23, 42, 0.06)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
        justifyContent: "center",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: NAVBAR_HEIGHT,
          px: { xs: 1.5, sm: 2, md: 3 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Section: Menu Toggle + Brand Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 } }}>
          {/* Mobile menu toggle */}
          <IconButton
            edge="start"
            onClick={onMenuClick}
            aria-label="open drawer"
            sx={{
              display: { md: "none" },
              color: "#0F172A",
              bgcolor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "10px",
              p: { xs: 0.75, sm: 1 },
              "&:hover": {
                backgroundColor: "rgba(212, 175, 55, 0.12)",
                borderColor: "#D4AF37",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          {/* Mobile logo */}
          <Box
            component="img"
            src="/assets/images/logo.svg"
            alt="Pensasha Logo"
            sx={{
              display: { xs: "block", md: "none" },
              height: { xs: 26, sm: 30 },
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Right Section: Actions Container */}
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.75, sm: 1.25 } }}>
          {/* Messages Button */}
          <IconButton
            onClick={(e) => setAnchorElMessages(e.currentTarget)}
            size="small"
            sx={{
              color: "#334155",
              bgcolor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "10px",
              p: { xs: 0.75, sm: 1 },
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                color: "#D4AF37",
                borderColor: "#D4AF37",
                backgroundColor: "rgba(212, 175, 55, 0.08)",
              },
            }}
          >
            <Badge
              badgeContent={unreadMessagesCount}
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#D4AF37",
                  color: "#0F172A",
                  fontWeight: 800,
                  fontSize: "0.65rem",
                  height: 18,
                  minWidth: 18,
                  px: 0.5,
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
                width: isMobile ? "calc(100vw - 32px)" : 360,
                maxWidth: 380,
                borderRadius: "16px",
                boxShadow: "0px 14px 35px -5px rgba(15, 23, 42, 0.15)",
                border: "1px solid #E2E8F0",
                overflow: "hidden",
              },
            }}
          >
            <MessagesCard messages={sampleMessages} compact />
          </Popover>

          {/* Notifications Button */}
          <IconButton
            onClick={(e) => setAnchorElNotifications(e.currentTarget)}
            size="small"
            sx={{
              color: "#334155",
              bgcolor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "10px",
              p: { xs: 0.75, sm: 1 },
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                color: "#D4AF37",
                borderColor: "#D4AF37",
                backgroundColor: "rgba(212, 175, 55, 0.08)",
              },
            }}
          >
            <Badge
              badgeContent={unreadNotificationsCount}
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#0F172A",
                  color: "#D4AF37",
                  fontWeight: 800,
                  fontSize: "0.65rem",
                  height: 18,
                  minWidth: 18,
                  px: 0.5,
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
                width: isMobile ? "calc(100vw - 32px)" : 360,
                maxWidth: 380,
                borderRadius: "16px",
                boxShadow: "0px 14px 35px -5px rgba(15, 23, 42, 0.15)",
                border: "1px solid #E2E8F0",
                overflow: "hidden",
              },
            }}
          >
            <ActivityFeedCard compact />
          </Popover>

          {/* Profile Menu */}
          <Box sx={{ ml: { xs: 0.25, sm: 0.5 } }}>
            <ProfileMenu />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default UsersNavbar;