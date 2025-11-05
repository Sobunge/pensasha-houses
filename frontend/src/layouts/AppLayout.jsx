import React from "react";
import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main content area with bottom padding to avoid overlap */}
      <main style={{ flex: 1, paddingBottom: "60px" }}>
        <Outlet />
      </main>

      {/* Fixed footer */}
      <MainFooter />
    </div>
  );
}

export default AppLayout;
