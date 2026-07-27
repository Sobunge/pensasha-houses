// src/pages/LandingPage/HotDeals.jsx
import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

function HotDeals() {
  return (
    <Box
      sx={{
        backgroundColor: "#0F172A", // Deep obsidian/slate base for strong visual contrast
        backgroundImage: "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 75%)",
        py: { xs: 8, md: 10 },
        borderTop: "1px solid rgba(212, 175, 55, 0.3)", // Subtle gold border definition
        borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
        position: "relative",
        textAlign: 'center',
        boxShadow: "inset 0 10px 20px -10px rgba(0,0,0,0.5)",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center">
          
          {/* Flame Badge Accent */}
          <Box 
            sx={{ 
              display: "inline-flex", 
              alignItems: "center",
              justifyContent: "center",
              p: 1.5, 
              borderRadius: "50%", 
              backgroundColor: "rgba(212, 175, 55, 0.12)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              color: "#D4AF37",
              boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)",
            }}
          >
            <WhatshotIcon sx={{ fontSize: '2rem' }} />
          </Box>

          {/* Section Heading */}
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 600,
              color: '#FFFFFF',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              letterSpacing: "-0.01em",
            }}
          >
            Hot Deals & Exclusive Offers
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              color: '#94A3B8',
              maxWidth: 580,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.6,
            }}
          >
            Explore hand-picked properties with limited-time reduced rates across prime locations in Kisumu & Nairobi. Secure your next home today.
          </Typography>

          {/* High-Contrast Gold Action Button */}
          <Button
            component={RouterLink}
            to="/properties?filter=hot-deals"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              mt: 1,
              backgroundColor: '#D4AF37',
              color: '#0B0F17',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              px: 4.5,
              py: 1.5,
              borderRadius: '10px',
              boxShadow: '0 4px 16px rgba(212, 175, 55, 0.25)',
              transition: 'all 0.25s ease',
              '&:hover': {
                backgroundColor: '#B5922B',
                boxShadow: '0 6px 24px rgba(212, 175, 55, 0.4)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            See Hot Listings
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default HotDeals;