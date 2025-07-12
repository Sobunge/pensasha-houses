import { Box } from '@mui/material';
import Navbar from '../../components/Navbar';
import Hero from '../../pages/LandingPage/Hero'
import FeaturedListings from '../../pages/LandingPage/FeaturedListings'
import HotDeals from '../../pages/LandingPage/HotDeals'
import Categories from './Categories';
import HowItWorks from './HowItWorks';

function LandingPage() {
    return (
        <Box>
            <Navbar />
            <Hero />
            <FeaturedListings />
            <HotDeals />
            <Categories />
            <HowItWorks />
        </ Box>
    );
}

export default LandingPage;