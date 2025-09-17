// src/components/AppLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Public navbar */}
      <Navbar />

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <MainFooter />
    </div>
  );
}

export default AppLayout;
