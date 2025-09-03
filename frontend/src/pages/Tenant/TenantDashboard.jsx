import React, { useState } from "react";
import { Box, Toolbar, Typography, Card, Button, Avatar } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PaymentIcon from "@mui/icons-material/Payment";

import TenantNavbar from "./TenantNavbar";
import TenantSidebar from "./TenantSidebar";
import PropertyInfoCard from "../../components/cards/PropertyInfoCard";
import MaintenanceCard from "../../components/cards/MaintenanceCard";
import AnnouncementsCard from "../../components/cards/AnnouncementsCard";
import DocumentsCard from "../../components/cards/DocumentsCard";
import PaymentsCard from "../../components/cards/PaymentsCard";

function TenantDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sample tenant properties
  const tenantProperties = [
    { name: "Sunrise Apartments", unit: "A-203", lease: "Jan 2024 – Dec 2024", rentStatus: "Pending", rentAmount: "Ksh 12,000" },
    { name: "Pensasha Towers", unit: "B-102", lease: "Feb 2024 – Jan 2025", rentStatus: "Paid", rentAmount: "Ksh 15,000" },
    { name: "Lakeview Residences", unit: "C-405", lease: "Mar 2024 – Feb 2025", rentStatus: "Pending", rentAmount: "Ksh 18,000" },
    { name: "Garden Court", unit: "D-110", lease: "Apr 2024 – Mar 2025", rentStatus: "Paid", rentAmount: "Ksh 14,000" },
    // ...more properties
  ];

  // Show first 3 properties for desktop
  const visibleDesktop = tenantProperties.slice(0, 3);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar & Sidebar */}
      <TenantNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <TenantSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, bgcolor: "#f7f7f7", minHeight: "100vh" }}>
        <Toolbar />

        {/* Hero Card */}
        <Card sx={{ mb: 4, p: 3, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2, borderRadius: 3, boxShadow: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src="/assets/images/tenant-avatar.png" alt="Tenant" sx={{ width: 56, height: 56, bgcolor: "#f8b500", color: "#111" }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#111" }}>
                Welcome back, John Doe 👋
              </Typography>
              <Typography variant="body2" sx={{ color: "#555" }}>
                You have {tenantProperties.length} properties
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<PaymentIcon />}
            sx={{ bgcolor: "#f8b500", color: "#111", fontWeight: 600, textTransform: "none", borderRadius: 2, px: 3, mt: { xs: 2, md: 0 } }}
          >
            Pay Rent Now
          </Button>
        </Card>

        {/* Properties & Rent */}
        <SectionTitle title="Your Properties & Rent" />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
          {visibleDesktop.map((property, index) => (
            <Box key={index} sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%", md: "1 1 30%" } }}>
              <PropertyInfoCard property={property} />
            </Box>
          ))}

          {/* View All Properties Button */}
          {tenantProperties.length > visibleDesktop.length && (
            <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%", md: "1 1 30%" } }}>
              <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  width: "100%",
                  minHeight: 40,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  "&:hover": { backgroundColor: "#fef2b2", borderColor: "#f8b500" },
                }}
                onClick={() => alert("Navigate to full properties page")}
              >
                View All Properties
              </Button>
            </Box>
          )}
        </Box>

        {/* Requests & Updates */}
        <SectionTitle title="Requests & Updates" />
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 4 }}>
          <CardWrapper><MaintenanceCard /></CardWrapper>
          <CardWrapper><AnnouncementsCard /></CardWrapper>
        </Box>

        {/* Documents */}
        <SectionTitle title="Your Documents" />
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 4 }}>
          <CardWrapper><DocumentsCard /></CardWrapper>
        </Box>

        {/* Payments */}
        <SectionTitle title="Recent Payments" />
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <CardWrapper><PaymentsCard /></CardWrapper>
        </Box>
      </Box>
    </Box>
  );
}

// Section Title Component
const SectionTitle = ({ title }) => (
  <Typography variant="subtitle2" sx={{ textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, mb: 2, color: "#2a2a2a" }}>
    {title}
  </Typography>
);

// Card Wrapper with hover effect
const CardWrapper = ({ children }) => (
  <Box sx={{ height: "100%", "& .MuiCard-root": { height: "100%", borderRadius: 3, transition: "all 0.2s ease-in-out", "&:hover": { transform: "translateY(-4px)", boxShadow: 4 } } }}>
    {children}
  </Box>
);

export default TenantDashboard;
