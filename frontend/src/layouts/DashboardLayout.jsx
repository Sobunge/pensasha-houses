// src/layouts/DashboardLayout.jsx
import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import UsersNavbar from "../components/UsersNavbar";
import UserSidebar from "../components/UserSidebar";
import UserFooter from "../components/UserFooter";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useAuth } from "../pages/Auth/AuthContext";
import { NAVBAR_HEIGHT } from "../layouts/constants";

function DashboardLayout() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen && mainRef.current) {
      mainRef.current.focus();
    }
  }, [mobileOpen]);

  if (!user) return null;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        overflow: "hidden",
        bgcolor: "#F8FAFC",
        // Subtle ambient light effect matching luxury theme
        backgroundImage:
          "radial-gradient(at 90% 10%, rgba(212, 175, 55, 0.03) 0px, transparent 50%), radial-gradient(at 10% 90%, rgba(15, 23, 42, 0.03) 0px, transparent 50%)",
        color: "#0F172A",
      }}
    >
      {/* Sidebar */}
      <UserSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Container */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100vh",
          position: "relative",
        }}
      >
        <UsersNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />

        {/* Scrollable Viewport */}
        <Box
          ref={mainRef}
          component="main"
          role="main"
          id="mainContent"
          tabIndex={-1}
          sx={{
            flexGrow: 1,
            mt: `${NAVBAR_HEIGHT}px`,
            overflowY: "auto",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2.5, sm: 3.5 },
            outline: "none",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            // Custom scrollbar styling for extra polish
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(212, 175, 55, 0.25)",
              borderRadius: "4px",
              "&:hover": {
                background: "rgba(212, 175, 55, 0.5)",
              },
            },
          }}
        >
          {/* Main Content Area */}
          <Box
            sx={{
              maxWidth: 1280, // Slightly widened to allow luxurious breathing room
              mx: "auto",
              width: "100%",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet />
          </Box>

          <UserFooter />

          {/* Scroll to Top Button */}
          <ScrollToTopButton containerId="mainContent" />
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;