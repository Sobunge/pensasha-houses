// src/pages/LandlordPage/LandlordDashboard.jsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Sub-components
import DashboardStats from "./DashboardStats";
import PropertyPerformanceCard from "./PropertyPerformanceCard";
import FinancialOverviewCard from "./FinancialOverviewCard";
import TenantSummaryCard from "./TenantSummaryCard";
import RecentPaymentsCard from "./RecentPaymentsCard";
import MaintenanceRequestsCard from "./MaintenanceRequestsCard";

// Reusable Section Title matching Obsidian & Gold typography
const SectionTitle = ({ children }) => (
  <Typography
    variant="subtitle2"
    sx={{
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      fontWeight: 700,
      fontSize: "0.75rem",
      mb: 1.5,
      color: "text.secondary",
    }}
  >
    {children}
  </Typography>
);

const LandlordDashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 1 }}>
      {/* ===== 1. TOP HERO STATS ROW ===== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <DashboardStats />
      </motion.div>

      {/* ===== 2. MIDDLE ROW: PERFORMANCE & FINANCIAL SNAPSHOT ===== */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
            style={{ height: "100%" }}
          >
            <SectionTitle>Properties Performance</SectionTitle>
            <PropertyPerformanceCard />
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
            style={{ height: "100%" }}
          >
            <SectionTitle>Financial Overview</SectionTitle>
            <FinancialOverviewCard />
          </motion.div>
        </Grid>
      </Grid>

      {/* ===== 3. BOTTOM ROW: PAYMENTS, MAINTENANCE, & TENANT SUMMARY ===== */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
            style={{ height: "100%" }}
          >
            <SectionTitle>Recent Payments</SectionTitle>
            <RecentPaymentsCard />
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25, ease: "easeOut" }}
            style={{ height: "100%" }}
          >
            <SectionTitle>Maintenance Requests</SectionTitle>
            <MaintenanceRequestsCard />
          </motion.div>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
            style={{ height: "100%" }}
          >
            <SectionTitle>Tenant Summary</SectionTitle>
            <TenantSummaryCard />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandlordDashboard;