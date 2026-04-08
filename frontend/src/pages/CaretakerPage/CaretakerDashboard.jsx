// src/pages/CaretakerPage/CaretakerDashboard.jsx
import React from "react";
import { Box, Typography, Card, Button, Stack, Grid } from "@mui/material";
import { motion } from "framer-motion";

// Import caretaker cards
import MaintenanceOverviewCard from "./MaintenanceOverviewCard";
import TenantMessagesCard from "./TenantMessagesCard";
import PropertyConditionCard from "./PropertyConditionCard";
import WorkScheduleCard from "./WorkScheduleCard";
import ActivityFeedCard from "./ActivityFeedCard";

// Reusable section title
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

const CaretakerDashboard = () => {
  const sections = [
    { title: "Maintenance Overview", component: <MaintenanceOverviewCard /> },
    { title: "Tenant Messages", component: <TenantMessagesCard /> },
    { title: "Property Condition", component: <PropertyConditionCard /> },
    { title: "Work Schedule", component: <WorkScheduleCard /> },
    { title: "Activity Feed", component: <ActivityFeedCard /> },
  ];

  const stats = [
    { label: "Tasks Completed", value: "7" },
    { label: "Pending Requests", value: "3" },
    { label: "New Messages", value: "2" },
  ];

  return (
    <Box>
      {/* ===== Action Bar ===== */}
      <Stack 
        direction={{ xs: "column", sm: "row" }} 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ mb: 4, gap: 2 }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#2a2a2a" }}>
            Caretaker Console
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You have 3 pending tasks requiring attention
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            "&:hover": { bgcolor: "#1565c0" },
          }}
        >
          Start Today's Tasks
        </Button>
      </Stack>

      {/* ===== Quick Stats ===== */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                  textAlign: "center",
                  bgcolor: "#fff",
                  borderLeft: "4px solid #1976d2"
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1976d2" }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* ===== Dashboard Sections (Flex Layout) ===== */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          mt: 2,
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

export default CaretakerDashboard;