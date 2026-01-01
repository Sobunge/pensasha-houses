import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";

function AppLayout() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="background.default">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <Box component="main" flex={1}>
        <Outlet />
      </Box>

      {/* Footer */}
      <MainFooter />
    </Box>
  );
}

export default AppLayout;
