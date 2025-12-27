// src/pages/TenantPage/TenantDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

import PropertyInfoCard from "../../components/cards/PropertyInfoCard";
import MaintenanceCard from "../../components/cards/MaintenanceCard";
import AnnouncementsCard from "../../components/cards/AnnouncementsCard";
import DocumentsCard from "../../components/cards/DocumentsCard";
import PaymentsCard from "../../components/cards/PaymentsCard";

import api from "../../api/api";
import { useAuth } from "../Auth/AuthContext";

function TenantDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [tenantUnits, setTenantUnits] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const navigate = useNavigate();

  // Redirect handled ONLY after auth is resolved
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
    }
  }, [authLoading, user, navigate]);

  // Fetch tenant units
  useEffect(() => {
    if (!user) return;

    const fetchTenantUnits = async () => {
      setLoadingUnits(true);
      try {
        const res = await api.get(`/units/tenant/${user.id}`);
        setTenantUnits(res.data || []);
      } catch (err) {
        console.error("Failed to fetch tenant units", err);
      } finally {
        setLoadingUnits(false);
      }
    };

    fetchTenantUnits();
  }, [user]);

  // Unified loading state
  if (authLoading || loadingUnits) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  const visibleDesktop = tenantUnits.slice(0, 2);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f7f7f7", minHeight: "100vh" }}>
      {/* Hero */}
      <Card sx={{ mb: 4, p: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{ width: 56, height: 56, bgcolor: "#f8b500", color: "#111" }}
          >
            {user.name?.[0]}
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight={600}>
              Welcome back, {user.name}
            </Typography>
            <Typography variant="body2">Role: {user.role}</Typography>
            <Typography variant="body2">
              You have {tenantUnits.length} rental units
            </Typography>
          </Box>
        </Box>

        <Button
          startIcon={<PaymentIcon />}
          sx={{
            mt: 2,
            bgcolor: "#f8b500",
            color: "#111",
            fontWeight: 600,
          }}
        >
          Pay Rent Now
        </Button>
      </Card>

      {/* Units */}
      <SectionTitle title="Your Rental Units & Rent" />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {tenantUnits.length === 0 ? (
          <Typography>No rental units assigned.</Typography>
        ) : (
          visibleDesktop.map((unit) => (
            <Box key={unit.id} sx={{ flex: "1 1 30%" }}>
              <PropertyInfoCard property={unit} />
            </Box>
          ))
        )}
      </Box>

      <SectionTitle title="Requests & Updates" />
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <MaintenanceCard tenantId={user.id} />
        <AnnouncementsCard userId={user.id} />
      </Box>

      <SectionTitle title="Your Documents" />
      <DocumentsCard />

      <SectionTitle title="Recent Payments" />
      <PaymentsCard />
    </Box>
  );
}

const SectionTitle = ({ title }) => (
  <Typography
    variant="subtitle2"
    sx={{
      textTransform: "uppercase",
      letterSpacing: 1,
      fontWeight: 600,
      mt: 4,
      mb: 2,
    }}
  >
    {title}
  </Typography>
);

export default TenantDashboard;
