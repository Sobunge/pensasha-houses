// src/pages/Dashboard/MainDashboard.jsx
import React, { useMemo } from "react";
import { Box, Typography, Grid, Paper, Card, Avatar, ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Auth/AuthContext";

// ===== IMPORT WIDGETS =====
import UserTable from "../AdminPage/UserTable";
import PaymentTable from "../AdminPage/PaymentTable";
import PropertyTable from "../AdminPage/PropertyTable";
import TenantTable from "../AdminPage/TenantTable";
import PropertyManagementCard from "../LandlordPage/PropertyManagementCard";
import FinancialOverviewCard from "../LandlordPage/FinancialOverviewCard";
import PaymentsCard from "../../components/cards/PaymentsCard";
import MaintenanceCard from "../../components/cards/MaintenanceCard";
import MaintenanceOverviewCard from "../CaretakerPage/MaintenanceOverviewCard";
import WorkScheduleCard from "../CaretakerPage/WorkScheduleCard";

// ===== REUSABLE SECTION TITLE =====
const SectionTitle = ({ children }) => (
  <Typography
    variant="subtitle2"
    sx={{
      textTransform: "uppercase",
      letterSpacing: 1,
      fontWeight: 600,
      mb: 2,
      textAlign: "center",
    }}
  >
    {children}
  </Typography>
);

const MainDashboard = () => {
  // Assuming activeRole and setActiveRole are in your AuthContext
  const { user, activeRole, setActiveRole } = useAuth();

  // ===== DASHBOARD CONFIG =====
  // Added 'role' to each section to filter based on the switcher
  const sections = useMemo(
    () => [
      // Admin
      { title: "Users", component: <UserTable />, permission: "USER_VIEW", role: "ROLE_ADMIN" },
      { title: "All Payments", component: <PaymentTable />, permission: "RENT_VIEW", role: "ROLE_ADMIN" },
      { title: "All Properties", component: <PropertyTable />, permission: "PROPERTY_VIEW", role: "ROLE_ADMIN" },
      { title: "All Tenants", component: <TenantTable />, permission: "TENANT_VIEW", role: "ROLE_ADMIN" },

      // Landlord
      { title: "My Properties", component: <PropertyManagementCard />, permission: "PROPERTY_VIEW", role: "ROLE_LANDLORD" },
      { title: "Financial Overview", component: <FinancialOverviewCard />, permission: "RENT_VIEW", role: "ROLE_LANDLORD" },

      // Tenant
      { title: "My Payments", component: <PaymentsCard />, permission: "RENT_VIEW", role: "ROLE_TENANT" },
      { title: "Maintenance Requests", component: <MaintenanceCard />, permission: "MAINTENANCE_CREATE", role: "ROLE_TENANT" },

      // Caretaker
      { title: "Maintenance Overview", component: <MaintenanceOverviewCard />, permission: "MAINTENANCE_VIEW", role: "ROLE_CARETAKER" },
      { title: "Work Schedule", component: <WorkScheduleCard />, permission: "MAINTENANCE_VIEW", role: "ROLE_CARETAKER" },
    ],
    []
  );

  const hasPermission = useMemo(
    () => (perm) => Array.isArray(user?.permissions) && user.permissions.includes(perm),
    [user]
  );

  // ===== FILTER SECTIONS BASED ON ROLE + PERMISSIONS =====
  const visibleSections = useMemo(() => {
    if (!user || !activeRole) return [];
    return sections.filter((section) => 
      section.role === activeRole && (!section.permission || hasPermission(section.permission))
    );
  }, [sections, user, hasPermission, activeRole]);

  if (!user) return null;

  return (
    <Box sx={{ minHeight: "100%", pb: 4 }}>
      {/* HERO & ROLE SWITCHER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          sx={{
            mb: 4,
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            justifyContent="space-between" 
            alignItems="center" 
            spacing={2}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "#f8b500", color: "#111", width: 50, height: 50 }}>
                {user.name?.[0] || "U"}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Welcome back, {user.name || "User"} 👋
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Viewing dashboard as: <strong>{activeRole?.replace("ROLE_", "")}</strong>
                </Typography>
              </Box>
            </Box>

            {/* THE SWITCHER */}
            {user.roles?.length > 1 && (
              <ToggleButtonGroup
                value={activeRole}
                exclusive
                onChange={(e, next) => next && setActiveRole(next)}
                size="small"
                color="primary"
                sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}
              >
                {user.roles.map((role) => (
                  <ToggleButton key={role} value={role} sx={{ px: 2, fontWeight: 600 }}>
                    {role.replace("ROLE_", "")}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          </Stack>
        </Card>
      </motion.div>

      {/* DYNAMIC SECTIONS WITH ANIMATION */}
      <AnimatePresence mode="wait">
        <Grid container spacing={3} component={motion.div} key={activeRole}>
          {visibleSections.length > 0 ? (
            visibleSections.map((section, index) => (
              <Grid item xs={12} md={6} key={section.title}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <SectionTitle>{section.title}</SectionTitle>
                  <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2, minHeight: 150 }}>
                    {section.component}
                  </Paper>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
                No widgets available for this role.
              </Typography>
            </Grid>
          )}
        </Grid>
      </AnimatePresence>
    </Box>
  );
};

export default MainDashboard;