import React, { useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Grid,
  Card,
  Button,
  Avatar,
} from "@mui/material";
import TenantNavbar from "./TenantNavbar";
import TenantSidebar from "./TenantSidebar";
import PaymentIcon from "@mui/icons-material/Payment";


// Import cards
import RentStatusCard from "./RentStatusCard";
import PropertyInfoCard from "./PropertyInfoCard";
import MaintenanceCard from "./MaintenanceCard";
import AnnouncementsCard from "./AnnouncementsCard";
import DocumentsCard from "./DocumentsCard";
import PaymentsCard from "./PaymentsCard";

function TenantDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <TenantNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <TenantSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          bgcolor: "#f7f7f7",
          minHeight: "100vh",
        }}
      >
        {/* Offset for AppBar height */}
        <Toolbar />

        {/* ===== Hero Summary Card ===== */}
        <Card
          sx={{
            mb: 4,
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src="/assets/images/tenant-avatar.png"
              alt="Tenant"
              sx={{ width: 56, height: 56, bgcolor: "#f8b500", color: "#111" }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#111" }}>
                Welcome back, John Doe 👋
              </Typography>
              <Typography variant="body2" sx={{ color: "#555" }}>
                Apartment A-12, Pensasha Towers
              </Typography>
              <Typography variant="body2" sx={{ color: "red", mt: 0.5 }}>
                Rent Due: Sept 5, 2025 (Overdue)
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<PaymentIcon />}
            sx={{
              backgroundColor: "#f8b500",
              color: "#111",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              "&:hover": { backgroundColor: "#c59000" },
            }}
          >
            Pay Rent Now
          </Button>
        </Card>

        {/* ===== Section: Rent & Property ===== */}
        <SectionTitle title="Your Rent & Property" />
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} lg={4}>
            <CardWrapper>
              <RentStatusCard />
            </CardWrapper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CardWrapper>
              <PaymentsCard />
            </CardWrapper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CardWrapper>
              <PropertyInfoCard />
            </CardWrapper>
          </Grid>
        </Grid>

        {/* ===== Section: Requests & Updates ===== */}
        <SectionTitle title="Requests & Updates" />
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} lg={4}>
            <CardWrapper>
              <MaintenanceCard />
            </CardWrapper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CardWrapper>
              <AnnouncementsCard />
            </CardWrapper>
          </Grid>
        </Grid>

        {/* ===== Section: Documents ===== */}
        <SectionTitle title="Your Documents" />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <CardWrapper>
              <DocumentsCard />
            </CardWrapper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

/* Section Title component */
const SectionTitle = ({ title }) => (
  <Typography
    variant="subtitle2"
    sx={{
      textTransform: "uppercase",
      letterSpacing: 1,
      fontWeight: 600,
      mb: 2,
      color: "#2a2a2a",
    }}
  >
    {title}
  </Typography>
);

/* Card Wrapper for consistent style */
const CardWrapper = ({ children }) => (
  <Box
    sx={{
      height: "100%",
      "& .MuiCard-root": {
        height: "100%",
        borderRadius: 3,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      },
    }}
  >
    {children}
  </Box>
);

export default TenantDashboard;
