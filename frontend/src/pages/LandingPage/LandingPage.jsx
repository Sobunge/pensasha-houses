// src/pages/LandingPage/LandingPage.jsx
import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
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
    <Box
      component="main"
      sx={{
        width: "100%",
        minHeight: "100vh",
        scrollBehavior: "smooth",
        overflowX: "hidden",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
      <Box ref={howItWorksRef} sx={{ scrollMarginTop: "48px" }}>
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>
      </Box>

      <ScrollReveal>
        <FinalCTA handleAuthOpen={() => setAuthOpen(true)} />
      </ScrollReveal>

      {/* Authentication Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </Box>
  );
}

export default LandingPage;