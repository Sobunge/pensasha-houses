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
        bgcolor: "rgba(30, 30, 30, 0.71)",
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        px: 3,
        py: 4,
        boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* Logo + Close */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}
        >
          <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 36 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#F8B500" }}>
            Pensasha
          </Typography>
        </Box>
        <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 3 }} />

      {/* Navigation items */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            {item.requiresAuth ? (
              <ListItemButton onClick={handleAuthOpen} sx={getDrawerItemStyles(item.link)}>
                <ListItemIcon
                  sx={{ minWidth: 40, color: location.pathname === item.link ? "#F8B500" : "#fff" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ) : (
              <ListItemButton
                component={RouterLink}
                to={item.link}
                sx={getDrawerItemStyles(item.link)}
                onClick={() => setMobileOpen(false)}
              >
                <ListItemIcon
                  sx={{ minWidth: 40, color: location.pathname === item.link ? "#F8B500" : "#fff" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 3 }} />

      {/* Login Button */}
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleAuthOpen}
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: 2,
            backgroundColor: "rgba(248,181,0,0.15)",
            justifyContent: "center",
            fontWeight: 600,
            color: "#F8B500",
            "&:hover": { backgroundColor: "rgba(248,181,0,0.25)", transform: "translateX(2px)" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 35 }}>
            <LoginIcon sx={{ color: "#F8B500" }} />
          </ListItemIcon>
          <ListItemText primary="Login / Sign Up" />
        </ListItemButton>
      </ListItem>

      <Typography variant="caption" sx={{ textAlign: "center", mt: 6, color: "#fff", opacity: 0.7 }}>
        Swipe or tap outside to close
      </Typography>
    </Box>
  );

  return (
    <>
      {/* AppBar */}
      <AppBar position="fixed" elevation={2} sx={{ backgroundColor: "rgba(42,42,42,0.9)", backdropFilter: "blur(6px)" }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", minHeight: 64 }}>
            <Box component={RouterLink} to="/" sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}>
              <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 32 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
                Pensasha Houses
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {navItems.map((item) => (
                  item.requiresAuth ? (
                    <Button
                      key={item.label}
                      onClick={handleAuthOpen}
                      startIcon={item.icon}
                      sx={getButtonStyles(item.link)}
                    >
                      {item.label}
                    </Button>
                  ) : (
                    <Button
                      key={item.label}
                      component={RouterLink}
                      to={item.link}
                      startIcon={item.icon}
                      sx={getButtonStyles(item.link)}
                    >
                      {item.label}
                    </Button>
                  )
                ))}
                <Button
                  variant="contained"
                  startIcon={<LoginIcon />}
                  onClick={handleAuthOpen}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    backgroundColor: "#F8B500",
                    color: "#111",
                    "&:hover": { backgroundColor: "#c59000" },
                  }}
                >
                  Login / Sign Up
                </Button>
              </Box>
            )}

            {isMobile && (
              <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer */}
      <Backdrop
        open={mobileOpen}
        onClick={() => setMobileOpen(false)}
        sx={{ zIndex: theme.zIndex.drawer - 1, backgroundColor: "rgba(0,0,0,0.25)" }}
      />
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ sx: { border: "none", boxShadow: "none", bgcolor: "transparent" } }}
      >
        <Slide direction="left" in={mobileOpen} mountOnEnter unmountOnExit>
          {drawerContent}
        </Slide>
      </Drawer>

      <AuthModal open={authOpen} onClose={handleAuthClose} />
    </>
  );
}

export default Navbar;