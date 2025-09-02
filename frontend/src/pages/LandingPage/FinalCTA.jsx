import { Box, Typography, Button, Stack, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UploadHouseIcon from '@mui/icons-material/HouseOutlined';

const FinalCTA = ({ handleAuthOpen }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#FFF3D0',
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
            color: '#111111',
          }}
        >
          Ready to Find or List a House?
        </Typography>

        {/* Subtext */}
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: '#2A2A2A',
            fontSize: { xs: '16px', md: '18px' },
          }}
        >
          Join hundreds of house seekers and property owners on{' '}
          <Box component="span" sx={{ color: '#f8b500', fontWeight: 'bold' }}>
            Pensasha
          </Box>{' '}
          today.
        </Typography>

        {/* CTA Buttons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          justifyContent="center"
        >
          <Button
            variant="outlined"
            href="/properties"
            startIcon={<SearchIcon />}
            sx={{
              borderColor: '#111111',
              color: '#111111',
              fontWeight: 600,
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
            startIcon={<UploadHouseIcon />}
            onClick={handleAuthOpen}
            sx={{
              backgroundColor: '#f8b500',
              color: '#FFFFFF',
              fontWeight: 600,
              textTransform: 'none',
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#c59000' },
            }}
          >
            List a Property
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default FinalCTA;
