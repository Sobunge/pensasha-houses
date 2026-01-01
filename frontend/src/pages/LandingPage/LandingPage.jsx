import { useState, useRef } from "react";
import Hero from "./Hero";
import FeaturedListings from "./FeaturedListings";
import HotDeals from "./HotDeals";
import Categories from "./Categories";
import HowItWorks from "./HowItWorks";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import AuthModal from "../Auth/AuthModal";

function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const howItWorksRef = useRef(null);

  return (
    <>
      <Hero />

      <FeaturedListings />
      <HotDeals />
      <Categories />

      {/* How It Works */}
      <div ref={howItWorksRef}>
        <HowItWorks />
      </div>

      <FinalCTA handleAuthOpen={() => setAuthOpen(true)} />
      <Footer howItWorksRef={howItWorksRef} />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default LandingPage;
