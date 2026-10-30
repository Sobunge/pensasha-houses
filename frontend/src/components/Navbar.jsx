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
  const [authTab, setAuthTab] = useState(0); // 0 = Login, 1 = Register

  const theme = useTheme();
  // Changed from "md" to "lg" so it collapses at large screens and below
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isTiny = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();

  // WATCHER: Automatically open AuthModal if redirected from Forgot/Reset password
  useEffect(() => {
    if (location.state?.openLogin) {
      setAuthTab(0);
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

  const handleAuthOpen = (tabIndex = 0) => {
    setMobileOpen(false);
    setAuthTab(tabIndex);
    setAuthOpen(true);
  };

  const handleAuthClose = () => setAuthOpen(false);

  // Desktop Navigation Link Styling
  const getButtonStyles = (link) => (theme) => {
    const isActive = location.pathname === link;
    return {
      color: isActive ? theme.palette.secondary.main : theme.palette.text.secondary,
      textTransform: "none",
      fontWeight: isActive ? 600 : 500,
      fontSize: "0.95rem",
      position: "relative",
      px: 1.5,
      transition: "all 0.2s ease-in-out",
      "& .MuiButton-startIcon": {
        color: isActive ? theme.palette.secondary.main : theme.palette.text.secondary,
        transition: "color 0.2s ease-in-out",
      },
      "&:hover": {
        color: theme.palette.secondary.main,
        backgroundColor: "transparent",
        "& .MuiButton-startIcon": {
          color: theme.palette.secondary.main,
        },
      },
      "&::after": isActive ? {
        content: '""',
        position: "absolute",
        bottom: 4,
        left: "12%",
        width: "76%",
        height: "2px",
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "2px",
        boxShadow: `0 0 8px ${theme.palette.secondary.main}99`,
      } : {},
    };
  };

  // Auth Link Styling
  const authLinkStyles = (theme) => ({
    color: theme.palette.text.secondary,
    textTransform: "none",
    fontWeight: 500,
    fontSize: "0.95rem",
    px: 1.5,
    transition: "all 0.2s ease-in-out",
    "& .MuiButton-startIcon": {
      color: theme.palette.text.secondary,
      transition: "color 0.2s ease-in-out",
    },
    "&:hover": {
      color: theme.palette.secondary.main,
      backgroundColor: "transparent",
      "& .MuiButton-startIcon": {
        color: theme.palette.secondary.main,
      },
    },
  });

  const drawerContent = (
    <Box
      sx={(theme) => ({
        width: 300,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: `${theme.palette.primary.main}F5`,
        backdropFilter: "blur(20px)",
        borderLeft: `1px solid ${theme.palette.common.white}14`,
        px: 3,
        py: { xs: 3, md: 4 },
        boxShadow: `-10px 0 30px ${theme.palette.primary.main}80`,
        color: theme.palette.primary.contrastText,
      })}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none" }}
        >
          <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: 32 }} />
          <Typography variant="h6" sx={(theme) => ({ fontWeight: 600, color: theme.palette.primary.contrastText })}>
            Pensasha <Box component="span" sx={(theme) => ({ color: theme.palette.secondary.main, fontWeight: 400 })}>Houses</Box>
          </Typography>
        </Box>
        <IconButton onClick={() => setMobileOpen(false)} sx={(theme) => ({ color: theme.palette.text.secondary, "&:hover": { color: theme.palette.primary.contrastText } })}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={(theme) => ({ borderColor: `${theme.palette.common.white}14`, mb: 3 })} />

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.link;
          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={item.requiresAuth ? "div" : RouterLink}
                to={item.requiresAuth ? undefined : item.link}
                onClick={item.requiresAuth ? () => handleAuthOpen(0) : undefined}
                sx={(theme) => ({
                  px: 2.5,
                  py: 1.5,
                  mb: 1,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  backgroundColor: isActive ? `${theme.palette.secondary.main}1F` : "transparent",
                  color: isActive ? theme.palette.secondary.main : theme.palette.text.secondary,
                  fontWeight: isActive ? 600 : 500,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: `${theme.palette.secondary.main}14`,
                    color: theme.palette.primary.contrastText,
                    transform: "translateX(4px)"
                  },
                })}
              >
                <ListItemIcon sx={(theme) => ({ minWidth: 40, color: isActive ? theme.palette.secondary.main : theme.palette.text.secondary })}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} disableTypography sx={{ fontSize: "0.95rem" }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={(theme) => ({ borderColor: `${theme.palette.common.white}14`, mb: 3 })} />

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => handleAuthOpen(0)}
          sx={(theme) => ({
            py: 1.5,
            borderRadius: `${theme.shape.borderRadius}px`,
            backgroundColor: theme.palette.secondary.main,
            justifyContent: "center",
            fontWeight: 600,
            color: theme.palette.primary.main,
            boxShadow: `0 4px 14px ${theme.palette.secondary.main}40`,
            "&:hover": { backgroundColor: theme.palette.secondary.dark },
          })}
        >
          <ListItemIcon sx={{ minWidth: 35 }}>
            <LoginIcon sx={(theme) => ({ color: theme.palette.primary.main, fontSize: "1.2rem" })} />
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
        sx={(theme) => ({
          backgroundColor: `${theme.palette.primary.main}BF`, // ~75% obsidian
          backdropFilter: "blur(16px)",
          flexShrink: 0,
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg, ${theme.palette.secondary.main}00 0%, ${theme.palette.secondary.main}99 50%, ${theme.palette.secondary.main}00 100%)`,
            pointerEvents: "none",
          },
        })}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              minHeight: { xs: 60, lg: 72 }
            }}
          >
            {/* Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none" }}
            >
              <Box component="img" src="/assets/images/logo.svg" alt="Pensasha Logo" sx={{ height: { xs: 28, lg: 34 } }} />
              <Typography
                variant="h6"
                sx={(theme) => ({
                  fontWeight: 600,
                  color: theme.palette.primary.contrastText,
                  letterSpacing: "-0.02em",
                  fontSize: { xs: "1.15rem", lg: "1.35rem" }
                })}
              >
                Pensasha{!isTiny && <Box component="span" sx={(theme) => ({ color: theme.palette.secondary.main, fontWeight: 400 })}> Houses</Box>}
              </Typography>
            </Box>

            {/* Desktop Navigation (Visible on lg and up) */}
            {!isMobile ? (
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={item.requiresAuth ? "button" : RouterLink}
                    to={item.requiresAuth ? undefined : item.link}
                    onClick={item.requiresAuth ? () => handleAuthOpen(0) : undefined}
                    startIcon={item.icon}
                    sx={getButtonStyles(item.link)}
                  >
                    {item.label}
                  </Button>
                ))}

                <Divider 
                  orientation="vertical" 
                  flexItem 
                  sx={(theme) => ({ borderColor: `${theme.palette.common.white}1F`, my: 2, mx: 0.5 })} 
                />

                <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                  <Button
                    onClick={() => handleAuthOpen(0)}
                    startIcon={<LoginOutlinedIcon sx={{ fontSize: "1.1rem !important" }} />}
                    sx={authLinkStyles}
                  >
                    Login
                  </Button>

                  <Button
                    onClick={() => handleAuthOpen(1)}
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
                sx={(theme) => ({
                  color: theme.palette.primary.contrastText,
                  p: 1,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  border: `1px solid ${theme.palette.common.white}14`,
                  "&:hover": {
                    backgroundColor: `${theme.palette.secondary.main}1A`,
                    borderColor: theme.palette.secondary.main,
                  },
                })}
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
        sx={(theme) => ({ zIndex: theme.zIndex.drawer - 1, backgroundColor: "rgba(0, 0, 0, 0.7)" })}
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

      <AuthModal open={authOpen} onClose={handleAuthClose} initialTab={authTab} />
    </>
  );
}

export default Navbar;