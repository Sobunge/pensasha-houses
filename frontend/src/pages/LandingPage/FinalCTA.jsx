import { Box, Typography, Button, Stack, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UploadHouseIcon from '@mui/icons-material/HouseOutlined';

function FinalCTA() {
  return (
    <Box
      sx={{
        backgroundColor: '#FFF3D0', // soft brand-inspired background
        py: 8,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        {/* Heading */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '28px', md: '36px' },
            color: '#111111', // dark text for contrast
          }}
        >
          Ready to Find or List a House?
        </Typography>

        {/* Subtext */}
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: '#2A2A2A', // softer gray for readability
            fontSize: { xs: '16px', md: '18px' },
          }}
        >
          Join hundreds of house seekers and property owners on{' '}
          <strong style={{ color: '#f8b500' }}>Pensasha</strong> today.
        </Typography>

        {/* CTA Buttons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          justifyContent="center"
        >
          <Button
            variant="outlined"
            href="/houses"
            startIcon={<SearchIcon />}
            sx={{
              borderColor: '#111111',
              color: '#111111',
              fontWeight: '600',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              '&:hover': { borderColor: '#f8b500', color: '#f8b500' },
            }}
          >
            Find a House
          </Button>

          <Button
            variant="contained"
            href="/list-property"
            startIcon={<UploadHouseIcon />}
            sx={{
              backgroundColor: '#f8b500',
              color: '#FFFFFF',
              fontWeight: '600',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#c59000' },
            }}
          >
            Post a Property
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default FinalCTA;
