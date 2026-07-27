import { useState, useRef } from "react";
import Hero from "./Hero";
import FeaturedListings from "./FeaturedListings";
import HotDeals from "./HotDeals";
import Categories from "./Categories";
import HowItWorks from "./HowItWorks";
import FinalCTA from "./FinalCTA";
import AuthModal from "../Auth/AuthModal";
import ScrollReveal from "./ScrollReveal"; // Adjust path if located elsewhere

function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const howItWorksRef = useRef(null);

  return (
    <main className="w-full min-h-screen scroll-smooth overflow-x-hidden">
      {/* Hero handles its own initial load animations */}
      <Hero />

      {/* Main Sections wrapped in ScrollReveal for seamless entry */}
      <ScrollReveal>
        <FeaturedListings />
      </ScrollReveal>

      <ScrollReveal>
        <HotDeals />
      </ScrollReveal>

      <ScrollReveal>
        <Categories />
      </ScrollReveal>

      {/* How It Works with Ref for smooth scrolling navigation */}
      <div ref={howItWorksRef} className="scroll-mt-12">
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <FinalCTA handleAuthOpen={() => setAuthOpen(true)} />
      </ScrollReveal>

      {/* Authentication Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  );
}

export default LandingPage;