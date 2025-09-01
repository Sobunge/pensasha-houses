import { Box } from '@mui/material';
import Navbar from '../../components/Navbar';
import Hero from '../../pages/LandingPage/Hero'
import FeaturedListings from '../../pages/LandingPage/FeaturedListings'
import HotDeals from '../../pages/LandingPage/HotDeals'
import Categories from './Categories';
import HowItWorks from './HowItWorks';
import FinalCTA from './FinalCTA';
import Footer from './Footer';

function LandingPage() {
    return (
        <Box>
            <Hero />
            <FeaturedListings />
            <HotDeals />
            <Categories />
            <HowItWorks />
            <FinalCTA />
            <Footer />
        </ Box>
    );
}

export default LandingPage;