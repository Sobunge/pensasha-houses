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

  const roles = Array.isArray(user?.roles) ? user.roles.filter(r => typeof r === "string") : [];
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
          <Typography variant="body1" align="left" sx={{ color: "text.secondary" }}>
            No dashboard available for this role
          </Typography>
        );
    }
  };

  if (roleTabs.length === 0)
    return (
      <Typography variant="body1" align="center" sx={{ color: "text.secondary", mt: 4 }}>
        You do not have access to any dashboards.
      </Typography>
    );

  return (
    <Box>
      {/* Role Selector Tabs with Glassmorphism Container */}
      {roleTabs.length > 1 && (
        <Box 
          sx={{ 
            mb: 3,
            display: "flex", 
            justifyContent: "center",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            centered
            sx={(theme) => ({
              bgcolor: theme.palette.background.paper,
              borderRadius: "12px",
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: `0px 4px 20px ${theme.palette.primary.main}0D`,
              p: 0.5,
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.secondary.main, // Champagne gold active bar
                height: "3px",
                borderRadius: "3px",
              },
            })}
          >
            {roleTabs.map((role) => {
              const label =
                typeof role === "string"
                  ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
                  : "Unknown";

              return (
                <Tab
                  key={role}
                  label={label}
                  sx={(theme) => ({
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: theme.palette.text.secondary,
                    borderRadius: "8px",
                    transition: "all 0.2s ease-in-out",
                    "&.Mui-selected": {
                      color: theme.palette.primary.main, // Active tab text color
                    },
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor: `${theme.palette.secondary.main}14`, // Soft gold hover
                    },
                  })}
                />
              );
            })}
          </Tabs>
        </Box>
      )}

      {/* Render selected dashboard */}
      <Box>{renderDashboard(roleTabs[activeTab])}</Box>
    </Box>
  );
};

export default RoleSwitcherDashboard;