import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";

function AppLayout() {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh", 
        bgcolor: "background.default" 
      }}
    >
      {/* 1. FIXED NAVBAR */}
      <Navbar />

      {/* 2. MAIN CONTENT AREA */}
      <Box 
        component="main" 
        sx={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column",
          // This pt (padding-top) prevents content from hiding under the fixed Navbar
          pt: { xs: "56px", md: "64px" },
        }}
      >
        <Outlet />
      </Box>

      {/* 3. FOOTER */}
      <MainFooter />
    </Box>
  );
}

export default AppLayout;