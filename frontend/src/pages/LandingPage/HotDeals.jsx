import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot'; // 🔥 Icon

function HotDeals() {
  return (
    <Box
      sx={{
        backgroundColor: '#F8B500',
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#111111',
            mb: 3,
            fontSize: { xs: '28px', md: '36px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <WhatshotIcon sx={{ color: '#D32F2F', fontSize: '32px' }} />
          Hot Deals in Kisumu & Nairobi
        </Typography>

        <Button
          variant="contained"
          href="/properties"
          endIcon={<WhatshotIcon />}
          sx={{
            backgroundColor: '#111111',
            color: '#FFFFFF',
            textTransform: 'none',
            fontWeight: '600',
            px: 4,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#2A2A2A',
            },
          }}
        >
          See Listings
        </Button>
      </Container>
    </Box>
  );
}

export default HotDeals;
