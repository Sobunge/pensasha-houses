// src/pages/AdminPage/AdminDashboard.jsx
import React from "react";
import { Box, Typography, Button, Grid, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";

// ===== COMPONENTS =====
import DashboardCard from "./DashboardCard";
import AdminChart from "./AdminChart";
import TenantTable from "./TenantTable";
import PropertyTable from "./PropertyTable";
import PaymentTable from "./PaymentTable";
import CaretakerTable from "./CaretakerTable";
import UserTable from "./UserTable";
import SystemSettings from "./SystemSettings";

// --- Reusable Section Title ---
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

const AdminDashboard = () => {
  // --- Dashboard Summary Cards ---
  const cards = [
    { title: "Total Tenants", value: "120", icon: "👥" },
    { title: "Total Properties", value: "18", icon: "🏠" },
    { title: "Payments Received", value: "Ksh 245,000", icon: "💰" },
    { title: "Pending Payments", value: "Ksh 35,000", icon: "⏳" },
  ];

  // --- Dashboard Sections ---
  const sections = [
    { title: "Tenants Overview", component: <TenantTable /> },
    { title: "Caretakers Overview", component: <CaretakerTable /> },
    { title: "Properties Overview", component: <PropertyTable /> },
    { title: "Payments Overview", component: <PaymentTable /> },
    { title: "Users Overview", component: <UserTable /> },
    { title: "System Settings", component: <SystemSettings /> },
  ];

  return (
    <Box>
      {/* ===== Top Action Bar ===== */}
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#2a2a2a" }}>
          System Overview
        </Typography>
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
          + Add New User
        </Button>
      </Stack>

      {/* ===== Dashboard Stats ===== */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <DashboardCard
                title={card.title}
                value={card.value}
                icon={card.icon}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* ===== Monthly Overview ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: "#fff",
            mb: 4,
          }}
        >
          <SectionTitle>Monthly Revenue & Growth</SectionTitle>
          <AdminChart />
        </Paper>
      </motion.div>

      {/* ===== Management Tables ===== */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {sections.map((section, index) => (
          <Grid item xs={12} md={6} key={section.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SectionTitle>{section.title}</SectionTitle>
              <Paper
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  bgcolor: "#fff",
                  overflow: "hidden", // Keeps table corners rounded
                  minHeight: 300,
                  display: "flex",
                  flexDirection: "column",
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

export default AdminDashboard;