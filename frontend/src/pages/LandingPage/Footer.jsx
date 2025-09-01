import { Box, Typography, Container, Grid, Link, Stack, IconButton } from '@mui/material';
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

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#2A2A2A', color: '#F7F7F7', textAlign: 'center', py: 6 }}>
      <Container>

        {/* Brand */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '28px', md: '36px' } }}
        >
          Pensasha Houses
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: '16px', md: '18px' }, mb: 5 }}
        >
          Connecting tenants to homes and landlords to tenants — faster, simpler, smarter.
        </Typography>

        <Grid container spacing={4} justifyContent="center">

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {[
                { href: '/', icon: <HomeIcon />, text: 'Home' },
                { href: '/houses', icon: <HouseIcon />, text: 'Browse Houses' },
                { href: '/how-it-works', icon: <InfoIcon />, text: 'How It Works' },
                { href: '/contact', icon: <ContactMailIcon />, text: 'Contact Us' },
              ].map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  underline="none"
                  color="#F7F7F7"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#F8B500',
                      transform: 'scale(1.05)',
                    },
                    svg: { mr: 1, transition: 'all 0.3s ease', '&:hover': { color: '#F8B500' } },
                  }}
                >
                  {link.icon} {link.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Divider */}
          <Grid item xs={false} sm={0} md={0.05}
            sx={{ display: { xs: 'none', md: 'block' }, borderLeft: '1px solid #444', height: 'auto' }}
          />

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Contact Info
            </Typography>
            <Stack spacing={1} alignItems="center">
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', transition: 'all 0.3s ease', '&:hover': { color: '#F8B500' } }}>
                <PhoneIcon sx={{ fontSize: 18, mr: 1 }} /> +254 707 335 375
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', transition: 'all 0.3s ease', '&:hover': { color: '#F8B500' } }}>
                <EmailIcon sx={{ fontSize: 18, mr: 1 }} /> support@pensasha.co.ke
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', transition: 'all 0.3s ease', '&:hover': { color: '#F8B500' } }}>
                <LocationOnIcon sx={{ fontSize: 18, mr: 1 }} /> Kisumu, Kenya
              </Typography>
            </Stack>
          </Grid>

          {/* Divider */}
          <Grid item xs={false} sm={0} md={0.05}
            sx={{ display: { xs: 'none', md: 'block' }, borderLeft: '1px solid #444', height: 'auto' }}
          />

          {/* Social Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Social Links
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              {[FacebookIcon, TwitterIcon, InstagramIcon, MusicVideoIcon].map((Icon, idx) => (
                <IconButton
                  key={idx}
                  href="#"
                  sx={{
                    color: '#F7F7F7',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#F8B500',
                      transform: 'scale(1.2)',
                    },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
}

export default Footer;
