// src/components/UserSidebar.jsx
import React, { useEffect, useRef, useMemo } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../pages/Auth/AuthContext";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { DRAWER_WIDTH } from "../layouts/constants";
import { getMenuItemsForRoles } from "../config/menuItems";

function UserSidebar({ mobileOpen, onClose }) {
  const location = useLocation();
  const { user } = useAuth();
  const firstMenuItemRef = useRef(null);

  // Merge menu items for multi-role users
  const mergedMenuItems = useMemo(() => getMenuItemsForRoles(user?.roles || []), [user?.roles]);

  // Determine if a menu item is active
  const isMenuItemActive = (item) => {
    const path = location.pathname;
    if (path === item.link) return true;
    if (item.link !== "/dashboard" && path.startsWith(item.link + "/")) return true;
    return false;
  };

  // Focus main content when mobile drawer closes
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
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, p: 2, flexShrink: 0 }}>
        <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 30 }} />
        <Typography variant="h6" fontWeight={600}>
          Pensasha Houses
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Scrollable Menu */}
      <Box sx={{ flexGrow: 1, pt: 2, overflow: "hidden" }}>
        <SimpleBar style={{ height: "100%" }} autoHide>
          <List sx={{ p: 1 }}>
            {mergedMenuItems.map((item, idx) => {
              const active = isMenuItemActive(item);
              return (
                <ListItemButton
                  key={item.link}
                  component={Link}
                  to={item.link}
                  onClick={onClose}
                  ref={idx === 0 ? firstMenuItemRef : null}
                  sx={{
                    borderRadius: 1,
                    color: active ? "#f8b500" : "#ddd",
                    backgroundColor: active ? "#222" : "transparent",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#222",
                      color: "#f8b500",
                      "& .MuiListItemIcon-root": { color: "#f8b500" },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: active ? "#f8b500" : "#aaa" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: active ? 600 : 500, fontSize: "0.875rem" }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </SimpleBar>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Footer */}
      <Box sx={{ p: 2, textAlign: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", flexShrink: 0 }}>
        © {new Date().getFullYear()} Pensasha Houses
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
        ModalProps={{
          keepMounted: true,
          disableEnforceFocus: true, // prevents focus warnings with aria-hidden
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH, bgcolor: "#111", borderRight: "1px solid rgba(255,255,255,0.1)" },
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
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH, bgcolor: "#111", borderRight: "1px solid rgba(255,255,255,0.1)" },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default UserSidebar;