import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
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
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold' }}>
        Pensasha
      </Typography>
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
            <ListItemText primary={item.label} sx={{ color: '#111111' }} />
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
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              Pensasha
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <Button color="inherit" href="/">Home</Button>
                <Button color="inherit" href="/houses">Browse Houses</Button>
                <Button color="inherit" href="/list-property">List a Property</Button>
                <Button
                  variant="contained"
                  href="/login"
                  sx={{
                    backgroundColor: '#F8B500',
                    color: '#111111',
                    textTransform: 'none',
                    fontWeight: '600',
                    '&:hover': { backgroundColor: '#c59000' },
                  }}
                >
                  Login / Sign Up
                </Button>
              </Box>
            )}

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
