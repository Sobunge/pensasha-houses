// src/components/LandlordSidebar.jsx
import React from "react";
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, Typography
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import PaymentIcon from "@mui/icons-material/Payment";
import DescriptionIcon from "@mui/icons-material/Description";
import MailIcon from "@mui/icons-material/Mail";
import CampaignIcon from "@mui/icons-material/Campaign";

const drawerWidth = 240;

const landlordMenu = [
  { label: "Dashboard", icon: <DashboardIcon />, link: "/landlord" },
  { label: "My Properties", icon: <HomeWorkIcon />, link: "/landlord/properties" },
  { label: "Tenants", icon: <PersonIcon />, link: "/landlord/tenants" },
  { label: "Caretakers", icon: <BuildIcon />, link: "/landlord/caretakers" },
  { label: "Finances", icon: <PaymentIcon />, link: "/landlord/finances" },
  { label: "Reports", icon: <DescriptionIcon />, link: "/landlord/reports" },
  { label: "Messages", icon: <MailIcon />, link: "/landlord/messages" },
  { label: "Announcements", icon: <CampaignIcon />, link: "/landlord/announcements" },
];

function LandlordSidebar({ mobileOpen, onClose }) {
  const location = useLocation();

  const drawerContent = (
    <Box sx={{ height: "100%", bgcolor: "#111", color: "#fff", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, p: 2 }}>
        <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 30 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Pensasha Houses</Typography>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <List sx={{ flexGrow: 1, p: 1 }}>
        {landlordMenu.map((item) => {
          const isActive = location.pathname === item.link || location.pathname.startsWith(item.link + "/");
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
                primaryTypographyProps={{ fontWeight: isActive ? 600 : 500, fontSize: "0.875rem" }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ p: 2, textAlign: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
        © {new Date().getFullYear()} Pensasha Houses
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
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

export default LandlordSidebar;
