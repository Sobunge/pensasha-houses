// src/pages/AdminPage/AdminDashboard.jsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

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
    <Box sx={{ minHeight: "100%" }}>
      {/* ===== Hero Section ===== */}
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
              src="/assets/images/admin-avatar.png"
              alt="Admin"
              sx={{
                width: 56,
                height: 56,
                bgcolor: "#f8b500",
                color: "#111",
              }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                Welcome back, Admin 👋
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Here’s what’s happening in your system today
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
            + Add New User
          </Button>
        </Card>
      </motion.div>

      {/* ===== Dashboard Stats ===== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          {cards.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <DashboardCard
                title={card.title}
                value={card.value}
                icon={card.icon}
              />
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* ===== Monthly Overview (Full Width) ===== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
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
          <SectionTitle>Monthly Overview</SectionTitle>
          <AdminChart />
        </Paper>
      </motion.div>

      {/* ===== Dashboard Sections (Responsive 2 per row) ===== */}
      <Grid
        container
        rowSpacing={4} columnSpacing={{ xs: 1, md: 3 }}
        sx={{ mt: 2 }}
        justifyContent="center" 
      >
        {sections.map((section, index) => (
          <Grid
            item
            xs={12}
            md={6}
            key={section.title}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ width: "100%" }}
            >
              <SectionTitle>{section.title}</SectionTitle>
              <Paper
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  bgcolor: "#fff",
                  minHeight: 50,
                  width: "100%",
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
