import React, { useState } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LoginIcon from '@mui/icons-material/Login';

const navItems = [
  { label: 'Home', link: '/', icon: <HomeIcon /> },
  { label: 'Browse Houses', link: '/houses', icon: <SearchIcon /> },
  { label: 'List a Property', link: '/list-property', icon: <AddBoxIcon /> },
  { label: 'Login / Sign Up', link: '/login', icon: <LoginIcon /> },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        height: '100%',
        backgroundColor: '#F5F5F5',
        color: '#111111',
        paddingTop: 2,
      }}
    >
      <Box
        component="a"
        href="/"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          gap: 1,
          textDecoration: 'none',
        }}
      >
        <Box
          component="img"
          src="/assets/images/logo.svg"
          alt="Pensasha Logo"
          sx={{ height: 30 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#000000' }}>
          Pensasha Houses
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.label}
            component="a"
            href={item.link}
            sx={{
              '&:hover': {
                backgroundColor: '#FFF3CD',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#111111', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{ color: '#111111' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#2A2A2A' }}>
        <Container>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Logo + Text */}
            <Box
              component="a"
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
              }}
            >
              <Box
                component="img"
                src="/assets/images/logo.svg"
                alt="Pensasha Logo"
                sx={{ height: 30 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#ffffff' }}>
                Pensasha Houses
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: '20px' }}>
                {navItems.slice(0, 3).map((item) => (
                  <Button
                    key={item.label}
                    color="inherit"
                    href={item.link}
                    startIcon={item.icon}
                    sx={{ textTransform: 'none', fontWeight: 500 }}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button
                  variant="contained"
                  href={navItems[3].link}
                  startIcon={navItems[3].icon}
                  sx={{
                    backgroundColor: '#F8B500',
                    color: '#111111',
                    textTransform: 'none',
                    fontWeight: '600',
                    '&:hover': { backgroundColor: '#c59000' },
                  }}
                >
                  {navItems[3].label}
                </Button>
              </Box>
            )}

            {/* Mobile Toggle Icon */}
            {isMobile && (
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 2 }}
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
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 250,
            backgroundColor: '#F5F5F5',
            color: '#111111',
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navbar;
