// src/components/UserSidebar.jsx
import React, { useEffect, useMemo } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Chip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../pages/Auth/AuthContext";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { DRAWER_WIDTH } from "../layouts/constants";
import { getMenuItems } from "../config/menuItems";

function UserSidebar({ mobileOpen, onClose }) {
  const location = useLocation();
  const { user, activeRole } = useAuth(); // 🔥 Pull activeRole from your switcher logic

  // 🔥 Get menu items based on the active role from the switcher
  const menuItems = useMemo(() => {
    return getMenuItems(activeRole || user?.role);
  }, [activeRole, user]);

  // Determine active route
  const isMenuItemActive = (item) => {
    const path = location.pathname;
    if (path === item.link) return true;
    if (item.link !== "/dashboard" && path.startsWith(item.link + "/")) return true;
    return false;
  };

  // Accessibility: focus main content when drawer closes
  useEffect(() => {
    if (!mobileOpen) {
      const main = document.getElementById("mainContent");
      if (main) main.focus();
    }
  }, [mobileOpen]);

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#111",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 1.5, p: 3 }}>
        <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 32 }} />
        <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: "-0.5px", textTransform: 'uppercase' }}>
          Pensasha Houses
        </Typography>
      </Box>

      {/* Role Indicator: Shows the user which dashboard mode they are currently in */}
      <Box sx={{ px: 3, mb: 2 }}>
        <Chip 
          label={`${activeRole} MODE`} 
          size="small" 
          sx={{ 
            bgcolor: "rgba(248, 181, 0, 0.1)", 
            color: "#f8b500", 
            fontWeight: 900, 
            fontSize: '0.65rem',
            borderRadius: '4px',
            border: '1px solid rgba(248, 181, 0, 0.2)'
          }} 
        />
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mx: 2 }} />

      {/* Menu */}
      <Box sx={{ flexGrow: 1, pt: 2, overflow: "hidden" }}>
        <SimpleBar style={{ height: "100%" }} autoHide>
          <List sx={{ px: 2 }}>
            {menuItems.map((item) => {
              const active = isMenuItemActive(item);

              return (
                <ListItemButton
                  key={item.link}
                  component={Link}
                  to={item.link}
                  onClick={onClose}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    color: active ? "#f8b500" : "#aaa",
                    backgroundColor: active ? "rgba(248, 181, 0, 0.08)" : "transparent",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.05)",
                      color: "#f8b500",
                      "& .MuiListItemIcon-root": { color: "#f8b500" },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 35,
                      color: active ? "#f8b500" : "inherit",
                    }}
                  >
                    {/* Ensure icons are consistently sized */}
                    {React.cloneElement(item.icon, { sx: { fontSize: 20 } })}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: active ? 800 : 600,
                      fontSize: "0.825rem",
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </SimpleBar>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />

      {/* Footer */}
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>
          © {new Date().getFullYear()} PENSASHA HOUSES
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true, disableEnforceFocus: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            bgcolor: "#111",
            borderRight: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            bgcolor: "#111",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default UserSidebar;