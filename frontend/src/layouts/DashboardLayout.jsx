// src/components/DashboardLayout.jsx
import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import UsersNavbar from "../components/UsersNavbar";
import UserSidebar from "../components/UserSidebar";
import MainFooter from "../components/MainFooter";
import { useAuth } from "../pages/Auth/AuthContext";

function DashboardLayout() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <UserSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <UsersNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />

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
          <Toolbar /> {/* Spacer below fixed navbar */}
          <Outlet />
        </Box>

        {/* Footer */}
        <MainFooter />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
