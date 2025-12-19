// src/pages/TenantPage/TenantDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PaymentIcon from "@mui/icons-material/Payment";

import PropertyInfoCard from "../../components/cards/PropertyInfoCard";
import MaintenanceCard from "../../components/cards/MaintenanceCard";
import AnnouncementsCard from "../../components/cards/AnnouncementsCard";
import DocumentsCard from "../../components/cards/DocumentsCard";
import PaymentsCard from "../../components/cards/PaymentsCard";
import api from "../../api/api";

function TenantDashboard() {
  const [user, setUser] = useState(null);
  const [tenantUnits, setTenantUnits] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) navigate("/");
    else setUser(storedUser);
  }, [navigate]);

  // Fetch tenant properties
  useEffect(() => {
    if (!user) return;

    const fetchTenantUnits = async () => {
      setLoadingUnits(true);
      try {
        const response = await api.get("/units/tenant/" + user.id);
        setTenantUnits(response.data || []);
      } catch (err) {
        console.error("Failed to fetch tenant units:", err);
      } finally {
        setLoadingUnits(false);
      }
    };

    fetchTenantUnits();
  }, [user]);

  const visibleDesktop = tenantUnits.slice(0, 2);

  if (!user || loadingUnits) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f7f7f7", minHeight: "100vh" }}>
      {/* Hero Card */}
      <Card
        sx={{
          mb: 4,
          p: 3,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src="/assets/images/tenant-avatar.png"
            alt={user.name}
            sx={{ width: 56, height: 56, bgcolor: "#f8b500", color: "#111" }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#111" }}>
              Welcome back, {user.name} 👋
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              Role: {user.role}
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              You have {tenantUnits.length} rental units
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<PaymentIcon />}
          sx={{
            bgcolor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            mt: { xs: 2, md: 0 },
          }}
        >
          Pay Rent Now
        </Button>
      </Card>

      {/* Units & Rent */}
      <SectionTitle title="Your Rental Units & Rent" />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
        {tenantUnits.length === 0 ? (
          <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
            <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
              You currently have no rental unit assigned.
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate("/tenant/browse-units")}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#fef2b2", borderColor: "#f8b500" },
              }}
            >
              Browse Available Units
            </Button>
          </Box>
        ) : (
          <>
            {visibleDesktop.map((property) => (
              <Box
                key={property.id}
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%", md: "1 1 30%" } }}
              >
                <PropertyInfoCard property={property} />
              </Box>
            ))}
            {tenantUnits.length > visibleDesktop.length && (
              <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%", md: "1 1 30%" } }}>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    width: "100%",
                    minHeight: 40,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#fef2b2", borderColor: "#f8b500" },
                  }}
                  onClick={() => navigate("/tenant/properties")}
                >
                  View All Properties
                </Button>
              </Box>
            )}
          </>
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
        <DocumentsSection />
      </Box>

      {/* Payments */}
      <SectionTitle title="Recent Payments" />
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <PaymentsSection />
      </Box>
    </Box>
  );
}

// Section Title
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

// Card Wrapper
const CardWrapper = ({ children }) => (
  <Box
    sx={{
      height: "100%",
      "& .MuiCard-root": {
        height: "100%",
        borderRadius: 3,
        transition: "all 0.2s ease-in-out",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
      },
    }}
  >
    {children}
  </Box>
);

// Documents Section
const DocumentsSection = () => (
  <CardWrapper>
    <DocumentsCard />
    <Typography
      variant="body2"
      sx={{ width: "100%", textAlign: "center", color: "#555", mt: 1 }}
    >
      No documents available.
    </Typography>
  </CardWrapper>
);

// Payments Section
const PaymentsSection = () => (
  <CardWrapper>
    <PaymentsCard />
    <Typography
      variant="body2"
      sx={{ width: "100%", textAlign: "center", color: "#555", mt: 1 }}
    >
      No recent payments.
    </Typography>
  </CardWrapper>
);

export default TenantDashboard;
