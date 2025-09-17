// src/components/UserSidebar.jsx
import React from "react";
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
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../pages/Auth/AuthContext"; 
import {
  tenantMenuItems,
  landlordMenuItems,
  caretakerMenuItems,
  adminMenuItems,
} from "../config/menuItems";

const drawerWidth = 240;

function UserSidebar({ mobileOpen, onClose }) {
  const location = useLocation();
  const { user } = useAuth();

  // Pick menuItems by role
  let menuItems = [];
  switch (user?.role) {
    case "tenant":
      menuItems = tenantMenuItems;
      break;
    case "landlord":
      menuItems = landlordMenuItems;
      break;
    case "caretaker":
      menuItems = caretakerMenuItems;
      break;
    case "admin":
      menuItems = adminMenuItems;
      break;
    default:
      menuItems = [];
  }

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
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, p: 2 }}>
        <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 30 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
          Pensasha Houses
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Navigation */}
      <List sx={{ flexGrow: 1, p: 1 }}>
        {menuItems.map((item) => {
          let isActive = false;
          if (["/tenant", "/landlord", "/admin", "/caretaker"].includes(item.link)) {
            isActive = location.pathname === item.link;
          } else {
            isActive =
              location.pathname === item.link ||
              location.pathname.startsWith(item.link + "/");
          }

          return (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.link}
              onClick={onClose}
              sx={{
                borderRadius: 1,
                color: isActive ? "#f8b500" : "#ddd",
                backgroundColor: isActive ? "#222" : "transparent",
                "&:hover": {
                  backgroundColor: "#222",
                  color: "#f8b500",
                  "& .MuiListItemIcon-root": { color: "#f8b500" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: isActive ? "#f8b500" : "#aaa" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 500,
                  fontSize: "0.875rem",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* Footer */}
      <Box sx={{ p: 2, textAlign: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
        © {new Date().getFullYear()} Pensasha Houses
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
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
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default UserSidebar;
