import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import TenantNavbar from "./TenantNavbar";
import TenantSidebar from "./TenantSidebar";

function TenantDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <TenantNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <TenantSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Offset for AppBar height */}
        <Toolbar />
        <h2>Welcome Back, Tenant 👋</h2>
        <p>Here you can manage rent, property, maintenance, and more.</p>
      </Box>
    </Box>
  );
}

export default TenantDashboard;
