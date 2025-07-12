import { Box, Typography, Container, Grid, Link, Stack, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
              <Link href="/" underline="hover" color="#F7F7F7">Home</Link>
              <Link href="/houses" underline="hover" color="#F7F7F7">Browse Houses</Link>
              <Link href="/how-it-works" underline="hover" color="#F7F7F7">How It Works</Link>
              <Link href="/contact" underline="hover" color="#F7F7F7">Contact Us</Link>
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
              <Typography variant="body2">
                <PhoneIcon sx={{ fontSize: 18, mr: 1 }} />
                +254 707 335 375
              </Typography>
              <Typography variant="body2">
                <EmailIcon sx={{ fontSize: 18, mr: 1 }} />
                support@pensasha.co.ke
              </Typography>
              <Typography variant="body2">
                <LocationOnIcon sx={{ fontSize: 18, mr: 1 }} />
                Kisumu, Kenya
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
              <IconButton href="#" sx={{ color: '#F7F7F7' }}><FacebookIcon /></IconButton>
              <IconButton href="#" sx={{ color: '#F7F7F7' }}><TwitterIcon /></IconButton>
              <IconButton href="#" sx={{ color: '#F7F7F7' }}><InstagramIcon /></IconButton>
              <IconButton href="#" sx={{ color: '#F7F7F7' }}><MusicVideoIcon /></IconButton>
            </Stack>
          </Grid>

        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', mt: 4, color: '#CCCCCC' }}
        >
          &copy; {new Date().getFullYear()} Pensasha Houses. All rights reserved.
        </Typography>

      </Container>
    </Box>
  );
}

export default Footer;
