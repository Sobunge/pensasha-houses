// src/pages/Tenant/TenantDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PaymentIcon from "@mui/icons-material/Payment";

import PropertyInfoCard from "../../components/cards/PropertyInfoCard";
import MaintenanceCard from "../../components/cards/MaintenanceCard";
import AnnouncementsCard from "../../components/cards/AnnouncementsCard";
import PaymentsCard from "../../components/cards/PaymentsCard";
import DocumentsCard from "../../components/cards/DocumentsCard";
import api from "../../api/api";
import { useAuth } from "../Auth/AuthContext";

function TenantDashboard() {
  const { user, loginAs } = useAuth();
  const [tenantUnits, setTenantUnits] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const navigate = useNavigate();

  /* ------------------ Handle user from sessionStorage ------------------ */
  useEffect(() => {
    if (!user) {
      try {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        if (storedUser) loginAs(storedUser);
        else navigate("/");
      } catch {
        navigate("/");
      }
    }
  }, [user, loginAs, navigate]);

  /* ------------------ Fetch tenant units ------------------ */
  useEffect(() => {
    if (!user) return;

    const fetchUnits = async () => {
      setLoadingUnits(true);
      try {
        const res = await api.get(`/units/tenant/${user.id}`);
        setTenantUnits(res.data || []);
      } catch (err) {
        console.error("Failed to fetch tenant units:", err);
      } finally {
        setLoadingUnits(false);
      }
    };

    fetchUnits();
  }, [user]);

  if (!user || loadingUnits) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress sx={{ color: "#f8b500" }} />
      </Box>
    );
  }

  const hasUnits = tenantUnits.length > 0;
  const visibleUnits = tenantUnits.slice(0, 2);

  return (
    <Box>
      {/* ===== Action Header ===== */}
      <Stack
        direction="column" // Force vertical stacking for a centered look
        alignItems="center"
        spacing={2}
        sx={{
          mb: 4,
          pb: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          width: "100%",
          textAlign: "center" // Ensures the Typography aligns center
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
              Tenancy Overview
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.5,
                borderRadius: "20px",
                bgcolor: hasUnits ? "rgba(76, 175, 80, 0.08)" : "rgba(0, 0, 0, 0.04)",
                border: "1px solid",
                borderColor: hasUnits ? "rgba(76, 175, 80, 0.15)" : "transparent",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  bgcolor: hasUnits ? "#4caf50" : "#9e9e9e",
                  borderRadius: "50%",
                }}
              />
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase" }}>
                {hasUnits ? "Active Tenant" : "No Active Lease"}
              </Typography>
            </Box>
          </Stack>

          {/* THIS IS THE CENTERED LINE */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              textAlign: "center", // Explicitly centered
              width: "100%"
            }}
          >
            {hasUnits ? (
              <>
                Managing <strong>{tenantUnits.length}</strong> active {tenantUnits.length === 1 ? "lease" : "leases"}
              </>
            ) : (
              "No active lease agreements found"
            )}
          </Typography>
        </Box>

        {hasUnits && (
          <Button
            variant="contained"
            disableElevation
            startIcon={<PaymentIcon />}
            sx={{
              bgcolor: "#f8b500",
              color: "#111",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "12px",
              px: 6, // Wider button looks better when centered
              py: 1.2,
              boxShadow: "0 4px 14px 0 rgba(248, 181, 0, 0.35)",
              "&:hover": {
                bgcolor: "#ffc62c",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Pay Rent
          </Button>
        )}
      </Stack>

      {/* Rental Units Section */}
      <Section title="Your Rental Units & Rent">
        {hasUnits ? (
          <>
            {visibleUnits.map((unit) => (
              <Box
                key={unit.id}
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 48%", md: "0 0 350px" },
                }}
              >
                <PropertyInfoCard property={unit} />
              </Box>
            ))}
            {tenantUnits.length > visibleUnits.length && (
              <Box sx={{ flex: "1 1 100%", mt: 1 }}>
                <Button
                  variant="text"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ color: "#f8b500", fontWeight: 700 }}
                  onClick={() => navigate("/tenant/properties")}
                >
                  View all units
                </Button>
              </Box>
            )}
          </>
        ) : (
          <EmptyState
            message="You are not currently linked to any rental unit. Browse available properties to get started."
            ctaText="Browse Available Units"
            ctaIcon={<SearchOutlinedIcon />}
            onClick={() => navigate("/tenant/browse-units")}
          />
        )}
      </Section>

      {/* Requests & Updates */}
      <Section title="Maintenance & Announcements">
        <MaintenanceCard tenantId={user.id} />
        <AnnouncementsCard userId={user.id} />
      </Section>

      {/* Documents & Payments */}
      <Section title="Billing & Documents">
        <PaymentsCard />
        <DocumentsCard userId={user.id} />
      </Section>
    </Box>
  );
}

/* ---------------- Helper Components ---------------- */
const Section = ({ title, children }) => (
  <Box sx={{ mb: 5 }}>
    <Typography
      variant="subtitle2"
      sx={{ textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, mb: 2, color: "#888" }}
    >
      {title}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
      }}
    >
      {children}
    </Box>
  </Box>
);

const EmptyState = ({ message, ctaText, ctaIcon, onClick }) => (
  <Box
    sx={{
      width: "100%",
      textAlign: "center",
      p: 4,
      borderRadius: 3,
      bgcolor: "#ffffff",
      border: "2px dashed #e0e0e0",
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 600, color: "#2a2a2a", mb: 1 }}>
      No Units Found
    </Typography>
    <Typography variant="body2" sx={{ color: "#666", mb: 3, maxWidth: 400, mx: "auto" }}>
      {message}
    </Typography>
    <Button
      variant="contained"
      startIcon={ctaIcon}
      onClick={onClick}
      sx={{
        bgcolor: "#f8b500",
        color: "#111",
        fontWeight: 600,
        borderRadius: 2,
        px: 4,
        "&:hover": { bgcolor: "#ffc62c" },
      }}
    >
      {ctaText}
    </Button>
  </Box>
);

export default TenantDashboard;