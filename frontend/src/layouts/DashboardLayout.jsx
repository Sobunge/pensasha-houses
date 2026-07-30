// src/layouts/DashboardLayout.jsx
import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import UsersNavbar from "../components/UsersNavbar";
import UserSidebar from "../components/UserSidebar";
import UserFooter from "../components/UserFooter";
import ScrollToTopButton from "../components/ScrollToTopButton"; // <--- 1. Import component
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
        color: "#0F172A",
      }}
    >
      {/* Sidebar */}
      <UserSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          bgcolor: "#F8FAFC",
          height: "100vh",
        }}
      >
        <UsersNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />

        <Box
          ref={mainRef}
          component="main"
          role="main"
          id="mainContent" // <--- Already defined as "mainContent"
          tabIndex={-1}
          sx={{
            flexGrow: 1,
            mt: `${NAVBAR_HEIGHT}px`,
            overflowY: "auto",
            overflowX: "hidden",
            p: { xs: 2.5, md: 1 },
            outline: "none",
            display: "flex",
            flexDirection: "column",
            position: "relative", // Ensures relative positioning scope
          }}
        >
          <Box
            sx={{
              maxWidth: 1200,
              mx: "auto",
              width: "100%",
              flexGrow: 1,
            }}
          >
            <Outlet />
          </Box>

          <UserFooter />

          {/* 2. Pass containerId="mainContent" */}
          <ScrollToTopButton containerId="mainContent" />
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;