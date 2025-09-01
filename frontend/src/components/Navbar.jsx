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
  Modal,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LoginIcon from "@mui/icons-material/Login";
import { useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", link: "/", icon: <HomeIcon /> },
  { label: "Browse Houses", link: "/houses", icon: <SearchIcon /> },
  { label: "List a Property", link: "/list-property", icon: <AddBoxIcon /> },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleAuthOpen = () => setAuthOpen(true);
  const handleAuthClose = () => setAuthOpen(false);

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f7f7f7",
      }}
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
        <Box
          component="img"
          src="/assets/images/logo.svg"
          alt="Pensasha Logo"
          sx={{ height: 30 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#111111" }}>
          Pensasha Houses
        </Typography>
      </Box>

      <Divider />

      {/* Drawer Nav Items */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.link;
          return (
            <ListItem
              key={item.label}
              component="a"
              href={item.link}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 1,
                textDecoration: "none",
                color: isActive ? "#f8b500" : "#111111",
                fontWeight: isActive ? 700 : 400,
                backgroundColor: isActive ? "#FFF6E0" : "transparent",
                "&:hover": {
                  backgroundColor: "#FFF6E0",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActive ? "#f8b500" : "#111111",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
      </List>

      {/* Drawer Footer */}
      <Box sx={{ p: 2, textAlign: "center", fontSize: "0.8rem", color: "#777" }}>
        © {new Date().getFullYear()} Pensasha Houses
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          backgroundColor: "#2A2A2A",
          backdropFilter: "blur(6px)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <Box
              component="a"
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src="/assets/images/logo.svg"
                alt="Pensasha Logo"
                sx={{ height: 32 }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#ffffff" }}
              >
                Pensasha Houses
              </Typography>
            </Box>

            {/* Desktop Menu */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 3 }}>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.link;
                  return (
                    <Button
                      key={item.label}
                      href={item.link}
                      startIcon={item.icon}
                      sx={{
                        color: isActive ? "#f8b500" : "#ffffff",
                        fontWeight: isActive ? 700 : 500,
                        textTransform: "none",
                        borderBottom: isActive ? "2px solid #f8b500" : "none",
                        "&:hover": { color: "#f8b500" },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}

                {/* CTA Auth Button */}
                <Button
                  variant="contained"
                  onClick={handleAuthOpen}
                  startIcon={<LoginIcon />}
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
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
                aria-label="open navigation menu"
              >
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
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
            backgroundColor: "#f7f7f7",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Auth Modal */}
      <Modal open={authOpen} onClose={handleAuthClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
            maxWidth: "90%",
          }}
        >
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            centered
            sx={{ mb: 3 }}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          {/* Login Form */}
          {tab === 0 && (
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField label="Email" type="email" fullWidth />
              <TextField label="Password" type="password" fullWidth />
              <Button variant="contained" fullWidth sx={{ backgroundColor: "#f8b500", "&:hover": { backgroundColor: "#c59000" } }}>
                Login
              </Button>
              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                Forgot password?
              </Typography>
            </Box>
          )}

          {/* Sign Up Form */}
          {tab === 1 && (
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField label="Full Name" fullWidth />
              <TextField label="Email" type="email" fullWidth />
              <TextField label="Password" type="password" fullWidth />
              <Button variant="contained" fullWidth sx={{ backgroundColor: "#f8b500", "&:hover": { backgroundColor: "#c59000" } }}>
                Create Account
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default Navbar;
