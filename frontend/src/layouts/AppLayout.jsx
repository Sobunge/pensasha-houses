import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh", 
        bgcolor: "background.default", 
        color: "text.primary" 
      }}
    >
      <Navbar />

      <Box 
        component="main" 
        sx={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column",
          // Removed top padding so sticky/fixed transparent navbar overlays page heroes cleanly
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}

export default AppLayout;