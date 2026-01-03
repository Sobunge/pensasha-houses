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
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { DRAWER_WIDTH } from "../layouts/constants";

function UserSidebar({ mobileOpen, onClose }) {
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          p: 2,
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src="/assets/images/logo.svg"
          alt="Pensasha Logo"
          sx={{ height: 30 }}
        />
        <Typography variant="h6" fontWeight={600}>
          Pensasha Houses
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Scrollable Menu (flex-based, no magic numbers) */}
      <Box sx={{ flexGrow: 1, pt: 2, overflow: "hidden" }}>
        <SimpleBar style={{ height: "100%" }} autoHide>
          <List sx={{ p: 1 }}>
            {menuItems.map((item) => {
              const basePath = `/${user?.role}`;
              const isActive =
                location.pathname === item.link ||
                (location.pathname.startsWith(item.link + "/") &&
                  item.link !== basePath);

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
                      "& .MuiListItemIcon-root": {
                        color: "#f8b500",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? "#f8b500" : "#aaa",
                    }}
                  >
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
        </SimpleBar>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.6)",
          flexShrink: 0,
        }}
      >
        © {new Date().getFullYear()} Pensasha Houses
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
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
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
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
            width: DRAWER_WIDTH,
            bgcolor: "#111",
            borderRight: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default UserSidebar;
