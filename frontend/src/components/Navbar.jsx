import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2A2A2A' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side nav links */}
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/houses">Browse Houses</Button>
          <Button color="inherit" href="/list-property">List a Property</Button>
        </Box>

        {/* Center App Name */}
        <Typography variant="h6" sx={{ flexGrow: 0, fontWeight: 'bold' }}>
          Pensasha
        </Typography>

        {/* Right side login button */}
        <Box>
          <Button
            variant="contained"
            href="/login"
            sx={{
              backgroundColor: '#F8B500',
              color: '#111111',
              textTransform: 'none',
              fontWeight: '600',
              '&:hover': { backgroundColor: '#c59000' }
            }}
          >
            Login / Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
