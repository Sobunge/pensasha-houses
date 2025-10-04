// src/pages/LandlordPage/LandlordDashboard.jsx
import React from "react";
import { Box, Typography, Card, Avatar, Button } from "@mui/material";
import { motion } from "framer-motion";

import DashboardStats from "./DashboardStats";
import PropertyManagementCard from "./PropertyManagementCard";
import FinancialOverviewCard from "./FinancialOverviewCard";
import TenantSummaryCard from "./TenantSummaryCard";
import RecentPaymentsCard from "./RecentPaymentsCard";
import MaintenanceRequestsCard from "./MaintenanceRequestsCard";

// Reusable Section Title (centered)
const SectionTitle = ({ children }) => (
  <Typography
    variant="subtitle2"
    sx={{
      textTransform: "uppercase",
      letterSpacing: 1,
      fontWeight: 600,
      mb: 2,
      color: "text.primary",
      textAlign: "center",
    }}
  >
    {children}
  </Typography>
);

const LandlordDashboard = () => {
  const sections = [
    { title: "Properties Overview", component: <PropertyManagementCard /> },
    { title: "Financial Snapshot", component: <FinancialOverviewCard /> },
    { title: "Tenant Summary", component: <TenantSummaryCard /> },
    { title: "Recent Payments", component: <RecentPaymentsCard /> },
    { title: "Maintenance Requests", component: <MaintenanceRequestsCard /> },
  ];

  return (
    <Box sx={{ minHeight: "100%" }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          sx={{
            mb: 4,
            p: { xs: 2, sm: 3 },
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: "#fff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src="/assets/images/landlord-avatar.png"
              alt="Landlord"
              sx={{ width: 56, height: 56, bgcolor: "#f8b500", color: "#111" }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                Welcome back, Samuel 👋
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                You’re managing 3 properties this month
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#f8b500",
              color: "#111",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              mt: { xs: 2, md: 0 },
              "&:hover": { bgcolor: "#ffc62c" },
            }}
          >
            + Add New Property
          </Button>
        </Card>
      </motion.div>

      {/* Dashboard Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <DashboardStats />
      </motion.div>

      {/* Dashboard Sections */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center", // center all cards horizontally
          gap: 2,
          mt: 3,
          px: { xs: 2, md: 0 },
        }}
      >
        {sections.map((section, index) => (
          <Box
            key={section.title}
            sx={{
              flex: "0 0 350px", // fixed width
              minWidth: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // center content inside card
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <SectionTitle>{section.title}</SectionTitle>
              {section.component}
            </motion.div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LandlordDashboard;
