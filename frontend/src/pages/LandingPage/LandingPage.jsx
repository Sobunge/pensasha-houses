import { Box } from '@mui/material';
import Navbar from '../../components/Navbar';
import Hero from '../../pages/LandingPage/Hero'
import FeaturedListings from '../../pages/LandingPage/FeaturedListings'
import HotDeals from '../../pages/LandingPage/HotDeals'
import Categories from './Categories';
import HowItWorks from './HowItWorks';
import FinalCTA from './FinalCTA';

function LandingPage() {
    return (
        <Box>
            <Navbar />
            <Hero />
            <FeaturedListings />
            <HotDeals />
            <Categories />
            <HowItWorks />
            <FinalCTA />
        </ Box>
    );
}

export default LandingPage;