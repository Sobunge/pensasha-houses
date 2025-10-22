import React from "react";
import { Box, Typography, Card, Avatar, Button } from "@mui/material";
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
              src="/assets/images/caretaker-avatar.png"
              alt="Caretaker"
              sx={{ width: 56, height: 56, bgcolor: "#1976d2", color: "#fff" }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                Welcome back, Samuel 👋
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                You have 3 pending tasks and 2 new messages today
              </Typography>
            </Box>
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
              mt: { xs: 2, md: 0 },
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            Start Today's Tasks
          </Button>
        </Card>
      </motion.div>

      {/* Dashboard Stats Placeholder (optional) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* You can replace this with a custom CaretakerStats component later */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          {[
            { label: "Tasks Completed", value: "7" },
            { label: "Pending Requests", value: "3" },
            { label: "New Messages", value: "2" },
          ].map((stat, i) => (
            <Card
              key={i}
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: 2,
                minWidth: 160,
                textAlign: "center",
                bgcolor: "#fff",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#1976d2" }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Card>
          ))}
        </Box>
      </motion.div>

      {/* Dashboard Sections */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mt: 2,
          px: { xs: 2, md: 0 },
        }}
      >
        {sections.map((section, index) => (
          <Box
            key={section.title}
            sx={{
              flex: "0 0 350px",
              minWidth: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
