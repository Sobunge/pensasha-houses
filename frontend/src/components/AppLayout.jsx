import React from "react";
import Navbar from "./Navbar";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <MainFooter />
    </>
  );
}

export default AppLayout;
