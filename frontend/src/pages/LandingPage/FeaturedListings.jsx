import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Container,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box
      sx={{
        backgroundColor: '#F9FAFB',
        py: { xs: 6, md: 10 },
        minHeight: '80vh',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
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

        {/* Navigation Buttons */}
        <IconButton
          onClick={() => sliderRef.current?.slickPrev()}
          sx={{
            position: 'absolute',
            top: '50%',
            left: { xs: 5, sm: 10 },
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: '#fff',
            boxShadow: 3,
            '&:hover': { backgroundColor: '#F3F4F6' },
            width: 40,
            height: 40,
          }}
        >
          <ArrowBackIos fontSize="small" />
        </IconButton>

        <IconButton
          onClick={() => sliderRef.current?.slickNext()}
          sx={{
            position: 'absolute',
            top: '50%',
            right: { xs: 5, sm: 10 },
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: '#fff',
            boxShadow: 3,
            '&:hover': { backgroundColor: '#F3F4F6' },
            width: 40,
            height: 40,
          }}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton>

        {/* Slider */}
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Slider ref={sliderRef} {...settings}>
            {listings.map((listing) => (
              <Box key={listing.id} px={1} py={2}>
                <Card
                  sx={{
                    borderRadius: 4,
                    height: 380,
                    maxWidth: 340,
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 3,
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
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        {listing.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {listing.location}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {listing.price}
                      </Typography>
                    </Box>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          backgroundColor: '#3B82F6',
                          '&:hover': { backgroundColor: '#2563EB' },
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedListings;
