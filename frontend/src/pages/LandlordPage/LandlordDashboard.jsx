// src/pages/LandlordPage/LandlordDashboard.jsx
import React from "react";
import { Box} from "@mui/material";
import { motion } from "framer-motion";

// Sub-components
import DashboardStats from "./DashboardStats";
import PropertyPerformanceCard from "./PropertyPerformanceCard";
import FinancialOverviewCard from "./FinancialOverviewCard";
import TenantSummaryCard from "./TenantSummaryCard";
import RecentPaymentsCard from "./RecentPaymentsCard";
import MaintenanceRequestsCard from "./MaintenanceRequestsCard";

// Motion wrapper styling helper
const motionContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const LandlordDashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 1, width: "100%" }}>
      {/* ===== 1. TOP HERO STATS ROW ===== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ width: "100%" }}
      >
        <DashboardStats />
      </motion.div>

      {/* ===== 2. MIDDLE ROW: PERFORMANCE & FINANCIAL OVERVIEW ===== */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 3,
          mt: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", lg: "calc(50% - 12px)" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
            style={motionContainerStyle}
          >
            <PropertyPerformanceCard />
          </motion.div>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", lg: "calc(50% - 12px)" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
            style={motionContainerStyle}
          >
            <FinancialOverviewCard />
          </motion.div>
        </Box>
      </Box>

      {/* ===== 3. BOTTOM ROW: PAYMENTS, MAINTENANCE & TENANTS ===== */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 3,
          width: "100%",
        }}
      >
        {/* TOP PAIR: Recent Payments & Maintenance Requests (Side-by-Side) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Stacks on mobile, side-by-side on tablet/desktop
            gap: 3,
            width: "100%",
          }}
        >
          {/* Recent Payments Card */}
          <Box
            sx={{
              width: { xs: "100%", md: "calc(50% - 12px)" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.2,
                ease: "easeOut",
              }}
              style={motionContainerStyle}
            >
              <RecentPaymentsCard />
            </motion.div>
          </Box>

          {/* Maintenance Requests Card */}
          <Box
            sx={{
              width: { xs: "100%", md: "calc(50% - 12px)" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.25,
                ease: "easeOut",
              }}
              style={motionContainerStyle}
            >
              <MaintenanceRequestsCard />
            </motion.div>
          </Box>
        </Box>

        {/* BOTTOM SINGLE: Tenant Summary (Full Width 100%) */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: 0.3,
              ease: "easeOut",
            }}
            style={motionContainerStyle}
          >
            <TenantSummaryCard />
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default LandlordDashboard;