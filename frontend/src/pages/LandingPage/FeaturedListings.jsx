import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';

const listings = [
  {
    id: 1,
    name: 'Modern Bedsitter',
    location: 'Kisumu CBD',
    price: 'Ksh 8,000/mo',
    image: '/assets/images/house1.jpg', // adjust path as needed
  },
  {
    id: 2,
    name: '1 Bedroom Apartment',
    location: 'Milimani, Kisumu',
    price: 'Ksh 15,000/mo',
    image: '/assets/images/house2.jpg',
  },
  {
    id: 3,
    name: '2 Bedroom House',
    location: 'Nyamasaria',
    price: 'Ksh 20,000/mo',
    image: '/assets/images/house3.jpg',
  },
];

function FeaturedListings() {
  return (
    <Box sx={{ backgroundColor: '#F7F7F7', py: 8 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 'bold', mb: 4, color: '#111111' }}
      >
        Featured Listings
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {listings.map((listing) => (
          <Grid item xs={12} sm={6} md={4} key={listing.id}>
            <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={listing.image}
                alt={listing.name}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {listing.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {listing.location}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '600' }}>
                  {listing.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={6}>
        <Button
          variant="contained"
          href="/houses"
          sx={{
            backgroundColor: '#F8B500',
            color: '#111111',
            textTransform: 'none',
            fontWeight: '600',
            px: 4,
            py: 1.5,
            '&:hover': { backgroundColor: '#C59000' },
          }}
        >
          See All Listings
        </Button>
      </Box>
    </Box>
  );
}

export default FeaturedListings;
