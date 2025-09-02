import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Stack,
  IconButton,
  Button,
  Link as MuiLink,
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
import ContactModal from './ContactModal'; // Your contact modal

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
      sx={{
        background: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 100%)',
        color: '#F7F7F7',
        py: 8,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        {/* Brand */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '24px', md: '32px' } }}
        >
          Pensasha Houses
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 6, color: '#CCCCCC', fontSize: { xs: '14px', md: '16px' } }}
        >
          Connecting tenants to homes and landlords to tenants — faster, simpler, smarter.
        </Typography>

        {/* Columns */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {/* Quick Links */}
          <Box sx={{ width: { xs: '100%', sm: '48%', md: '30%' }, mb: { xs: 4, md: 0 } }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 2, textAlign: { xs: 'center', md: 'left' } }}
            >
              Quick Links
            </Typography>
            <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <FooterLink href="/" icon={<HomeIcon />} text="Home" />
              <FooterLink href="/properties" icon={<HouseIcon />} text="Browse Houses" />
              <FooterLink onClick={scrollToHowItWorks} icon={<InfoIcon />} text="How It Works" />
              <FooterLink onClick={handleContactOpen} icon={<ContactMailIcon />} text="Contact Us" />
            </Stack>
          </Box>

          {/* Contact Info */}
          <Box sx={{ width: { xs: '100%', sm: '48%', md: '30%' }, mb: { xs: 4, md: 0 } }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 2, textAlign: { xs: 'center', md: 'left' } }}
            >
              Contact Info
            </Typography>
            <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <ContactItem icon={<PhoneIcon />} text="+254 707 335 375" />
              <ContactItem icon={<EmailIcon />} text="support@pensasha.co.ke" />
              <ContactItem icon={<LocationOnIcon />} text="Kisumu, Kenya" />
            </Stack>
          </Box>

          {/* Social Links */}
          <Box sx={{ width: { xs: '100%', sm: '48%', md: '30%' }, mb: { xs: 4, md: 0 } }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 2, textAlign: { xs: 'center', md: 'left' } }}
            >
              Follow Us
            </Typography>
            <Stack direction="row" spacing={3} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              {[FacebookIcon, TwitterIcon, InstagramIcon, MusicVideoIcon].map((Icon, idx) => (
                <IconButton
                  key={idx}
                  href="#"
                  sx={{
                    color: '#F7F7F7',
                    fontSize: 24,
                    transition: 'all 0.3s ease',
                    '&:hover': { color: '#F8B500', transform: 'scale(1.3)' },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Back to Top */}
        <Button
          onClick={scrollToTop}
          variant="contained"
          sx={{
            mt: 6,
            backgroundColor: '#f8b500',
            color: '#111111',
            textTransform: 'none',
            borderRadius: 3,
            px: 3,
            py: 1,
            '&:hover': { backgroundColor: '#c59000' },
          }}
          startIcon={<ArrowUpwardIcon />}
        >
          Back to Top
        </Button>
      </Container>

      {/* Contact Modal */}
      <ContactModal open={contactOpen} onClose={handleContactClose} />
    </Box>
  );
}

// Footer Link Component
function FooterLink({ href, icon, text, onClick }) {
  return (
    <MuiLink
      href={href || '#'}
      onClick={onClick}
      underline="none"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        color: '#F7F7F7',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        '&:hover': { color: '#F8B500', transform: 'translateX(4px)' },
      }}
    >
      {icon} {text}
    </MuiLink>
  );
}

// Contact Item Component
function ContactItem({ icon, text }) {
  return (
    <Typography
      variant="body2"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        color: '#CCCCCC',
        fontWeight: 400,
        transition: 'all 0.3s ease',
        '&:hover': { color: '#F8B500', transform: 'translateX(3px)' },
        cursor: 'pointer',
      }}
    >
      {icon} {text}
    </Typography>
  );
}
