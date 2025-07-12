import { Box } from '@mui/material';
import Navbar from '../../components/Navbar';
import Hero from '../../pages/LandingPage/Hero'
import FeaturedListings from '../../pages/LandingPage/FeaturedListings'
import HotDeals from '../../pages/LandingPage/HotDeals'

function LandingPage() {
    return (
        <Box>
            <Navbar />
            <Hero />
            <FeaturedListings />
            <HotDeals />
        </ Box>
    );
}

export default LandingPage;