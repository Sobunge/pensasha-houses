// src/components/UserSidebar.jsx
import React, { useEffect, useMemo } from "react";
import {
  Box,
  Drawer,
  List,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isTiny = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const { user, activeRole } = useAuth(); // Pull activeRole from switcher logic

  // Get menu items based on the active role from the switcher
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
        // Deep Obsidian Slate background for luxury contrast anchor
        bgcolor: "#0F172A",
        color: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Brand Header (Preserved exact logo markup) */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 1.5, p: 3 }}>
        <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 32 }} />
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 600,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            fontSize: { xs: "1.15rem", md: "1.35rem" },
          }}
        >
          Pensasha
          {!isTiny && (
            <Box component="span" sx={{ color: "#D4AF37", fontWeight: 400 }}>
              {" "}
              Houses
            </Box>
          )}
        </Typography>
      </Box>

      {/* Role Indicator Chip (Styled for dark canvas) */}
      <Box sx={{ px: 3, mb: 2 }}>
        <Chip
          label={`${activeRole?.replace("ROLE_", "")} MODE`}
          size="small"
          sx={{
            bgcolor: "rgba(212, 175, 55, 0.15)", // Soft Champagne Gold tint
            color: "#D4AF37", // Bright gold text for dark contrast
            fontWeight: 800,
            fontSize: "0.65rem",
            borderRadius: "6px",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            letterSpacing: "0.05em",
          }}
        />
      </Box>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)", mx: 2 }} />

      {/* Navigation Menu */}
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
                    borderRadius: "10px",
                    mb: 0.75,
                    position: "relative",
                    color: active ? "#D4AF37" : "#94A3B8",
                    backgroundColor: active ? "rgba(212, 175, 55, 0.12)" : "transparent",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: active ? "rgba(212, 175, 55, 0.18)" : "rgba(255, 255, 255, 0.05)",
                      color: active ? "#D4AF37" : "#F8FAFC",
                      "& .MuiListItemIcon-root": {
                        color: "#D4AF37",
                      },
                    },
                    // Active State Left Gold Indicator Bar
                    "&::before": active
                      ? {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: "15%",
                          height: "70%",
                          width: "4px",
                          bgcolor: "#D4AF37",
                          borderRadius: "0 4px 4px 0",
                        }
                      : {},
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: active ? "#D4AF37" : "#64748B",
                      transition: "color 0.2s ease-in-out",
                    }}
                  >
                    {React.cloneElement(item.icon, { sx: { fontSize: 20 } })}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: active ? 700 : 500,
                      fontSize: "0.85rem",
                      letterSpacing: "0.01em",
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </SimpleBar>
      </Box>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

      {/* Footer */}
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography
          variant="caption"
          sx={{
            color: "#64748B",
            fontWeight: 700,
            letterSpacing: "0.05em",
            fontSize: "0.7rem",
          }}
        >
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
            bgcolor: "#0F172A",
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
            bgcolor: "#0F172A",
            borderRight: "none",
            boxShadow: "4px 0 24px rgba(15, 23, 42, 0.08)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default UserSidebar;