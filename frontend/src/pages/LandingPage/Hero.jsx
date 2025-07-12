import { Box, Typography, Button, Container } from '@mui/material';
import backgroundImage from '../../assets/background.jpg';

function Hero() {
    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                textAlign: 'center',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                px: 2,
            }}
        >
            {/* Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 0,
                }}
            />

            {/* Content */}
            <Container sx={{ position: 'relative', zIndex: 1 }} maxWidth="md">
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 'bold',
                        mb: 3,
                        fontSize: { xs: '36px', md: '48px' },
                    }}
                >
                    Find Your Next Home with Pensasha
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        mb: 4,
                        color: '#F7F7F7',
                        fontSize: { xs: '16px', md: '20px' },
                    }}
                >
                    Helping tenants discover houses, landlords find tenants, and managing properties — all in one place.
                </Typography>

                <Button
                    variant="contained"
                    href="/houses"
                    sx={{
                        backgroundColor: '#F8B500',
                        color: '#111111',
                        px: 5,
                        py: 1.5,
                        fontWeight: '600',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#C59000',
                        },
                    }}
                >
                    Browse Listings
                </Button>
            </Container>
        </Box>
    );
}

export default Hero;
