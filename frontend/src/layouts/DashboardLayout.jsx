import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import UsersNavbar from "../components/UsersNavbar";
import UserSidebar from "../components/UserSidebar";
import UserFooter from "../components/UserFooter";
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

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f7f7f7",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* Navbar */}
        <UsersNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />

        {/* Page content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            pb: "60px", // space for fixed footer
            overflowY: "auto",
            scrollbarWidth: "none", // hides scrollbar in Firefox
            msOverflowStyle: "none", // hides scrollbar in IE/Edge
            "&::-webkit-scrollbar": {
              display: "none", // hides scrollbar in Chrome/Safari
            },
          }}
        >
          <Toolbar /> {/* Spacer for fixed Navbar */}
          <Outlet />
        </Box>

        {/* Sticky Footer */}
        <UserFooter />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
