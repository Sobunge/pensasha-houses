// src/pages/Tenant/TenantDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress, Stack, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const [tenantUnits, setTenantUnits] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const navigate = useNavigate();

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
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress sx={{ color: "#D97706" }} />
      </Box>
    );
  }

  const hasUnits = tenantUnits.length > 0;
  const visibleUnits = tenantUnits.slice(0, 2);

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 3 }, py: 2 }}>
      {/* ===== Action Header ===== */}
      <Stack
        direction="column"
        alignItems="center"
        spacing={3}
        sx={{
          mb: 6,
          pb: 4,
          borderBottom: `1px solid ${theme.palette.divider}`,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              mb: 1.5,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Main Title */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: "#0F172A",
                letterSpacing: "-0.03em",
                fontSize: { xs: "1.75rem", sm: "2.125rem" },
              }}
            >
              Tenancy Overview
            </Typography>

            {/* Status Badge */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                px: 2,
                py: 1,
                borderRadius: "12px",
                bgcolor: hasUnits ? "#ECFDF5" : "#F1F5F9",
                border: "1px solid",
                borderColor: hasUnits ? "#A7F3D0" : "#CBD5E1",
                boxShadow: hasUnits ? "0 4px 12px rgba(16, 185, 129, 0.1)" : "none",
              }}
            >
              {/* Animated Pulsing Dot */}
              <Box
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: hasUnits ? "#10B981" : "#64748B",
                  borderRadius: "50%",
                  position: "relative",
                  "&::after": hasUnits
                    ? {
                        content: '""',
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        bgcolor: "inherit",
                        animation: "pulse 2s infinite ease-in-out",
                        opacity: 0.5,
                      }
                    : {},
                  "@keyframes pulse": {
                    "0%": { transform: "scale(1)", opacity: 0.5 },
                    "100%": { transform: "scale(3.2)", opacity: 0 },
                  },
                }}
              />

              <Typography
                variant="caption"
                sx={{
                  color: hasUnits ? "#047857" : "#475569",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontSize: "0.7rem",
                }}
              >
                {hasUnits ? "Active Tenant" : "No Active Lease"}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
            {hasUnits ? (
              <>
                Managing <strong>{tenantUnits.length}</strong> active{" "}
                {tenantUnits.length === 1 ? "lease" : "leases"}
              </>
            ) : (
              "No active lease agreements found"
            )}
          </Typography>
        </Box>

        {hasUnits && (
          <Button
            variant="contained"
            startIcon={<PaymentIcon />}
            sx={{
              bgcolor: "#D97706",
              color: "#FFFFFF",
              fontWeight: 800,
              textTransform: "none",
              borderRadius: "12px",
              px: 6,
              py: 1.5,
              fontSize: "1rem",
              boxShadow: "0 4px 18px rgba(217, 119, 6, 0.35)",
              "& .MuiButton-startIcon": { color: "#FFFFFF" },
              "&:hover": {
                bgcolor: "#B45309",
                boxShadow: "0 6px 22px rgba(217, 119, 6, 0.45)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.25s ease",
            }}
          >
            Pay Rent
          </Button>
        )}
      </Stack>

      {/* Rental Units Section */}
      <Section title="Your Rental Units & Rent">
        {hasUnits ? (
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                alignItems: "center",
              }}
            >
              {visibleUnits.map((unit) => (
                <Box key={unit.id} sx={{ width: "100%", maxWidth: "100%" }}>
                  <PropertyInfoCard property={unit} />
                </Box>
              ))}
            </Box>

            {tenantUnits.length > visibleUnits.length && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate("/tenant/properties")}
                  sx={{
                    bgcolor: "#D97706",
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontWeight: 800,
                    px: 5,
                    py: 1.5,
                    borderRadius: "12px",
                    boxShadow: "0 4px 14px rgba(217, 119, 6, 0.3)",
                    "&:hover": {
                      bgcolor: "#B45309",
                      transform: "scale(1.02)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  View all units
                </Button>
              </Box>
            )}
          </Box>
        ) : (
          <EmptyState
            message="You are not currently linked to any rental unit. Browse available properties to get started."
            ctaText="Browse Available Units"
            ctaIcon={<SearchOutlinedIcon />}
            onClick={() => navigate("/tenant/browse-units")}
          />
        )}
      </Section>

      {/* Maintenance & Announcements */}
      <Section title="Maintenance & Announcements">
        <MaintenanceCard tenantId={user.id} />
        <AnnouncementsCard userId={user.id} />
      </Section>

      {/* Billing & Documents */}
      <Section title="Billing & Documents">
        <PaymentsCard />
        <DocumentsCard userId={user.id} />
      </Section>
    </Box>
  );
}

/* ---------------- Helper Components ---------------- */
const Section = ({ title, children }) => (
  <Box sx={{ mb: 7 }}>
    <Typography
      variant="overline"
      sx={{
        display: "block",
        textAlign: "center",
        letterSpacing: 2,
        fontWeight: 800,
        mb: 4,
        color: "#64748B",
        fontSize: "0.8rem",
      }}
    >
      {title}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
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
      maxWidth: 600,
      mx: "auto",
      textAlign: "center",
      p: 5,
      borderRadius: "16px",
      bgcolor: "#F8FAFC",
      border: "2px dashed #E2E8F0",
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 1 }}>
      No Units Found
    </Typography>
    <Typography variant="body2" sx={{ color: "#64748B", mb: 3.5 }}>
      {message}
    </Typography>
    <Button
      variant="contained"
      startIcon={ctaIcon}
      onClick={onClick}
      sx={{
        bgcolor: "#D97706",
        color: "#FFFFFF",
        fontWeight: 800,
        px: 4,
        py: 1.2,
        borderRadius: "10px",
        textTransform: "none",
        boxShadow: "0 4px 14px rgba(217, 119, 6, 0.3)",
        "&:hover": { bgcolor: "#B45309" },
      }}
    >
      {ctaText}
    </Button>
  </Box>
);

export default TenantDashboard;