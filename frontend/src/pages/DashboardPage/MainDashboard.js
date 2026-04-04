// src/pages/Dashboard/MainDashboard.jsx
import React, { useMemo } from "react";
import { Box, Typography, Grid, Paper, Card, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "../Auth/AuthContext";

// ===== IMPORT WIDGETS =====
import UserTable from "../AdminPage/UserTable";
import PaymentTable from "../AdminPage/PaymentTable";
import PropertyTable from "../AdminPage/PropertyTable";
import TenantTable from "../AdminPage/TenantTable";

import PropertyManagementCard from "../LandlordPage/PropertyManagementCard";
import FinancialOverviewCard from "../LandlordPage/FinancialOverviewCard";

import PropertyInfoCard from "../../components/cards/PropertyInfoCard";
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
  const { user } = useAuth();
  console.log("Current user:", user);
  console.log("User permissions:", user?.permissions);

  // ===== DASHBOARD CONFIG =====
  const sections = useMemo(
    () => [
      // Admin
      { title: "Users", component: <UserTable />, permission: "USER_VIEW" },
      { title: "All Payments", component: <PaymentTable />, permission: "RENT_VIEW" },
      { title: "All Properties", component: <PropertyTable />, permission: "PROPERTY_VIEW" },
      { title: "All Tenants", component: <TenantTable />, permission: "TENANT_VIEW" },

      // Landlord
      { title: "My Properties", component: <PropertyManagementCard />, permission: "PROPERTY_VIEW" },
      { title: "Financial Overview", component: <FinancialOverviewCard />, permission: "RENT_VIEW" },

      // Tenant
     // { title: "My Unit", component: <PropertyInfoCard />, permission: "PROPERTY_VIEW" },
      { title: "My Payments", component: <PaymentsCard />, permission: "RENT_VIEW" },
      { title: "Maintenance Requests", component: <MaintenanceCard />, permission: "MAINTENANCE_CREATE" },

      // Caretaker
      { title: "Maintenance Overview", component: <MaintenanceOverviewCard />, permission: "MAINTENANCE_VIEW" },
      { title: "Work Schedule", component: <WorkScheduleCard />, permission: "MAINTENANCE_VIEW" },
    ],
    []
  );

  // ===== HELPER TO CHECK PERMISSIONS =====
  const hasPermission = useMemo(
    () => (perm) => Array.isArray(user?.permissions) && user.permissions.includes(perm),
    [user] // recompute only when user changes
  );

  // ===== FILTER SECTIONS BASED ON USER PERMISSIONS =====
  const visibleSections = useMemo(() => {
    if (!user) return [];
    return sections.filter((section) => !section.permission || hasPermission(section.permission));
  }, [sections, user, hasPermission]); // include hasPermission

  // ===== EARLY RETURN IF USER NOT LOADED =====
  if (!user) return null;

  return (
    <Box sx={{ minHeight: "100%" }}>
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          sx={{
            mb: 4,
            p: 3,
            display: "flex",
            gap: 2,
            alignItems: "center",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Avatar sx={{ bgcolor: "#f8b500", color: "#111" }}>
            {user.name?.[0] || "U"}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Welcome back, {user.name || "User"} 👋
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your dashboard is customized based on your permissions
            </Typography>
          </Box>
        </Card>
      </motion.div>

      {/* DYNAMIC SECTIONS */}
      <Grid container spacing={3}>
        {visibleSections.map((section, index) => (
          <Grid item xs={12} md={6} key={section.title}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <SectionTitle>{section.title}</SectionTitle>
              <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2, minHeight: 100 }}>
                {section.component}
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainDashboard;