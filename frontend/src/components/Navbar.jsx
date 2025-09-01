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

const navItems = [
  { label: "Home", link: "/", icon: <HomeIcon /> },
  { label: "Browse Houses", link: "/houses", icon: <SearchIcon /> },
  { label: "List a Property", link: "/list-property", icon: <AddBoxIcon /> },
  { label: "Login / Sign Up", link: "/login", icon: <LoginIcon /> },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component="a"
            href={item.link}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 1,
              textDecoration: "none",
              color: "#111111",
              "&:hover": {
                backgroundColor: "#FFF6E0",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "#111111" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>

      {/* Drawer Footer (optional tagline) */}
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
                {navItems.slice(0, 3).map((item) => (
                  <Button
                    key={item.label}
                    href={item.link}
                    startIcon={item.icon}
                    sx={{
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: 500,
                      "&:hover": { color: "#f8b500" },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                {/* CTA Button */}
                <Button
                  variant="contained"
                  href={navItems[3].link}
                  startIcon={navItems[3].icon}
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
                  {navItems[3].label}
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
    </Box>
  );
}

export default Navbar;
