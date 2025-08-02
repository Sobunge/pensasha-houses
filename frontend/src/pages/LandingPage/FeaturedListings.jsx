import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
} from '@mui/material';

const listings = [
  {
    id: 1,
    name: 'Modern Bedsitter',
    location: 'Kisumu CBD',
    price: 'Ksh 8,000/mo',
    image: '/assets/images/house1.jpg',
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
  {
    id: 4,
    name: 'Furnished Studio',
    location: 'Tom Mboya Estate',
    price: 'Ksh 10,000/mo',
    image: '/assets/images/house4.jpg',
  },
  {
    id: 5,
    name: 'Maisonette',
    location: 'Riat Hills',
    price: 'Ksh 35,000/mo',
    image: '/assets/images/house5.jpg',
  },
  {
    id: 6,
    name: 'Townhouse',
    location: 'Mamboleo',
    price: 'Ksh 40,000/mo',
    image: '/assets/images/house6.jpg',
  },
  {
    id: 7,
    name: 'Office Space',
    location: 'Mega Plaza',
    price: 'Ksh 25,000/mo',
    image: '/assets/images/house7.jpg',
  },
  {
    id: 8,
    name: 'Retail Stall',
    location: 'Oile Market',
    price: 'Ksh 5,000/mo',
    image: '/assets/images/house8.jpg',
  },
  {
    id: 9,
    name: 'Business Premise',
    location: 'Kondele',
    price: 'Ksh 18,000/mo',
    image: '/assets/images/house9.jpg',
  },
];

function FeaturedListings() {
  return (
    <Box sx={{ backgroundColor: '#F7F7F7', py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 'bold', mb: 4, color: '#111111' }}
        >
          Featured Listings
        </Typography>

        <Grid container spacing={4}>
          {listings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing.id}>
              <Card
                sx={{
                  height: 360, // 👈 fixed card height
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  image={listing.image}
                  alt={listing.name}
                  sx={{ height: 160, objectFit: 'cover' }} // 👈 fixed image height
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {listing.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
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
      </Container>
    </Box>
  );
}

export default FeaturedListings;
