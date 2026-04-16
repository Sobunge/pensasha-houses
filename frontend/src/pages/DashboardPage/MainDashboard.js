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

  const ActiveDashboard =
    dashboardMap[activeRole] || TenantDashboard;

  const handleRoleChange = (event, nextRole) => {
    if (!nextRole) return;

    // 🔒 enforce allowed roles only
    if (user.roles?.includes(nextRole)) {
      setActiveRole(nextRole);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#fafafa", minHeight: "100vh" }}>

      {/* HERO / HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card
          elevation={0}
          sx={{
            mb: 4,
            p: { xs: 2, sm: 3 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
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
                  bgcolor: "#f8b500",
                  color: "#000",
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  boxShadow: "0 4px 12px rgba(248, 181, 0, 0.3)",
                }}
              >
                {user.name?.[0] || "U"}
              </Avatar>

              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 900, color: "#1a1a1a", lineHeight: 1.2 }}
                >
                  Welcome back{user?.name ? `, ${user.name}` : ""} 👋
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5, fontWeight: 500 }}
                >
                  Managing as{" "}
                  <span style={{ color: "#f8b500", fontWeight: 800 }}>
                    {activeRole?.replace("ROLE_", "")}
                  </span>
                </Typography>
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
                  bgcolor: "rgba(0,0,0,0.03)",
                  p: 0.5,
                  borderRadius: 3,
                  border: "none",
                  width: { xs: "100%", md: "auto" },
                  "& .MuiToggleButtonGroup-grouped": {
                    border: 0,
                    borderRadius: 2.5,
                    mx: 0.2,
                    "&.Mui-selected": {
                      bgcolor: "background.paper",
                      color: "#000",
                      fontWeight: 800,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      "&:hover": { bgcolor: "background.paper" },
                    },
                    "&:not(.Mui-selected)": {
                      color: "text.secondary",
                      fontWeight: 600,
                    },
                  },
                }}
              >
                {user.roles.map((role) => (
                  <ToggleButton
                    key={role}
                    value={role}
                    sx={{
                      px: 3,
                      py: 1,
                      textTransform: "none",
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ActiveDashboard />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default MainDashboard;