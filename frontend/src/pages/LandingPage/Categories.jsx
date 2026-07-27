// src/pages/LandingPage/Categories.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Container,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  MeetingRoom as MeetingRoomIcon,
  Hotel as HotelIcon,
  Storefront as StorefrontIcon,
  Business as BusinessIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, label: 'Bedsitter', query: 'bedsitter', icon: <HotelIcon sx={{ fontSize: 36 }} /> },
  { id: 2, label: '1 Bedroom', query: '1-bedroom', icon: <MeetingRoomIcon sx={{ fontSize: 36 }} /> },
  { id: 3, label: '2 Bedroom', query: '2-bedroom', icon: <HomeIcon sx={{ fontSize: 36 }} /> },
  { id: 4, label: 'Hostel', query: 'hostel', icon: <ApartmentIcon sx={{ fontSize: 36 }} /> },
  { id: 5, label: 'Shop & Stall', query: 'shop-stall', icon: <StorefrontIcon sx={{ fontSize: 36 }} /> },
  { id: 6, label: 'Office', query: 'office', icon: <BusinessIcon sx={{ fontSize: 36 }} /> },
  { id: 7, label: 'Studio', query: 'studio', icon: <HotelIcon sx={{ fontSize: 36 }} /> },
  { id: 8, label: 'Commercial', query: 'commercial', icon: <BusinessIcon sx={{ fontSize: 36 }} /> },
];

function Categories() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: 'performance',
    slides: {
      perView: 5,
      spacing: 20,
    },
    breakpoints: {
      '(max-width: 1200px)': {
        slides: { perView: 4, spacing: 16 },
      },
      '(max-width: 900px)': {
        slides: { perView: 3, spacing: 14 },
      },
      '(max-width: 600px)': {
        slides: { perView: 2, spacing: 12 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <Box
      sx={{
        backgroundColor: '#F8FAFC',
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        {/* Header & Controls */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
          spacing={2}
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: '#B5922B',
                fontWeight: 700,
                letterSpacing: '0.15em',
                fontSize: '0.8rem',
              }}
            >
              EXPLORE OPTIONS
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 600,
                color: '#0F172A',
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                mt: 0.5,
              }}
            >
              Browse by Property Type
            </Typography>
          </Box>

          {/* Slider Navigation Arrows */}
          {loaded && instanceRef.current && (
            <Stack direction="row" spacing={1.5}>
              <IconButton
                onClick={() => instanceRef.current?.prev()}
                sx={{
                  color: '#0F172A',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  '&:hover': {
                    backgroundColor: '#F1F5F9',
                    borderColor: '#D4AF37',
                    color: '#B5922B',
                  },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={() => instanceRef.current?.next()}
                sx={{
                  color: '#0F172A',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  '&:hover': {
                    backgroundColor: '#F1F5F9',
                    borderColor: '#D4AF37',
                    color: '#B5922B',
                  },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>

        {/* Carousel Container */}
        <Box ref={sliderRef} className="keen-slider" sx={{ overflow: 'visible' }}>
          {categories.map((item) => (
            <Box className="keen-slider__slide" key={item.id} sx={{ py: 1 }}>
              <Card
                component={Link}
                to={`/properties?type=${item.query}`}
                sx={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 3,
                  height: 160,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: 'rgba(212, 175, 55, 0.6)',
                    boxShadow: '0 20px 35px -10px rgba(15, 23, 42, 0.12)',
                    '& .category-icon': {
                      color: '#B5922B',
                      transform: 'scale(1.12)',
                    },
                  },
                }}
              >
                <Box
                  className="category-icon"
                  sx={{
                    color: '#0F172A',
                    transition: 'all 0.3s ease',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1.5,
                    borderRadius: '12px',
                    backgroundColor: '#F8FAFC',
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: '#0F172A',
                    fontSize: '0.95rem',
                    textAlign: 'center',
                  }}
                >
                  {item.label}
                </Typography>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Carousel Pagination Dots */}
        {loaded && instanceRef.current && (
          <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 4 }}>
            {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
              <Box
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                sx={{
                  width: currentSlide === idx ? 28 : 8,
                  height: 8,
                  borderRadius: '4px',
                  backgroundColor: currentSlide === idx ? '#B5922B' : '#CBD5E1',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default Categories;