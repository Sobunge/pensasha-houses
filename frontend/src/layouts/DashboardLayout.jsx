// src/components/DashboardLayout.jsx
import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import UsersNavbar from "../components/UsersNavbar";
import UserSidebar from "../components/UserSidebar";
import MainFooter from "../components/MainFooter";
import { useAuth } from "../pages/Auth/AuthContext";

function DashboardLayout() {
  const { user } = useAuth(); // Get logged-in user
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent rendering if user is not logged in
  if (!user) return null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <UserSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <UsersNavbar user={user} onMenuClick={() => setMobileOpen(!mobileOpen)} />

        {/* Page content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            bgcolor: "#f7f7f7",
            minHeight: "calc(100vh - 64px - 64px)", // Adjust for navbar & footer
          }}
        >
          <Toolbar /> {/* Push content below navbar */}
          <Outlet /> {/* Render the current dashboard page */}
        </Box>

        {/* Footer */}
        <MainFooter />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
