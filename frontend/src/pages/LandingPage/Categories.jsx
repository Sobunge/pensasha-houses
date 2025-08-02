import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
} from '@mui/material';
import {
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  MeetingRoom as MeetingRoomIcon,
  Hotel as HotelIcon,
  Storefront as StorefrontIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useEffect } from 'react';

const categories = [
  { id: 1, label: 'Bedsitter', icon: <HotelIcon sx={{ fontSize: 60 }} /> },
  { id: 2, label: '1 Bedroom', icon: <MeetingRoomIcon sx={{ fontSize: 60 }} /> },
  { id: 3, label: '2 Bedroom', icon: <HomeIcon sx={{ fontSize: 60 }} /> },
  { id: 4, label: 'Hostel', icon: <ApartmentIcon sx={{ fontSize: 60 }} /> },
  { id: 5, label: 'Shop & Stall', icon: <StorefrontIcon sx={{ fontSize: 60 }} /> },
  { id: 6, label: 'Office', icon: <BusinessIcon sx={{ fontSize: 60 }} /> },
  { id: 7, label: 'Studio', icon: <HotelIcon sx={{ fontSize: 60 }} /> },
  { id: 8, label: 'Commercial', icon: <BusinessIcon sx={{ fontSize: 60 }} /> },
];

function Categories() {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    renderMode: 'performance',
    mode: 'free-snap',
    slides: {
      origin: 'center',
      perView: 1,
      spacing: 15,
    },
    breakpoints: {
      '(min-width: 600px)': {
        slides: {
          perView: 3,
          spacing: 15,
        },
      },
      '(min-width: 960px)': {
        slides: {
          perView: 4,
          spacing: 15,
        },
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next();
    }, 4000);
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 4,
          fontSize: { xs: '28px', md: '36px' },
          color: '#111',
        }}
      >
        Browse by Type
      </Typography>

      <Container>
        <Box ref={sliderRef} className="keen-slider">
          {categories.map((item) => (
            <Box
              key={item.id}
              className="keen-slider__slide"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 260,
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 2,
                  my: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#FFF3D0',
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                {item.icon}
                <CardContent>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {item.label}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Categories;
