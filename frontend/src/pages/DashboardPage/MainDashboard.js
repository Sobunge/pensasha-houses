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

    // Enforce allowed roles only
    if (user.roles?.includes(nextRole)) {
      setActiveRole(nextRole);
    }
  };

  return (
    <>
      {/* HERO / WELCOME CARD */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Card
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 2 },
            bgcolor: "transparent",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={3}
          >
            {/* USER INFO & AVATAR */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main", // Deep Obsidian #0F172A
                  color: "secondary.main", // Champagne Gold #D4AF37
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
                    color: "primary.main",
                    lineHeight: 1.2,
                  }}
                >
                  Welcome back{user?.name ? `, ${user.name}` : ""} 👋
                </Typography>
              </Box>
            </Box>

            {/* MULTI-ROLE SWITCHER (Rendered only if user has more than 1 role) */}
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
                  border: "1px solid",
                  borderColor: "divider",
                  width: { xs: "100%", md: "auto" },
                  "& .MuiToggleButtonGroup-grouped": {
                    border: 0,
                    borderRadius: "8px",
                    mx: 0.3,
                    transition: "all 0.2s ease",
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "secondary.main",
                      fontWeight: 700,
                      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.18)",
                      "&:hover": { bgcolor: "#1E293B" },
                    },
                    "&:not(.Mui-selected)": {
                      color: "text.secondary",
                      fontWeight: 600,
                      "&:hover": { bgcolor: "rgba(15, 23, 42, 0.05)", color: "text.primary" },
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

      {/* DYNAMIC ACTIVE DASHBOARD CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <ActiveDashboard />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default MainDashboard;