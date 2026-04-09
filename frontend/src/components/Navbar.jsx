import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Container,
  useMediaQuery,
  useTheme,
  Slide,
  Backdrop,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LoginIcon from "@mui/icons-material/Login";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AuthModal from "../pages/Auth/AuthModal";

const navItems = [
  { label: "Home", link: "/", icon: <HomeIcon /> },
  { label: "Browse Properties", link: "/properties", icon: <SearchIcon /> },
  { label: "List a Property", icon: <AddBoxIcon />, requiresAuth: true },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTiny = useMediaQuery(theme.breakpoints.down("sm")); // Check for very small phones
  const location = useLocation();

  useEffect(() => {
    if (!isMobile && mobileOpen) setMobileOpen(false);
  }, [isMobile, mobileOpen]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleAuthOpen = () => setAuthOpen(true);
  const handleAuthClose = () => setAuthOpen(false);

  const getButtonStyles = (link) => ({
    color: location.pathname === link ? "#F8B500" : "#fff",
    textTransform: "none",
    fontWeight: location.pathname === link ? 600 : 500,
    "&:hover": { color: "#F8B500" },
  });

  const getDrawerItemStyles = (link) => ({
    px: 3,
    py: 1.5,
    mb: 1,
    borderRadius: 2,
    backgroundColor: location.pathname === link ? "rgba(248,181,0,0.15)" : "transparent",
    color: location.pathname === link ? "#F8B500" : "#fff",
    fontWeight: location.pathname === link ? 600 : 500,
    transition: "all 0.3s ease",
    "&:hover": { backgroundColor: "rgba(248,181,0,0.12)", transform: "translateX(2px)" },
  });

  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "rgba(30, 30, 30, 0.9)", // Increased opacity for better legibility
        backdropFilter: "blur(12px)",
        px: 3,
        py: { xs: 2, md: 4 }, // Responsive vertical padding
        boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
        color: "#fff",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}
        >
          <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#F8B500" }}>
            Pensasha
          </Typography>
        </Box>
        <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={item.requiresAuth ? "div" : RouterLink}
              to={item.requiresAuth ? undefined : item.link}
              onClick={item.requiresAuth ? handleAuthOpen : () => setMobileOpen(false)}
              sx={getDrawerItemStyles(item.link)}
            >
              <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.link ? "#F8B500" : "#fff" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

      <ListItem disablePadding>
        <ListItemButton
          onClick={handleAuthOpen}
          sx={{
            py: 1.5,
            borderRadius: 2,
            backgroundColor: "#F8B500",
            justifyContent: "center",
            fontWeight: 700,
            color: "#111",
            "&:hover": { backgroundColor: "#e0a400" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 35 }}>
            <LoginIcon sx={{ color: "#111" }} />
          </ListItemIcon>
          <ListItemText primary="Login / Sign Up" />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0} 
        sx={{ 
          backgroundColor: "rgba(42, 42, 42, 0.9)", 
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          flexShrink: 0 // Prevent the navbar from squishing
        }}
      >
        <Container maxWidth="lg">
          <Toolbar 
            disableGutters 
            sx={{ 
              justifyContent: "space-between", 
              minHeight: { xs: 56, md: 64 } // Responsive height
            }}
          >
            <Box 
              component={RouterLink} 
              to="/" 
              sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none" }}
            >
              <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: { xs: 28, md: 32 } }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  color: "#fff", 
                  letterSpacing: "-0.5px",
                  fontSize: { xs: "1.1rem", md: "1.25rem" }
                }}
              >
                Pensasha{!isTiny && " Houses"}
              </Typography>
            </Box>

            {!isMobile ? (
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={item.requiresAuth ? "button" : RouterLink}
                    to={item.requiresAuth ? undefined : item.link}
                    onClick={item.requiresAuth ? handleAuthOpen : undefined}
                    startIcon={item.icon}
                    sx={getButtonStyles(item.link)}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button
                  variant="contained"
                  onClick={handleAuthOpen}
                  sx={{
                    ml: 1,
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "8px",
                    backgroundColor: "#F8B500",
                    color: "#111",
                    "&:hover": { backgroundColor: "#e0a400" },
                  }}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ p: 1 }}>
                <MenuIcon fontSize="medium" />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Backdrop
        open={mobileOpen}
        onClick={() => setMobileOpen(false)}
        sx={{ zIndex: theme.zIndex.drawer - 1, backgroundColor: "rgba(0,0,0,0.5)" }}
      />
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ sx: { border: "none", bgcolor: "transparent", boxShadow: "none" } }}
      >
        <Slide direction="left" in={mobileOpen} mountOnEnter unmountOnExit>
          <Box>{drawerContent}</Box>
        </Slide>
      </Drawer>

      <AuthModal open={authOpen} onClose={handleAuthClose} />
    </>
  );
}

export default Navbar;