// src/layouts/RoleSwitcherDashboard.jsx
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import TenantDashboard from "../pages/Tenant/TenantDashboard";
import LandlordDashboard from "../pages/LandlordPage/LandlordDashboard";
import CaretakerDashboard from "../pages/CaretakerPage/CaretakerDashboard";
import AdminDashboard from "../pages/AdminPage/AdminDashboard";
import { useAuth } from "../pages/Auth/AuthContext";

const RoleSwitcherDashboard = () => {
  const { user } = useAuth();

  // Ensure roles is always an array of strings
  const roles = Array.isArray(user?.roles) ? user.roles.filter(r => typeof r === "string") : [];

  // Filter only the dashboards we support
  const roleTabs = roles.filter((r) =>
    ["TENANT", "LANDLORD", "CARETAKER", "ADMIN"].includes(r.toUpperCase())
  );

  const [activeTab, setActiveTab] = useState(0);

  const renderDashboard = (role) => {
    if (!role || typeof role !== "string") return null;

    switch (role.toUpperCase()) {
      case "TENANT":
        return <TenantDashboard />;
      case "LANDLORD":
        return <LandlordDashboard />;
      case "CARETAKER":
        return <CaretakerDashboard />;
      case "ADMIN":
        return <AdminDashboard />;
      default:
        return (
          <Typography variant="body1" align="left">
            No dashboard available for this role
          </Typography>
        );
    }
  };

  if (roleTabs.length === 0)
    return (
      <Typography variant="body1" align="center">
        You do not have access to any dashboards.
      </Typography>
    );

  return (
    <Box>
      {/* Role Selector Tabs */}
      {roleTabs.length > 1 && (
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          centered
          sx={{ mb: 3 }}
        >
          {roleTabs.map((role) => {
            // Ensure label is a string and safe for MUI
            const label =
              typeof role === "string"
                ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
                : "Unknown";

            return <Tab key={role} label={label} />;
          })}
        </Tabs>
      )}

      {/* Render selected dashboard */}
      <Box>{renderDashboard(roleTabs[activeTab])}</Box>
    </Box>
  );
};

export default RoleSwitcherDashboard;