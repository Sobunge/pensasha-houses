import React, { useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import TenantNavbar from "./TenantNavbar";
import TenantSidebar from "./TenantSidebar";

function TenantDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <TenantNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <TenantSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Offset for AppBar height */}
        <Toolbar />

        {/* Dashboard Title */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mb: 1, color: "#111111" }}
        >
          Dashboard
        </Typography>

        <Typography variant="body1" sx={{ color: "#555", mb: 3 }}>
          Welcome back, Tenant 👋. Here you can manage rent, property,
          maintenance, and more.
        </Typography>

        {/* Future content goes here */}
      </Box>
    </Box>
  );
}

export default TenantDashboard;
