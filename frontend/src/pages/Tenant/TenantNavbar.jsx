import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function TenantNavbar({ onMenuClick }) {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: "#2a2a2a",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 56 }}>
        {/* Sidebar Toggle (Mobile) */}
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{
            display: { md: "none" },
            color: "#f7f7f7",
            "&:hover": { color: "#ffc62c" },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo + Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component="img"
            src="/assets/images/logo.svg"
            alt="Pensasha Logo"
            sx={{ height: 30 }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{ fontWeight: 600, color: "#f8b500" }}
          >
            Pensasha Houses
          </Typography>
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{ color: "#f7f7f7", "&:hover": { color: "#ffc62c" } }}
          >
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            sx={{ color: "#f7f7f7", "&:hover": { color: "#ffc62c" } }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TenantNavbar;
