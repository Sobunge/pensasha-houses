import { Box, Typography, Button, Stack, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // For "Find a House"
import UploadHouseIcon from '@mui/icons-material/HouseOutlined'; // For "Post a Property"

function FinalCTA() {
  return (
    <Box
      sx={{
        backgroundColor: '#2A2A2A',
        color: '#FFFFFF',
        py: 8,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '28px', md: '36px' } }}
        >
          Ready to Find or List a House?
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 4, color: '#CCCCCC', fontSize: { xs: '16px', md: '18px' } }}
        >
          Join hundreds of house seekers and property owners on Pensasha today.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
          <Button
            variant="contained"
            href="/houses"
            startIcon={<SearchIcon />}
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#111111',
              fontWeight: '600',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#F7F7F7' },
            }}
          >
            Find a House
          </Button>

          <Button
            variant="contained"
            href="/list-property"
            startIcon={<UploadHouseIcon />}
            sx={{
              backgroundColor: '#F8B500',
              color: '#FFFFFF',
              fontWeight: '600',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#C59000' },
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
