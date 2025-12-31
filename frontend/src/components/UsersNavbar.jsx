// src/components/UsersNavbar.jsx
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
import ProfileMenu from "../layouts/ProfileMenu";
import ActivityFeedCard from "./cards/ActivityFeedCard";
import MessagesCard from "./cards/MessagesCard";
import { DRAWER_WIDTH, NAVBAR_HEIGHT } from "../layouts/constants";

const sampleMessages = [
  { id: 1, sender: "Alice", lastMessage: "Hi there!", unread: true },
  { id: 2, sender: "Bob", lastMessage: "Please review the payment.", unread: false },
  { id: 3, sender: "Charlie", lastMessage: "Maintenance request approved.", unread: true },
];

function UsersNavbar({ onMenuClick }) {
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElMessages, setAnchorElMessages] = useState(null);

  return (
    <AppBar
      position="fixed"
      sx={{
        height: NAVBAR_HEIGHT,
        ml: { md: `${DRAWER_WIDTH}px` },
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        backgroundColor: "#fff",
        color: "#111",
        borderBottom: "1px solid #eee",
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ minHeight: NAVBAR_HEIGHT, px: { xs: 1, md: 3 } }}>
        {/* Mobile logo */}
        <Box
          component="img"
          src="/assets/images/logo.svg"
          alt="Pensasha Logo"
          sx={{
            display: { xs: "block", md: "none" }, // only on mobile
            height: 32,
            mr: 2, // spacing to menu button
          }}
        />

        {/* Mobile menu button */}
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop text only */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            My Dashboard
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Messages */}
        <IconButton onClick={(e) => setAnchorElMessages(e.currentTarget)}>
          <Badge badgeContent={2} color="warning">
            <MailIcon />
          </Badge>
        </IconButton>
        <Popover
          open={Boolean(anchorElMessages)}
          anchorEl={anchorElMessages}
          onClose={() => setAnchorElMessages(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MessagesCard messages={sampleMessages} compact />
        </Popover>

        {/* Notifications */}
        <IconButton onClick={(e) => setAnchorElNotifications(e.currentTarget)}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popover
          open={Boolean(anchorElNotifications)}
          anchorEl={anchorElNotifications}
          onClose={() => setAnchorElNotifications(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
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
