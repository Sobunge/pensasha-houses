// src/pages/Dashboard/MainDashboard.jsx
import React from "react";
import {
  Box,
  Card,
  Avatar,
  Typography,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Auth/AuthContext";

// ===== DASHBOARDS =====
import AdminDashboard from "../AdminPage/AdminDashboard";
import LandlordDashboard from "../LandlordPage/LandlordDashboard";
import CaretakerDashboard from "../CaretakerPage/CaretakerDashboard";
import TenantDashboard from "../Tenant/TenantDashboard";

const dashboardMap = {
  ROLE_ADMIN: AdminDashboard,
  ROLE_LANDLORD: LandlordDashboard,
  ROLE_CARETAKER: CaretakerDashboard,
  ROLE_TENANT: TenantDashboard,
};

const MainDashboard = () => {
  const { user, activeRole, setActiveRole } = useAuth();

  if (!user) return null;

  const ActiveDashboard = dashboardMap[activeRole] || TenantDashboard;

  const handleRoleChange = (event, nextRole) => {
    if (!nextRole) return;

    // 🔒 enforce allowed roles only
    if (user.roles?.includes(nextRole)) {
      setActiveRole(nextRole);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: "#F8FAFC", minHeight: "100vh" }}>
      {/* HERO / HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card
  elevation={0}
  sx={{
    mb: 4,
    p: { xs: 2.5, sm: 3 },
    borderRadius: "16px",
    bgcolor: "#FFFFFF",
    // 1. Gold border
    border: "1.5px solid #D4AF37",
    // 2. Enhanced shadow for prominence
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  }}
>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={3}
          >
            {/* USER INFO */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
              <Avatar
                sx={{
                  bgcolor: "#0F172A", // Deep Executive Slate
                  color: "#D4AF37", // Pensasha Gold
                  border: "2px solid rgba(212, 175, 55, 0.4)",
                  width: { xs: 52, sm: 60 },
                  height: { xs: 52, sm: 60 },
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.12)",
                }}
              >
                {user.name?.[0]?.toUpperCase() || "U"}
              </Avatar>

              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 700,
                    color: "#0F172A",
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Welcome back{user?.name ? `, ${user.name}` : ""} 👋
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.75 }}>
                  <Typography variant="body2" sx={{ color: "#64748B", fontWeight: 500 }}>
                    Managing as
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: "rgba(212, 175, 55, 0.12)",
                      color: "#B5922B",
                      px: 1.2,
                      py: 0.25,
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      letterSpacing: "0.05em",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      textTransform: "uppercase",
                    }}
                  >
                    {activeRole?.replace("ROLE_", "")} MODE
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* ROLE SWITCHER */}
            {user.roles?.length > 1 && (
              <ToggleButtonGroup
                value={activeRole}
                exclusive
                onChange={handleRoleChange}
                size="small"
                sx={{
                  bgcolor: "#F1F5F9",
                  p: 0.5,
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  width: { xs: "100%", md: "auto" },
                  "& .MuiToggleButtonGroup-grouped": {
                    border: 0,
                    borderRadius: "8px",
                    mx: 0.3,
                    transition: "all 0.2s ease",
                    "&.Mui-selected": {
                      bgcolor: "#0F172A", // Active role background
                      color: "#D4AF37", // Active role text
                      fontWeight: 700,
                      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.18)",
                      "&:hover": { bgcolor: "#1E293B" },
                    },
                    "&:not(.Mui-selected)": {
                      color: "#64748B",
                      fontWeight: 600,
                      "&:hover": { bgcolor: "rgba(15, 23, 42, 0.05)", color: "#0F172A" },
                    },
                  },
                }}
              >
                {user.roles.map((role) => (
                  <ToggleButton
                    key={role}
                    value={role}
                    sx={{
                      px: 2.5,
                      py: 0.85,
                      textTransform: "none",
                      fontSize: "0.85rem",
                      flexGrow: { xs: 1, md: 0 },
                    }}
                  >
                    {role.replace("ROLE_", "")}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          </Stack>
        </Card>
      </motion.div>

      {/* DASHBOARD CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ActiveDashboard />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default MainDashboard;