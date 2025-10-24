// src/components/UserSidebar.jsx
import React, { useRef, useState, useEffect } from "react";
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
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../pages/Auth/AuthContext";
import {
  tenantMenuItems,
  landlordMenuItems,
  caretakerMenuItems,
  adminMenuItems,
} from "../config/menuItems";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const drawerWidth = 280;

function UserSidebar({ mobileOpen, onClose, collapsed = false }) {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems =
    user?.role === "tenant"
      ? tenantMenuItems
      : user?.role === "landlord"
      ? landlordMenuItems
      : user?.role === "caretaker"
      ? caretakerMenuItems
      : user?.role === "admin"
      ? adminMenuItems
      : [];

  // Scroll indicator state
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const scrollRef = useRef(null);

  useEffect(() => {
    let el = null;
    let observer = null;

    const setupScrollDetection = () => {
      el = scrollRef.current;
      if (!el) return;

      const checkScroll = () => {
        const isScrollable = el.scrollHeight > el.clientHeight;
        const scrollBottom = el.scrollTop + el.clientHeight;
        const maxScroll = el.scrollHeight;
        const distanceToBottom = maxScroll - scrollBottom;

        setShowScrollIndicator(isScrollable && distanceToBottom > 10);

        const fadeStart = 80; // fade threshold
        const newOpacity =
          distanceToBottom < fadeStart
            ? Math.max(0, distanceToBottom / fadeStart)
            : 1;
        setOpacity(newOpacity);
      };

      // Run initial check (with delay for DOM stability)
      setTimeout(checkScroll, 100);

      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);

      observer = new MutationObserver(checkScroll);
      observer.observe(el, { childList: true, subtree: true });

      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
        observer?.disconnect();
      };
    };

    const cleanup = setupScrollDetection();
    return cleanup;
  }, [mobileOpen, collapsed, menuItems.length, location.pathname]);

  // Drawer Content
  const drawerContent = (
    <Box
      sx={{
        minHeight: "100%",
        bgcolor: "#111",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "center",
          gap: collapsed ? 0 : 1,
          p: 2,
        }}
      >
        <Box
          component="img"
          src="/assets/images/logo.svg"
          alt="Pensasha Logo"
          sx={{ height: 30 }}
        />
        {!collapsed && (
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
            Pensasha Houses
          </Typography>
        )}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Menu with scroll + indicator */}
      <Box sx={{ position: "relative" }}>
        <SimpleBar
          scrollableNodeProps={{ ref: scrollRef }}
          style={{ maxHeight: "calc(100vh - 130px)" }}
          autoHide={true}
        >
          <List sx={{ flexGrow: 1, p: 1 }}>
            {menuItems.map((item) => {
              const isActive =
                location.pathname === item.link ||
                location.pathname.startsWith(item.link + "/");

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
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#222",
                      color: "#f8b500",
                      "& .MuiListItemIcon-root": { color: "#f8b500" },
                    },
                    justifyContent: collapsed ? "center" : "flex-start",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? "auto" : 40,
                      color: isActive ? "#f8b500" : "#aaa",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 600 : 500,
                        fontSize: "0.875rem",
                      }}
                    />
                  )}
                </ListItemButton>
              );
            })}
          </List>
        </SimpleBar>

        {/* Scroll Indicator (bouncy + fade out) */}
        {showScrollIndicator && (
          <Box
            sx={{
              position: "absolute",
              bottom: 6,
              left: 0,
              right: 0,
              textAlign: "center",
              pointerEvents: "none",
              opacity,
              transition: "opacity 0.3s ease",
              animation: "bounce 1.2s infinite",
              "@keyframes bounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(4px)" },
              },
            }}
          >
            <KeyboardArrowDownRoundedIcon
              sx={{
                color: "#f8b500",
                fontSize: 26,
                filter: "drop-shadow(0 0 4px rgba(248,181,0,0.3))",
              }}
            />
          </Box>
        )}
      </Box>

      {/* Footer */}
      {!collapsed && (
        <Box
          sx={{
            mt: "auto",
            p: 2,
            textAlign: "center",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          © {new Date().getFullYear()} Pensasha Houses
        </Box>
      )}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: collapsed ? 80 : drawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#111",
            borderRight: "1px solid rgba(255,255,255,0.1)",
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
            width: collapsed ? 80 : drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#111",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            overflow: "hidden",
            transition: "width 0.3s ease",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default UserSidebar;
