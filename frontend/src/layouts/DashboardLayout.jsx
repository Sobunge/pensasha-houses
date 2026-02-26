// src/layouts/DashboardLayout.jsx
import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import UsersNavbar from "../components/UsersNavbar";
import UserSidebar from "../components/UserSidebar";
import UserFooter from "../components/UserFooter";
import { useAuth } from "../pages/Auth/AuthContext";
import { NAVBAR_HEIGHT } from "../layouts/constants";

function DashboardLayout() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef = useRef(null);

  // Move focus to main content when mobile drawer closes
  useEffect(() => {
    if (!mobileOpen && mainRef.current) {
      mainRef.current.focus();
    }
  }, [mobileOpen]);

  // If user not logged in, render nothing
  if (!user) return null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <UserSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Column */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0, // needed for flex overflow
          bgcolor: "#f7f7f7",
        }}
      >
        {/* Navbar */}
        <UsersNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />

        {/* Scrollable main content */}
        <Box
          ref={mainRef}
          component="main"
          role="main"
          tabIndex={-1}
          sx={{
            flexGrow: 1,
            mt: `${NAVBAR_HEIGHT}px`,
            overflowY: "auto",
            minHeight: 0,
            p: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
            <Outlet />
          </Box>
        </Box>

        {/* Footer */}
        <UserFooter />
      </Box>
    </Box>
  );
}

export default DashboardLayout;