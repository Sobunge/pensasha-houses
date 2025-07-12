import { Box } from '@mui/material';
import Navbar from '../../components/Navbar';
import Hero from '../../pages/LandingPage/Hero'
import FeaturedListings from '../../pages/LandingPage/FeaturedListings'

function LandingPage() {
    return (
        <Box>
            <Navbar />
            <Hero />
            <FeaturedListings />
        </ Box>
    );
}

export default LandingPage;