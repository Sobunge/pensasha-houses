import { Box, Typography, Button, Container, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import backgroundImage from '../../assets/background.jpg';

function Hero() {
    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '76vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                px: 2,
                py: { xs: 8, md: 12 },
                color: '#fff',
            }}
        >
            {/* Dark Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 0,
                }}
            />

            {/* Hero Content */}
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <Stack spacing={3} alignItems="center">
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '2rem', md: '3.5rem' },
                            lineHeight: 1.2,
                        }}
                    >
                        Discover Your Next Home
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        sx={{
                            maxWidth: '600px',
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            color: '#e0e0e0',
                        }}
                    >
                        Pensasha connects tenants with their dream homes, helps landlords find the right clients, and simplifies property management — all in one seamless platform.
                    </Typography>

                    <Button
                        href="/houses"
                        startIcon={<SearchIcon />}
                        variant="contained"
                        sx={{
                            backgroundColor: '#F8B500',
                            color: '#111',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': {
                                backgroundColor: '#c88f00',
                            },
                        }}
                    >
                        Browse Listings
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}

export default Hero;
