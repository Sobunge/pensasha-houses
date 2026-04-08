// src/pages/Dashboard/MainDashboard.jsx
import React from "react";
import { Box, Card, Avatar, Typography, Stack, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Auth/AuthContext";

// ===== IMPORT YOUR SPECIFIC DASHBOARD FILES =====
import AdminDashboard from "../AdminPage/AdminDashboard";
import LandlordDashboard from "../LandlordPage/LandlordDashboard";
import CaretakerDashboard from "../CaretakerPage/CaretakerDashboard";
import TenantDashboard from "../Tenant/TenantDashboard";

const MainDashboard = () => {
  const { user, activeRole, setActiveRole } = useAuth();

  if (!user) return null;

  // Map the role to the component
  const renderRoleDashboard = () => {
    switch (activeRole) {
      case "ROLE_ADMIN":     return <AdminDashboard />;
      case "ROLE_LANDLORD":  return <LandlordDashboard />;
      case "ROLE_CARETAKER": return <CaretakerDashboard />;
      case "ROLE_TENANT":    return <TenantDashboard />;
      default:               return <TenantDashboard />;
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "#f7f7f7", minHeight: "100vh" }}>
      
      {/* GLOBAL HERO & SWITCHER (Always stays at top) */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card sx={{ mb: 4, p: 2, borderRadius: 3, boxShadow: 3 }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "#f8b500", color: "#111", width: 48, height: 48 }}>
                {user.name?.[0] || "U"}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Welcome back{user?.name ? `, ${user.name}` : ""} 👋
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Role: <strong>{activeRole?.replace("ROLE_", "")}</strong>
                </Typography>
              </Box>
            </Box>

            {/* Switcher only shows if user has multiple roles */}
            {user.roles?.length > 1 && (
              <ToggleButtonGroup
                value={activeRole}
                exclusive
                onChange={(e, next) => next && setActiveRole(next)}
                size="small"
                color="primary"
                sx={{ bgcolor: "#f5f5f5" }}
              >
                {user.roles.map((role) => (
                  <ToggleButton key={role} value={role} sx={{ px: 3, fontWeight: 600 }}>
                    {role.replace("ROLE_", "")}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          </Stack>
        </Card>
      </motion.div>

      {/* DASHBOARD CONTENT AREA */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole} // Triggers animation on switch
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderRoleDashboard()}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default MainDashboard;