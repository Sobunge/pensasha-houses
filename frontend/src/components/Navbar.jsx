import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2A2A2A' }}>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo / App Name on the left */}
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Pensasha
          </Typography>

          {/* All other links on the right */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
                '&:hover': { backgroundColor: '#c59000' }
              }}
            >
              Login / Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
