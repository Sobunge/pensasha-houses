// src/pages/Dashboard/MainDashboard.jsx
import React from "react";
import { Box, Typography, Grid, Paper, Card, Avatar } from "@mui/material";
import { motion } from "framer-motion";

import { useAuth } from "../Auth/AuthContext";

// ===== IMPORT YOUR WIDGETS =====
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

// ===== REUSABLE TITLE =====
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

  // ===== PERMISSION CHECK =====
  const hasPermission = (perm) =>
    user?.permissions?.includes(perm);

  // ===== DASHBOARD CONFIG (CORE) =====
  const sections = [
    // ----- ADMIN -----
    {
      title: "Users",
      component: <UserTable />,
      permission: "VIEW_USERS",
    },
    {
      title: "All Payments",
      component: <PaymentTable />,
      permission: "VIEW_ALL_PAYMENTS",
    },
    {
      title: "All Properties",
      component: <PropertyTable />,
      permission: "VIEW_PROPERTIES",
    },
    {
      title: "All Tenants",
      component: <TenantTable />,
      permission: "VIEW_TENANTS",
    },

    // ----- LANDLORD -----
    {
      title: "My Properties",
      component: <PropertyManagementCard />,
      permission: "VIEW_OWN_PROPERTIES",
    },
    {
      title: "Financial Overview",
      component: <FinancialOverviewCard />,
      permission: "VIEW_FINANCIALS",
    },

    // ----- TENANT -----
    {
      title: "My Unit",
      component: <PropertyInfoCard />,
      permission: "VIEW_OWN_UNIT",
    },
    {
      title: "My Payments",
      component: <PaymentsCard />,
      permission: "VIEW_OWN_PAYMENTS",
    },
    {
      title: "Maintenance Requests",
      component: <MaintenanceCard />,
      permission: "CREATE_MAINTENANCE_REQUEST",
    },

    // ----- CARETAKER -----
    {
      title: "Maintenance Overview",
      component: <MaintenanceOverviewCard />,
      permission: "VIEW_MAINTENANCE",
    },
    {
      title: "Work Schedule",
      component: <WorkScheduleCard />,
      permission: "VIEW_WORK_SCHEDULE",
    },
  ];

  // ===== FILTER BASED ON PERMISSIONS =====
  const visibleSections = sections.filter((section) =>
    hasPermission(section.permission)
  );

  return (
    <Box sx={{ minHeight: "100%" }}>
      {/* ===== HERO SECTION ===== */}
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
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "#f8b500", color: "#111" }}>
              {user?.name?.[0] || "U"}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Welcome back, {user?.name || "User"} 👋
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your dashboard is customized based on your permissions
              </Typography>
            </Box>
          </Box>
        </Card>
      </motion.div>

      {/* ===== DYNAMIC SECTIONS ===== */}
      <Grid container spacing={3}>
        {visibleSections.map((section, index) => (
          <Grid item xs={12} md={6} key={section.title}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <SectionTitle>{section.title}</SectionTitle>

              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                  minHeight: 100,
                }}
              >
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