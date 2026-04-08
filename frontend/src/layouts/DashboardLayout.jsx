// src/layouts/DashboardLayout.jsx
import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import UsersNavbar from "../components/UsersNavbar";
import UserSidebar from "../components/UserSidebar";
import UserFooter from "../components/UserFooter";
import { useAuth } from "../pages/Auth/AuthContext";
import { NAVBAR_HEIGHT } from "../layouts/constants";

function DashboardLayout() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef = useRef(null);

  /* ===================== NAVIGATION SCROLL RESET ===================== */
  /**
   * Resets the scroll position of the internal main container 
   * every time the URL path changes.
   */
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Use "smooth" if you want a sliding effect
      });
    }
  }, [pathname]);

  /* ===================== ACCESSIBILITY & FOCUS ===================== */
  /**
   * Returns focus to the main content area when the mobile 
   * sidebar is closed for better keyboard/screen-reader flow.
   */
  useEffect(() => {
    if (!mobileOpen && mainRef.current) {
      mainRef.current.focus();
    }
  }, [mobileOpen]);

  // Prevent rendering if user session is being restored or is missing
  if (!user) return null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      {/* Sidebar - Positioned absolute/fixed on mobile, relative on desktop */}
      <UserSidebar 
        mobileOpen={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
      />

      {/* Main Content Wrapper */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0, // Critical for preventing flexbox children from breaking layout
          bgcolor: "#f7f7f7",
          height: "100vh", // Lock height to viewport
        }}
      >
        {/* Navbar - Usually fixed height */}
        <UsersNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />

        {/* Scrollable Main Body */}
        <Box
          ref={mainRef}
          component="main"
          role="main"
          tabIndex={-1}
          sx={{
            flexGrow: 1,
            mt: `${NAVBAR_HEIGHT}px`,
            overflowY: "auto", // The actual internal scrollbar
            overflowX: "hidden",
            p: { xs: 2, md: 3 },
            outline: "none", // Removes focus ring when focusing via effect
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Centered Content Container */}
          <Box 
            sx={{ 
              maxWidth: 1200, 
              mx: "auto", 
              width: "100%",
              flexGrow: 1, // Ensures content pushes footer down if short
            }}
          >
            <Outlet />
          </Box>

          {/* Footer - Sits at the bottom of the scrollable area */}
          <UserFooter />
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;