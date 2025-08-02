import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Link } from 'react-router-dom';

const listings = [
  { id: 1, name: 'Modern Bedsitter', location: 'Kisumu CBD', price: 'Ksh 8,000/mo', image: '/assets/images/house.jpg' },
  { id: 2, name: '1 Bedroom Apartment', location: 'Milimani, Kisumu', price: 'Ksh 15,000/mo', image: '/assets/images/house.jpg' },
  { id: 3, name: '2 Bedroom House', location: 'Nyamasaria', price: 'Ksh 20,000/mo', image: '/assets/images/house.jpg' },
  { id: 4, name: 'Studio Flat', location: 'Tom Mboya Estate', price: 'Ksh 10,000/mo', image: '/assets/images/house.jpg' },
  { id: 5, name: 'Office Space', location: 'Mega Plaza, Kisumu', price: 'Ksh 30,000/mo', image: '/assets/images/house.jpg' },
  { id: 6, name: 'Retail Shop', location: 'Oginga Street', price: 'Ksh 25,000/mo', image: '/assets/images/house.jpg' },
  { id: 7, name: 'Shared Apartment', location: 'Lolwe Estate', price: 'Ksh 12,000/mo', image: '/assets/images/house.jpg' },
  { id: 8, name: 'Business Premise', location: 'Kondele', price: 'Ksh 40,000/mo', image: '/assets/images/house.jpg' },
];

const FeaturedListings = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: 'performance',
    slides: {
      perView: 3,
      spacing: 16,
    },
    breakpoints: {
      '(max-width: 1200px)': {
        slides: { perView: 2, spacing: 12 },
      },
      '(max-width: 768px)': {
        slides: { perView: 1, spacing: 8 },
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <Box sx={{ backgroundColor: '#F9FAFB', py: { xs: 6, md: 10 } }}>
      <Container>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            color: '#111827',
            mb: { xs: 4, md: 6 },
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Featured Listings
        </Typography>

        <Box ref={sliderRef} className="keen-slider">
          {listings.map((listing) => (
            <Box className="keen-slider__slide" key={listing.id}>
              <Card
                sx={{
                  maxWidth: 320,
                  height: 400,
                  mx: 'auto',
                  my: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 3,
                  borderRadius: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={listing.image}
                  alt={listing.name}
                  height="180"
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <HomeIcon fontSize="small" />
                      {listing.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PlaceIcon fontSize="small" />
                      {listing.location}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoneyIcon fontSize="small" />
                      {listing.price}
                    </Typography>
                  </Box>

                  <Box mt={2}>
                    <Button
                      component={Link}
                      to={`/listing/${listing.id}`}
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        backgroundColor: '#3B82F6',
                        '&:hover': { backgroundColor: '#2563EB' },
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedListings;
