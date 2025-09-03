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

import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PaymentIcon from "@mui/icons-material/Payment";
import BuildIcon from "@mui/icons-material/Build";
import CampaignIcon from "@mui/icons-material/Campaign";
import DescriptionIcon from "@mui/icons-material/Description";

const drawerWidth = 240;

const tenantMenu = [
  { label: "Dashboard", icon: <DashboardIcon />, link: "/tenant/dashboard" },
  { label: "My Property", icon: <HomeWorkIcon />, link: "/tenant/property" },
  { label: "Rent & Payments", icon: <PaymentIcon />, link: "/tenant/payments" },
  {
    label: "Maintenance Requests",
    icon: <BuildIcon />,
    link: "/tenant/maintenance",
  },
  { label: "Announcements", icon: <CampaignIcon />, link: "/tenant/announcements" },
  { label: "Documents", icon: <DescriptionIcon />, link: "/tenant/documents" },
];

function TenantSidebar({ mobileOpen, onClose }) {
  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#111", // 🔥 Black background
        color: "#fff", // Default text color white
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          p: 2,
        }}
      >
        <Box
          component="img"
          src="/assets/images/logo.svg"
          alt="Pensasha Logo"
          sx={{ height: 30 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
          Pensasha Houses
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1, p: 1 }}>
        {tenantMenu.map((item) => (
          <ListItemButton
            key={item.label}
            component="a"
            href={item.link}
            sx={{
              borderRadius: 1,
              color: "#ddd",
              "&:hover": {
                backgroundColor: "#222", // Dark gray hover
                color: "#f8b500", // Accent color
                "& .MuiListItemIcon-root": { color: "#f8b500" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "#aaa" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        © {new Date().getFullYear()} Pensasha Houses
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
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
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default TenantSidebar;
