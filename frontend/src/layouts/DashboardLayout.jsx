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
        width: "100vw",
        overflow: "hidden",
        bgcolor: "background.default",
        color: "text.primary",
        // Dynamic ambient radial glow referencing your gold (secondary) & obsidian (primary) theme tokens
        backgroundImage: (theme) =>
          `radial-gradient(at 90% 10%, ${theme.palette.secondary.main}0D 0px, transparent 50%), radial-gradient(at 10% 90%, ${theme.palette.primary.main}0A 0px, transparent 50%)`,
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
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
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
          sx={(theme) => ({
            flexGrow: 1,
            mt: `${NAVBAR_HEIGHT}px`,
            overflowY: "auto",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            pb: { xs: 3, sm: 4 },
            outline: "none",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: "100%",
            boxSizing: "border-box",
            // Custom scrollbar with dynamic theme gold thumb
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: `${theme.palette.secondary.main}40`, // 25% opacity secondary gold
              borderRadius: "4px",
              "&:hover": {
                background: `${theme.palette.secondary.main}80`, // 50% opacity on hover
              },
            },
          })}
        >
          {/* Main Content Area */}
          <Box
            sx={{
              maxWidth: 1400,
              mx: "auto",
              px: { xs: 1.5, sm: 3, md: 4 },
              width: "100%",
              boxSizing: "border-box",
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