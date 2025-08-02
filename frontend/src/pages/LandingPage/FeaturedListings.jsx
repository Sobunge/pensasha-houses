import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
} from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

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
    name: 'Studio Apartment',
    location: 'Nyalenda',
    price: 'Ksh 7,500/mo',
    image: '/assets/images/house4.jpg',
  },
  {
    id: 5,
    name: 'Furnished Bedsitter',
    location: 'Tom Mboya Estate',
    price: 'Ksh 10,000/mo',
    image: '/assets/images/house5.jpg',
  },
  {
    id: 6,
    name: 'Business Premise',
    location: 'Kibuye Market',
    price: 'Ksh 30,000/mo',
    image: '/assets/images/house6.jpg',
  },
  {
    id: 7,
    name: '1 Bedroom, Balcony',
    location: 'Mamboleo',
    price: 'Ksh 17,000/mo',
    image: '/assets/images/house7.jpg',
  },
  {
    id: 8,
    name: 'Office Space',
    location: 'Mega Plaza',
    price: 'Ksh 50,000/mo',
    image: '/assets/images/house8.jpg',
  },
];

function FeaturedListings() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 320; // amount to scroll in px

    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#F7F7F7',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: 8,
        px: { xs: 2, sm: 4 },
        position: 'relative',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 'bold', mb: 6, color: '#111' }}
      >
        Featured Listings
      </Typography>

      <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        {/* Left Scroll Button */}
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: '#fff',
            color: '#111',
            border: '1px solid #ddd',
            '&:hover': {
              backgroundColor: '#f8b500',
              color: '#fff',
            },
          }}
        >
          <ArrowBackIosNew fontSize="small" />
        </IconButton>

        {/* Scrollable Card List */}
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 3,
            px: 6,
            scrollBehavior: 'smooth',
            justifyContent: 'flex-start',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          {listings.map((listing) => (
            <Card
              key={listing.id}
              sx={{
                minWidth: 280,
                maxWidth: 280,
                flex: '0 0 auto',
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={listing.image}
                alt={listing.name}
              />
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {listing.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', my: 0.5 }}>
                  {listing.location}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#f8b500' }}>
                  {listing.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Right Scroll Button */}
        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: '#fff',
            color: '#111',
            border: '1px solid #ddd',
            '&:hover': {
              backgroundColor: '#f8b500',
              color: '#fff',
            },
          }}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      </Box>

      {/* CTA Button */}
      <Box textAlign="center" mt={6}>
        <Button
          variant="contained"
          href="/houses"
          sx={{
            backgroundColor: '#F8B500',
            color: '#111',
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#C59000',
            },
          }}
        >
          See All Listings
        </Button>
      </Box>
    </Box>
  );
}

export default FeaturedListings;
