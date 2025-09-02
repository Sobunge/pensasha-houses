import { useState, useRef } from 'react';
import { Box } from '@mui/material';
import Hero from '../../pages/LandingPage/Hero';
import FeaturedListings from '../../pages/LandingPage/FeaturedListings';
import HotDeals from '../../pages/LandingPage/HotDeals';
import Categories from './Categories';
import HowItWorks from './HowItWorks';
import FinalCTA from './FinalCTA';
import Footer from './Footer';
import AuthModal from '../Auth/AuthModal';

function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const howItWorksRef = useRef(null); // Ref for HowItWorks section

  const handleAuthOpen = () => setAuthOpen(true);
  const handleAuthClose = () => setAuthOpen(false);

  return (
    <Box>
      <Hero />
      <FeaturedListings />
      <HotDeals />
      <Categories />

      {/* How It Works Section with ref */}
      <div ref={howItWorksRef}>
        <HowItWorks />
      </div>

      {/* Final CTA with login modal handler */}
      <FinalCTA handleAuthOpen={handleAuthOpen} />

      {/* Footer with ref passed */}
      <Footer howItWorksRef={howItWorksRef} />

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={handleAuthClose} />
    </Box>
  );
}

export default LandingPage;
