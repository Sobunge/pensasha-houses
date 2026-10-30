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
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.main, // Obsidian slate background
        backgroundImage: `
          linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main} 20px, ${theme.palette.primary.main} calc(100% - 20px), ${theme.palette.background.default} 100%),
          radial-gradient(circle at 50% 20%, ${theme.palette.secondary.main}26 0%, transparent 60%)
        `,
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
      })}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          <Typography
            variant="overline"
            sx={(theme) => ({
              color: theme.palette.secondary.dark,
              fontWeight: 700,
              letterSpacing: '0.15em',
              fontSize: '0.8rem',
            })}
          >
            SIMPLE PROCESS
          </Typography>
          <Typography
            variant="h3"
            sx={(theme) => ({
              fontWeight: 600,
              color: theme.palette.primary.contrastText,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              mt: 0.5,
            })}
          >
            How Pensasha Works
          </Typography>
        </Box>

        {/* Steps Grid */}
        <Grid container spacing={3} justifyContent="center">
          {steps.map((step) => (
            <Grid item xs={12} md={4} key={step.id}>
              <Card
                sx={(theme) => ({
                  height: '100%',
                  p: { xs: 2.5, md: 3 },
                  borderRadius: `${theme.shape.borderRadius * 1.33}px`,
                  backgroundColor: `${theme.palette.primary.light}B3`, // Translucent dark glass
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.common.white}14`,
                  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.4)',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: `${theme.palette.secondary.main}66`,
                    backgroundColor: `${theme.palette.primary.light}F2`,
                    boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.6)',
                    '& .icon-box': {
                      backgroundColor: theme.palette.secondary.dark,
                      color: theme.palette.primary.contrastText,
                      transform: 'scale(1.05)',
                    },
                  },
                })}
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
                      sx={(theme) => ({
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: `${theme.palette.secondary.main}26`,
                        color: theme.palette.secondary.dark,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                      })}
                    >
                      {step.icon}
                    </Box>

                    <Chip
                      label={step.id}
                      size="small"
                      sx={(theme) => ({
                        display: { xs: 'inline-flex', lg: 'none' },
                        backgroundColor: `${theme.palette.common.white}0D`,
                        color: theme.palette.text.secondary,
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        border: `1px solid ${theme.palette.common.white}1A`,
                      })}
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
                        sx={(theme) => ({
                          fontWeight: 600,
                          color: theme.palette.primary.contrastText,
                          fontSize: '1.1rem',
                        })}
                      >
                        {step.title}
                      </Typography>

                      <Chip
                        label={step.id}
                        size="small"
                        sx={(theme) => ({
                          display: { xs: 'none', lg: 'inline-flex' },
                          backgroundColor: `${theme.palette.common.white}0D`,
                          color: theme.palette.text.secondary,
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          border: `1px solid ${theme.palette.common.white}1A`,
                        })}
                      />
                    </Stack>

                    <Typography
                      variant="body2"
                      sx={(theme) => ({
                        color: theme.palette.text.secondary,
                        lineHeight: 1.5,
                        fontSize: '0.875rem',
                      })}
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