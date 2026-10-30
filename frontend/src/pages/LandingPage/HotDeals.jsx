// src/pages/LandingPage/HotDeals.jsx
import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

function HotDeals() {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.main,
        // Smooth transition from theme default background into dark obsidian slate
        backgroundImage: `
          linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main} 20px, ${theme.palette.primary.main} calc(100% - 20px), ${theme.palette.background.default} 100%),
          radial-gradient(circle at 50% 20%, ${theme.palette.secondary.main}26 0%, transparent 60%)
        `,
        py: { xs: 10, md: 14 },
        position: "relative",
        textAlign: 'center',
      })}
    >
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center">
          
          {/* Flame Badge Accent */}
          <Box 
            sx={(theme) => ({ 
              display: "inline-flex", 
              alignItems: "center",
              justifyContent: "center",
              p: 1.5, 
              borderRadius: "50%", 
              backgroundColor: `${theme.palette.secondary.main}1F`, // ~12% opacity gold
              border: `1px solid ${theme.palette.secondary.main}4D`, // ~30% opacity gold border
              color: theme.palette.secondary.main,
              boxShadow: `0 0 20px ${theme.palette.secondary.main}33`,
            })}
          >
            <WhatshotIcon sx={{ fontSize: '2rem' }} />
          </Box>

          {/* Section Heading */}
          <Typography
            variant="h3"
            sx={(theme) => ({
              fontWeight: 600,
              color: theme.palette.primary.contrastText,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              letterSpacing: "-0.01em",
            })}
          >
            Hot Deals & Exclusive Offers
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              maxWidth: 580,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.6,
            })}
          >
            Explore hand-picked properties with limited-time reduced rates across prime locations in Kisumu & Nairobi. Secure your next home today.
          </Typography>

          {/* High-Contrast Gold Action Button */}
          <Button
            component={RouterLink}
            to="/properties?filter=hot-deals"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={(theme) => ({
              mt: 1,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.dark,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              px: 4.5,
              py: 1.5,
              borderRadius: '10px',
              boxShadow: `0 4px 16px ${theme.palette.secondary.main}40`,
              transition: 'all 0.25s ease',
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
                boxShadow: `0 6px 24px ${theme.palette.secondary.main}66`,
                transform: 'translateY(-2px)',
              },
            })}
          >
            See Hot Listings
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default HotDeals;