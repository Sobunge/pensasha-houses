// src/pages/LandingPage/HowItWorks.jsx
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Stack,
  Chip,
} from '@mui/material';
import {
  House as HouseIcon,
  Call as CallIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
} from '@mui/icons-material';

const steps = [
  {
    id: '01',
    title: 'Find Your Space',
    description:
      'Browse verified listings by location, budget, and layout. Filter through photos and details to narrow down your top choices.',
    icon: <HouseIcon sx={{ fontSize: 32 }} />,
  },
  {
    id: '02',
    title: 'Connect Directly',
    description:
      'Reach out directly to property owners or managers. Schedule physical or virtual viewings with zero middleman friction.',
    icon: <CallIcon sx={{ fontSize: 32 }} />,
  },
  {
    id: '03',
    title: 'Move In & Manage',
    description:
      'Finalize your agreement, secure your deposit, and manage rent payments or maintenance requests directly online.',
    icon: <AssignmentTurnedInIcon sx={{ fontSize: 32 }} />,
  },
];

function HowItWorks() {
  return (
    <Box
      sx={{
        backgroundColor: '#0F172A', // Navy/slate dark background
        backgroundImage: `
          linear-gradient(180deg, #FFFFFF 0%, #0F172A 20px, #0F172A calc(100% - 20px), #FFFFFF 100%),
          radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)
        `,
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          <Typography
            variant="overline"
            sx={{
              color: '#B5922B',
              fontWeight: 700,
              letterSpacing: '0.15em',
              fontSize: '0.8rem',
            }}
          >
            SIMPLE PROCESS
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 600,
              color: '#FFFFFF',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              mt: 0.5,
            }}
          >
            How Pensasha Works
          </Typography>
        </Box>

        {/* Steps Grid */}
        <Grid container spacing={3} justifyContent="center">
          {steps.map((step) => (
            <Grid item xs={12} md={4} key={step.id}>
              <Card
                sx={{
                  height: '100%',
                  p: { xs: 2.5, md: 3 },
                  borderRadius: '16px',
                  backgroundColor: 'rgba(30, 41, 59, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.4)',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(212, 175, 55, 0.4)',
                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                    boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.6)',
                    '& .icon-box': {
                      backgroundColor: '#B5922B',
                      color: '#FFFFFF',
                      transform: 'scale(1.05)',
                    },
                  },
                }}
              >
                <Stack
                  direction={{ xs: 'column', lg: 'row' }}
                  alignItems={{ xs: 'flex-start', lg: 'flex-start' }}
                  spacing={2}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: { xs: '100%', lg: 'auto' } }}
                  >
                    <Box
                      className="icon-box"
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: 'rgba(181, 146, 43, 0.15)',
                        color: '#B5922B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                      }}
                    >
                      {step.icon}
                    </Box>

                    <Chip
                      label={step.id}
                      size="small"
                      sx={{
                        display: { xs: 'inline-flex', lg: 'none' },
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#94A3B8',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    />
                  </Stack>

                  <CardContent sx={{ p: '0 !important', flexGrow: 1 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mb: 0.5 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: '#FFFFFF',
                          fontSize: '1.1rem',
                        }}
                      >
                        {step.title}
                      </Typography>

                      <Chip
                        label={step.id}
                        size="small"
                        sx={{
                          display: { xs: 'none', lg: 'inline-flex' },
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          color: '#94A3B8',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      />
                    </Stack>

                    <Typography
                      variant="body2"
                      sx={{
                        color: '#94A3B8',
                        lineHeight: 1.5,
                        fontSize: '0.875rem',
                      }}
                    >
                      {step.description}
                    </Typography>
                  </CardContent>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HowItWorks;