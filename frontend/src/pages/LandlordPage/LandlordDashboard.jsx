// src/pages/LandlordPage/LandlordDashboard.jsx
import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";

import DashboardStats from "./DashboardStats";
import PropertyManagementCard from "./PropertyManagementCard";
import FinancialOverviewCard from "./FinancialOverviewCard";
import TenantSummaryCard from "./TenantSummaryCard";
import RecentPaymentsCard from "./RecentPaymentsCard";
import MaintenanceRequestsCard from "./MaintenanceRequestsCard";

// Reusable Section Title
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
    <Box>
      {/* ===== Top Action Bar ===== */}
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#2a2a2a" }}>
            Portfolio Portfolio
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Managing 3 active properties
          </Typography>
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
            "&:hover": { bgcolor: "#ffc62c" },
          }}
        >
          + Add New Property
        </Button>
      </Stack>

      {/* ===== Dashboard Stats ===== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <DashboardStats />
      </motion.div>

      {/* ===== Dashboard Sections (Flex Layout) ===== */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          mt: 3,
          px: { xs: 2, md: 0 },
        }}
      >
        {sections.map((section, index) => (
          <Box
            key={section.title}
            sx={{
              flex: { xs: "1 1 100%", md: "0 0 350px" },
              minWidth: 320,
              display: "flex",
              flexDirection: "column",
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