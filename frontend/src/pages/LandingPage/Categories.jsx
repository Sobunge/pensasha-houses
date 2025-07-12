import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HotelIcon from '@mui/icons-material/Hotel';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BusinessIcon from '@mui/icons-material/Business';

const categories = [
  { id: 1, label: 'Bedsitter', icon: <HotelIcon sx={{ fontSize: 60 }} /> },
  { id: 2, label: '1 Bedroom', icon: <MeetingRoomIcon sx={{ fontSize: 60 }} /> },
  { id: 3, label: '2 Bedroom', icon: <HomeIcon sx={{ fontSize: 60 }} /> },
  { id: 4, label: 'Hostel', icon: <ApartmentIcon sx={{ fontSize: 60 }} /> },
  { id: 5, label: 'Shop & Stall', icon: <StorefrontIcon sx={{ fontSize: 60 }} /> },
  { id: 6, label: 'Office', icon: <BusinessIcon sx={{ fontSize: 60 }} /> },
];

function Categories() {
  return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 4, fontSize: { xs: '28px', md: '36px' }, color: '#111111' }}
      >
        Browse by Type
      </Typography>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((item) => (
            <Grid item key={item.id}>
              <Card
                sx={{
                  width: 200,
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#FFF3D0',
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                {item.icon}
                <CardContent>
                  <Typography variant="body1" sx={{ fontWeight: '600' }}>
                    {item.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Categories;
