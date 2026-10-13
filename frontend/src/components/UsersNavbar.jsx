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
        backgroundColor: "#FAF6E9",
        backdropFilter: "blur(12px)",
        color: "text.primary",
        
        // 🌟 Gold border line separating navbar from page body
        borderBottom: "1px solid",
        borderColor: "secondary.main", // #D4AF37 champagne gold from theme
        boxShadow: "0px 4px 20px rgba(212, 175, 55, 0.12)", // Subtle ambient gold glow

        justifyContent: "center",
        // Keep navbar below sidebar drawer z-index on desktop to prevent clipping/overlapping
        zIndex: { xs: theme.zIndex.drawer + 1, md: theme.zIndex.drawer - 1 },
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: NAVBAR_HEIGHT,
          px: { xs: 2, sm: 3 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Section: Mobile Menu Toggle + Mobile Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            edge="start"
            onClick={onMenuClick}
            aria-label="open drawer"
            sx={{
              display: { md: "none" },
              color: "text.primary",
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "10px",
              p: 0.8,
              "&:hover": {
                backgroundColor: "rgba(212, 175, 55, 0.1)",
                borderColor: "secondary.main",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box
            component="img"
            src="/assets/images/logo.svg"
            alt="Pensasha Logo"
            sx={{
              display: { xs: "block", md: "none" },
              height: 28,
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Right Section: Action Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: "auto" }}>
          {/* Messages Button */}
          <IconButton
            onClick={(e) => setAnchorElMessages(e.currentTarget)}
            size="small"
            sx={{
              color: "text.secondary",
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "10px",
              p: 1,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                color: "secondary.main",
                borderColor: "secondary.main",
                backgroundColor: "rgba(212, 175, 55, 0.08)",
              },
            }}
          >
            <Badge
              badgeContent={unreadMessagesCount}
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "secondary.main",
                  color: "primary.main",
                  fontWeight: 700,
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
                borderRadius: "16px",
                boxShadow: "0px 12px 32px rgba(15, 23, 42, 0.08)",
                border: "1px solid",
                borderColor: "divider",
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
              color: "text.secondary",
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "10px",
              p: 1,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                color: "secondary.main",
                borderColor: "secondary.main",
                backgroundColor: "rgba(212, 175, 55, 0.08)",
              },
            }}
          >
            <Badge
              badgeContent={unreadNotificationsCount}
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "secondary.main",
                  color: "primary.main",
                  fontWeight: 700,
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
                borderRadius: "16px",
                boxShadow: "0px 12px 32px rgba(15, 23, 42, 0.08)",
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
              },
            }}
          >
            <ActivityFeedCard compact />
          </Popover>

          {/* Profile Menu */}
          <Box sx={{ ml: 0.5 }}>
            <ProfileMenu />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default UsersNavbar;