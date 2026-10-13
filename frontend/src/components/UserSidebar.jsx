import React, { useEffect, useMemo, useRef } from "react";
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

const SIDEBAR_COLORS = {
  background: "#0F172A",
  text: "#F8FAFC",
  gold: "#D4AF37",
  muted: "#94A3B8",
  icon: "#64748B",
  divider: "rgba(255, 255, 255, 0.08)",
  activeBackground: "rgba(212, 175, 55, 0.12)",
  activeHoverBackground: "rgba(212, 175, 55, 0.18)",
  hoverBackground: "rgba(255, 255, 255, 0.05)",
};

function UserSidebar({ mobileOpen, onClose }) {
  const location = useLocation();
  const { user, activeRole } = useAuth();

  // Normalize the role once and reuse it throughout the component.
  const currentRole = useMemo(() => {
    const role = activeRole || user?.role;

    if (typeof role !== "string" || !role.trim()) {
      return "";
    }

    return role
      .trim()
      .replace(/^ROLE_/i, "")
      .toUpperCase();
  }, [activeRole, user?.role]);

  // Generate navigation items for the current role.
  const menuItems = useMemo(() => {
    return getMenuItems(currentRole);
  }, [currentRole]);

  // Track whether the mobile drawer was previously open.
  const wasMobileOpen = useRef(false);

  // Restore focus only when the mobile drawer closes after being open.
  useEffect(() => {
    if (wasMobileOpen.current && !mobileOpen) {
      document.getElementById("mainContent")?.focus();
    }

    wasMobileOpen.current = mobileOpen;
  }, [mobileOpen]);

  // Determine whether a navigation item matches the current route.
  const isMenuItemActive = (item) => {
    const path = location.pathname;

    if (path === item.link) {
      return true;
    }

    // Prevent the Dashboard item from matching every dashboard route.
    if (item.link === "/dashboard") {
      return false;
    }

    // Support nested routes, such as /dashboard/my-properties/12.
    return path.startsWith(`${item.link}/`);
  };

  // Shared navigation content for desktop and mobile drawers.
  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        bgcolor: SIDEBAR_COLORS.background,
        color: SIDEBAR_COLORS.text,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1.5,
          p: 3,
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src="/assets/images/logo.svg"
          alt="Pensasha logo"
          sx={{
            height: 32,
            width: "auto",
            flexShrink: 0,
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 600,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            fontSize: {
              xs: "1.15rem",
              md: "1.35rem",
            },
            whiteSpace: "nowrap",
          }}
        >
          Pensasha
          <Box
            component="span"
            sx={{
              color: SIDEBAR_COLORS.gold,
              fontWeight: 400,
            }}
          >
            {" "}
            Houses
          </Box>
        </Typography>
      </Box>

      {/* Active Role Indicator */}
      <Box
        sx={{
          px: 3,
          mb: 2,
          flexShrink: 0,
        }}
      >
        <Chip
          label={currentRole ? `${currentRole} MODE` : "ROLE UNAVAILABLE"}
          size="small"
          sx={{
            bgcolor: "rgba(212, 175, 55, 0.15)",
            color: SIDEBAR_COLORS.gold,
            fontWeight: 800,
            fontSize: "0.65rem",
            borderRadius: "6px",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            letterSpacing: "0.05em",
            maxWidth: "100%",
          }}
        />
      </Box>

      <Divider
        sx={{
          borderColor: SIDEBAR_COLORS.divider,
          mx: 2,
          flexShrink: 0,
        }}
      />

      {/* Navigation Menu */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          pt: 2,
          overflow: "hidden",
        }}
      >
        <SimpleBar
          style={{ height: "100%" }}
          autoHide={false}
          className="pensasha-sidebar-scroll"
        >
          <List
            component="ul"
            aria-label={`${currentRole || "User"} navigation menu`}
            sx={{
              px: 2,
              py: 0,
            }}
          >
            {menuItems.map((item) => {
              const active = isMenuItemActive(item);

              return (
                <ListItemButton
                  key={item.id}
                  component={Link}
                  to={item.link}
                  selected={active}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  sx={{
                    borderRadius: "10px",
                    mb: 0.75,
                    position: "relative",
                    color: active
                      ? SIDEBAR_COLORS.gold
                      : SIDEBAR_COLORS.muted,
                    backgroundColor: active
                      ? SIDEBAR_COLORS.activeBackground
                      : "transparent",
                    transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",

                    "&.Mui-selected": {
                      backgroundColor:
                        SIDEBAR_COLORS.activeBackground,
                    },

                    "&.Mui-selected:hover": {
                      backgroundColor:
                        SIDEBAR_COLORS.activeHoverBackground,
                    },

                    "&:hover": {
                      backgroundColor: active
                        ? SIDEBAR_COLORS.activeHoverBackground
                        : SIDEBAR_COLORS.hoverBackground,
                      color: active
                        ? SIDEBAR_COLORS.gold
                        : SIDEBAR_COLORS.text,

                      "& .MuiListItemIcon-root": {
                        color: SIDEBAR_COLORS.gold,
                      },
                    },

                    "&:focus-visible": {
                      outline: `2px solid ${SIDEBAR_COLORS.gold}`,
                      outlineOffset: "-2px",
                    },

                    "&::before": active
                      ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "15%",
                        height: "70%",
                        width: "4px",
                        bgcolor: SIDEBAR_COLORS.gold,
                        borderRadius: "0 4px 4px 0",
                      }
                      : {},
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: active
                        ? SIDEBAR_COLORS.gold
                        : SIDEBAR_COLORS.icon,
                      transition: "color 0.2s ease-in-out",
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      sx: {
                        ...item.icon.props.sx,
                        fontSize: 20,
                      },
                    })}
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

      {/* Footer */}
      <Divider
        sx={{
          borderColor: SIDEBAR_COLORS.divider,
          flexShrink: 0,
        }}
      />

      <Box
        sx={{
          p: 2,
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: SIDEBAR_COLORS.icon,
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
    <Box
      component="nav"
      aria-label="Main navigation"
      sx={{
        width: { md: DRAWER_WIDTH },
        flexShrink: { md: 0 },
      }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          zIndex: (theme) => theme.zIndex.drawer + 2,

          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            height: "100vh",
            bgcolor: SIDEBAR_COLORS.background,
            borderRight: "none",
            boxSizing: "border-box",
            overflow: "hidden",
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
          display: {
            xs: "none",
            md: "block",
          },

          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            height: "100vh",
            bgcolor: SIDEBAR_COLORS.background,
            borderRight: "none",
            boxShadow: "4px 0 24px rgba(15, 23, 42, 0.08)",
            boxSizing: "border-box",
            overflow: "hidden",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default UserSidebar;