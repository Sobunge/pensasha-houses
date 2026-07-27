// src/components/Navbar.jsx
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
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../pages/Auth/AuthModal";

const navItems = [
  { label: "Home", link: "/", icon: <HomeOutlinedIcon /> },
  { label: "Browse Properties", link: "/properties", icon: <SearchOutlinedIcon /> },
  { label: "List a Property", icon: <AddBoxOutlinedIcon />, requiresAuth: true },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTiny = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();

  // WATCHER: Automatically open AuthModal if redirected from Forgot/Reset password
  useEffect(() => {
    if (location.state?.openLogin) {
      setAuthOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (!isMobile && mobileOpen) setMobileOpen(false);
  }, [isMobile, mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleAuthOpen = () => {
    setMobileOpen(false);
    setAuthOpen(true);
  };

  const handleAuthClose = () => setAuthOpen(false);

  // Desktop Navigation Link Styling
  const getButtonStyles = (link) => {
    const isActive = location.pathname === link;
    return {
      color: isActive ? "#D4AF37" : "#CBD5E1",
      textTransform: "none",
      fontWeight: isActive ? 600 : 500,
      fontSize: "0.95rem",
      position: "relative",
      px: 1.5,
      transition: "all 0.2s ease-in-out",
      "& .MuiButton-startIcon": {
        color: isActive ? "#D4AF37" : "#94A3B8",
        transition: "color 0.2s ease-in-out",
      },
      "&:hover": {
        color: "#D4AF37",
        backgroundColor: "transparent",
        "& .MuiButton-startIcon": {
          color: "#D4AF37",
        },
      },
      "&::after": isActive ? {
        content: '""',
        position: "absolute",
        bottom: 4,
        left: "12%",
        width: "76%",
        height: "2px",
        backgroundColor: "#D4AF37",
        borderRadius: "2px",
        boxShadow: "0 0 8px rgba(212, 175, 55, 0.6)",
      } : {},
    };
  };

  // Auth Link Styling (Matches regular nav links but with hover gold accents)
  const authLinkStyles = {
    color: "#CBD5E1",
    textTransform: "none",
    fontWeight: 500,
    fontSize: "0.95rem",
    px: 1.5,
    transition: "all 0.2s ease-in-out",
    "& .MuiButton-startIcon": {
      color: "#94A3B8",
      transition: "color 0.2s ease-in-out",
    },
    "&:hover": {
      color: "#D4AF37",
      backgroundColor: "transparent",
      "& .MuiButton-startIcon": {
        color: "#D4AF37",
      },
    },
  };

  // Mobile Drawer Styling
  const getDrawerItemStyles = (link) => {
    const isActive = location.pathname === link;
    return {
      px: 2.5,
      py: 1.5,
      mb: 1,
      borderRadius: 2,
      backgroundColor: isActive ? "rgba(212, 175, 55, 0.12)" : "transparent",
      color: isActive ? "#D4AF37" : "#94A3B8",
      fontWeight: isActive ? 600 : 500,
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "rgba(212, 175, 55, 0.08)",
        color: "#F8FAFC",
        transform: "translateX(4px)"
      },
    };
  };

  const drawerContent = (
    <Box
      sx={{
        width: 300,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "rgba(11, 15, 23, 0.96)",
        backdropFilter: "blur(20px)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
        px: 3,
        py: { xs: 3, md: 4 },
        boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.5)",
        color: "#fff",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none" }}
        >
          <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 32 }} />
          <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, color: "#fff" }}>
            Pensasha <Box component="span" sx={{ color: "#D4AF37", fontWeight: 400 }}>Houses</Box>
          </Typography>
        </Box>
        <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "#94A3B8", "&:hover": { color: "#fff" } }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)", mb: 3 }} />

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={item.requiresAuth ? "div" : RouterLink}
              to={item.requiresAuth ? undefined : item.link}
              onClick={item.requiresAuth ? handleAuthOpen : undefined}
              sx={getDrawerItemStyles(item.link)}
            >
              <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.link ? "#D4AF37" : "#94A3B8" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} disableTypography sx={{ fontSize: "0.95rem" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)", mb: 3 }} />

      <ListItem disablePadding>
        <ListItemButton
          onClick={handleAuthOpen}
          sx={{
            py: 1.5,
            borderRadius: 2,
            backgroundColor: "#D4AF37",
            justifyContent: "center",
            fontWeight: 600,
            color: "#0B0F17",
            boxShadow: "0 4px 14px rgba(212, 175, 55, 0.25)",
            "&:hover": { backgroundColor: "#B5922B" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 35 }}>
            <LoginIcon sx={{ color: "#0B0F17", fontSize: "1.2rem" }} />
          </ListItemIcon>
          <ListItemText primary="Login / Register" disableTypography sx={{ fontWeight: 600 }} />
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
          backgroundColor: "rgba(11, 15, 23, 0.75)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          flexShrink: 0
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              minHeight: { xs: 60, md: 72 }
            }}
          >
            {/* Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none" }}
            >
              <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: { xs: 28, md: 34 } }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  fontSize: { xs: "1.15rem", md: "1.35rem" }
                }}
              >
                Pensasha{!isTiny && <Box component="span" sx={{ color: "#D4AF37", fontWeight: 400 }}> Houses</Box>}
              </Typography>
            </Box>

            {/* Desktop Navigation */}
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

                {/* Vertical Divider separating main nav from auth links */}
                <Divider 
                  orientation="vertical" 
                  flexItem 
                  sx={{ borderColor: "rgba(255, 255, 255, 0.12)", my: 2, mx: 0.5 }} 
                />

                {/* Login & Register Link Group */}
                <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                  <Button
                    onClick={handleAuthOpen}
                    startIcon={<LoginOutlinedIcon sx={{ fontSize: "1.1rem !important" }} />}
                    sx={authLinkStyles}
                  >
                    Login
                  </Button>

                  <Button
                    onClick={handleAuthOpen}
                    startIcon={<PersonAddOutlinedIcon sx={{ fontSize: "1.1rem !important" }} />}
                    sx={authLinkStyles}
                  >
                    Register
                  </Button>
                </Box>
              </Box>
            ) : (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ color: "#F8FAFC", p: 1 }}
              >
                <MenuIcon fontSize="medium" />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Backdrop
        open={mobileOpen}
        onClick={() => setMobileOpen(false)}
        sx={{ zIndex: theme.zIndex.drawer - 1, backgroundColor: "rgba(0, 0, 0, 0.7)" }}
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