// src/components/Footer.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Stack,
  IconButton,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import HouseIcon from '@mui/icons-material/House';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link as RouterLink } from 'react-router-dom';
import ContactModal from '../pages/LandingPage/ContactModal';

export default function Footer({ howItWorksRef }) {
  const [contactOpen, setContactOpen] = useState(false);

  const scrollToHowItWorks = (e) => {
    e.preventDefault();
    if (howItWorksRef?.current) {
      howItWorksRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactOpen = () => setContactOpen(true);
  const handleContactClose = () => setContactOpen(false);

  return (
    <Box
      component="footer"
      sx={(theme) => ({
        backgroundColor: `${theme.palette.primary.main}F2`, // ~95% dark slate
        backgroundImage: `
          linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main} 20px, ${theme.palette.primary.main} calc(100% - 20px))
        `,
        backdropFilter: 'blur(8px)',
        color: theme.palette.primary.contrastText,
        pt: { xs: 8, md: 10 },
        pb: { xs: 4, md: 6 },
        position: 'relative',
        width: '100%',
      })}
    >
      <Container maxWidth="lg">
        {/* Brand Header */}
        <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="h4"
            sx={(theme) => ({
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              color: theme.palette.primary.contrastText,
            })}
          >
            Pensasha{' '}
            <Box component="span" sx={(theme) => ({ color: theme.palette.secondary.main })}>
              Houses
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              maxWidth: 540,
              fontSize: { xs: '0.9rem', md: '1rem' },
              lineHeight: 1.6,
            })}
          >
            Connecting tenants to quality homes and landlords to reliable tenants — faster, simpler, smarter.
          </Typography>
        </Box>

        {/* Footer Navigation Columns */}
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: 6 }}>
          {/* Quick Links Column */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="subtitle1"
              sx={(theme) => ({
                fontWeight: 700,
                color: theme.palette.secondary.dark,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                mb: 2.5,
              })}
            >
              Quick Links
            </Typography>
            <Stack spacing={2} alignItems="flex-start">
              <FooterLink to="/" icon={<HomeIcon sx={{ fontSize: 20 }} />} text="Home" />
              <FooterLink to="/properties" icon={<HouseIcon sx={{ fontSize: 20 }} />} text="Browse Houses" />
              <FooterLink onClick={scrollToHowItWorks} icon={<InfoIcon sx={{ fontSize: 20 }} />} text="How It Works" />
              <FooterLink onClick={handleContactOpen} icon={<ContactMailIcon sx={{ fontSize: 20 }} />} text="Contact Us" />
            </Stack>
          </Grid>

          {/* Contact Info Column */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="subtitle1"
              sx={(theme) => ({
                fontWeight: 700,
                color: theme.palette.secondary.dark,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                mb: 2.5,
              })}
            >
              Contact Info
            </Typography>
            <Stack spacing={2.5} alignItems="flex-start">
              <ContactItem icon={<PhoneIcon sx={{ fontSize: 20 }} />} text="+254 707 335 375" />
              <ContactItem icon={<EmailIcon sx={{ fontSize: 20 }} />} text="support@pensasha.co.ke" />
              <ContactItem icon={<LocationOnIcon sx={{ fontSize: 20 }} />} text="Kisumu, Kenya" />
            </Stack>
          </Grid>

          {/* Social Media Column */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="subtitle1"
              sx={(theme) => ({
                fontWeight: 700,
                color: theme.palette.secondary.dark,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                mb: 2.5,
              })}
            >
              Connect With Us
            </Typography>
            <Typography variant="body2" sx={(theme) => ({ color: theme.palette.text.secondary, mb: 2, fontSize: '0.875rem' })}>
              Follow our official channels for real-time listing updates and market insights.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              {[FacebookIcon, TwitterIcon, InstagramIcon, MusicVideoIcon].map((Icon, idx) => (
                <IconButton
                  key={idx}
                  href="#"
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                    backgroundColor: `${theme.palette.common.white}0A`,
                    border: `1px solid ${theme.palette.common.white}14`,
                    p: 1.25,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      backgroundColor: theme.palette.secondary.main,
                      borderColor: theme.palette.secondary.main,
                      transform: 'translateY(-3px)',
                    },
                  })}
                >
                  <Icon sx={{ fontSize: 20 }} />
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={(theme) => ({ borderColor: `${theme.palette.common.white}14`, my: 4 })} />

        {/* Bottom Bar & Scroll to Top */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.common.white,
              opacity: 0.85,
              fontSize: { xs: '0.75rem', md: '0.85rem' },
              letterSpacing: '0.3px',
            })}
          >
            © {new Date().getFullYear()} <strong>Pensasha Houses</strong>. All rights reserved.
          </Typography>

          <Button
            onClick={scrollToTop}
            size="small"
            startIcon={<ArrowUpwardIcon sx={{ fontSize: 16 }} />}
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              textTransform: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              px: 2,
              py: 0.75,
              borderRadius: `${theme.shape.borderRadius}px`,
              border: `1px solid ${theme.palette.common.white}1A`,
              backgroundColor: `${theme.palette.common.white}05`,
              transition: 'all 0.25s ease',
              '&:hover': {
                color: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                backgroundColor: `${theme.palette.secondary.main}14`,
              },
            })}
          >
            Back to top
          </Button>
        </Stack>
      </Container>

      {/* Contact Modal */}
      <ContactModal open={contactOpen} onClose={handleContactClose} />
    </Box>
  );
}

// Reusable Footer Link Component
function FooterLink({ to, icon, text, onClick }) {
  const content = (
    <Box
      sx={(theme) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        color: theme.palette.text.secondary,
        fontSize: '0.9rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        '&:hover': {
          color: theme.palette.secondary.main,
          transform: 'translateX(4px)',
        },
      })}
      onClick={onClick}
    >
      <Box sx={(theme) => ({ color: theme.palette.text.secondary, display: 'flex', transition: 'color 0.25s ease' })}>
        {icon}
      </Box>
      {text}
    </Box>
  );

  if (to) {
    return (
      <Box component={RouterLink} to={to} sx={{ textDecoration: 'none' }}>
        {content}
      </Box>
    );
  }

  return content;
}

// Reusable Contact Item Component
function ContactItem({ icon, text }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box sx={(theme) => ({ display: 'flex', color: theme.palette.secondary.main })}>{icon}</Box>
      <Typography variant="body2" sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: '0.9rem' })}>
        {text}
      </Typography>
    </Stack>
  );
}