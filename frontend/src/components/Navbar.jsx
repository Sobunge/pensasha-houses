import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LoginIcon from "@mui/icons-material/Login";
import { useLocation } from "react-router-dom";
import AuthModal from "../pages/Auth/AuthModal";

// Navigation items for desktop links
const navItems = [
  { label: "Home", link: "/", icon: <HomeIcon /> },
  { label: "Browse Properties", link: "/properties", icon: <SearchIcon /> },
  // Remove link, handle via modal
  { label: "List a Property", icon: <AddBoxIcon />, requiresAuth: true },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleAuthOpen = () => setAuthOpen(true);
  const handleAuthClose = () => setAuthOpen(false);

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#f7f7f7" }}
    >
      {/* Logo */}
      <Box
        component="a"
        href="/"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          p: 2,
          textDecoration: "none",
        }}
      >
        <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 30 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#111111" }}>
          Pensasha Houses
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            button
            onClick={item.requiresAuth ? handleAuthOpen : undefined}
            component={item.requiresAuth ? "div" : "a"}
            href={!item.requiresAuth ? item.link : undefined}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 1,
              textDecoration: "none",
              color: location.pathname === item.link ? "#f8b500" : "#111111",
              fontWeight: location.pathname === item.link ? 600 : 400,
              "&:hover": { backgroundColor: "#FFF6E0" },
            }}
          >
            <ListItemIcon
              sx={{ minWidth: 40, color: location.pathname === item.link ? "#f8b500" : "#111111" }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

        {/* Always show Login / Sign Up */}
        <ListItem button onClick={handleAuthOpen}>
          <ListItemIcon><LoginIcon /></ListItemIcon>
          <ListItemText primary="Login / Sign Up" />
        </ListItem>
      </List>

      <Box sx={{ p: 2, textAlign: "center", fontSize: "0.8rem", color: "#777" }}>
        © {new Date().getFullYear()} Pensasha Houses
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={1} sx={{ backgroundColor: "#2A2A2A" }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", minHeight: { xs: 56, md: 56 } }}>
            {/* Logo */}
            <Box
              component="a"
              href="/"
              sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}
            >
              <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 32 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#ffffff" }}>
                Pensasha Houses
              </Typography>
            </Box>

            {/* Desktop Menu */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    href={item.requiresAuth ? undefined : item.link}
                    onClick={item.requiresAuth ? handleAuthOpen : undefined}
                    startIcon={item.icon}
                    sx={{
                      color: location.pathname === item.link ? "#f8b500" : "#ffffff",
                      textTransform: "none",
                      fontWeight: location.pathname === item.link ? 600 : 500,
                      "&:hover": { color: "#f8b500" },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                <Button
                  variant="contained"
                  startIcon={<LoginIcon />}
                  onClick={handleAuthOpen}
                  sx={{
                    backgroundColor: "#f8b500",
                    color: "#111111",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 2.5,
                    "&:hover": { backgroundColor: "#c59000" },
                  }}
                >
                  Login / Sign Up
                </Button>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ "& .MuiDrawer-paper": { width: 260, backgroundColor: "#f7f7f7" } }}
      >
        {drawer}
      </Drawer>

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={handleAuthClose} />
    </Box>
  );
}

export default Navbar;
