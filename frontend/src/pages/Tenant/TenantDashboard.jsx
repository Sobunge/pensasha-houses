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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress sx={{ color: "#f8b500" }} />
      </Box>
    );
  }

  const hasUnits = tenantUnits.length > 0;
  const visibleUnits = tenantUnits.slice(0, 2);

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 3 } }}>
      {/* ===== Action Header ===== */}
      <Stack
        direction="column"
        alignItems="center"
        spacing={3}
        sx={{
          mb: 6,
          pb: 4,
          borderBottom: "1px solid",
          borderColor: "divider",
          width: "100%",
          textAlign: "center"
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              mb: 1.5,
              justifyContent: "center", // Keeps it centered as per your previous request
              flexWrap: "wrap", // Ensures it stays clean on small mobile screens
            }}
          >
            {/* The Title with a more refined weight and gradient hint */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: "#1a1a1a",
                letterSpacing: "-0.04em",
                fontSize: { xs: "1.75rem", sm: "2.125rem" }, // Responsive sizing
                position: "relative",
              }}
            >
              Tenancy Overview
            </Typography>

            {/* The Status Badge - Now with more depth and a "Glow" effect */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                px: 2,
                py: 2,
                borderRadius: "12px", // Slightly more modern "squircle" look
                bgcolor: hasUnits ? "rgba(76, 175, 80, 0.06)" : "rgba(0, 0, 0, 0.03)",
                border: "1px solid",
                borderColor: hasUnits ? "rgba(76, 175, 80, 0.2)" : "rgba(0, 0, 0, 0.08)",
                backdropFilter: "blur(4px)", // Subtle glassmorphism
                boxShadow: hasUnits
                  ? "0 4px 12px rgba(76, 175, 80, 0.12)"
                  : "none",
              }}
            >
              {/* Animated Pulsing Dot */}
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  bgcolor: hasUnits ? "#4caf50" : "#9e9e9e",
                  borderRadius: "50%",
                  position: "relative",
                  "&::after": hasUnits ? {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    bgcolor: "inherit",
                    animation: "pulse 2s infinite ease-in-out",
                    opacity: 0.5,
                  } : {},
                  "@keyframes pulse": {
                    "0%": { transform: "scale(1)", opacity: 0.5 },
                    "100%": { transform: "scale(3)", opacity: 0 },
                  },
                }}
              />

              <Typography
                variant="caption"
                sx={{
                  color: hasUnits ? "#2e7d32" : "text.secondary", // Green text if active
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontSize: "0.7rem",
                }}
              >
                {hasUnits ? "Active Tenant" : "No Active Lease"}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {hasUnits ? (
              <>Managing <strong>{tenantUnits.length}</strong> active {tenantUnits.length === 1 ? "lease" : "leases"}</>
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
              bgcolor: "#f8b500",
              color: "#000000",
              fontWeight: 800,
              textTransform: "none",
              borderRadius: 3,
              px: 8,
              py: 1.5,
              fontSize: "1rem",
              boxShadow: "0 4px 20px 0 rgba(248, 181, 0, 0.4)",
              "& .MuiButton-startIcon": { color: "#000000" },
              "&:hover": {
                bgcolor: "#eab000",
                boxShadow: "0 6px 25px rgba(248, 181, 0, 0.5)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
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
          flexDirection: "column", // Stack units vertically for 100% width
          gap: 3, 
          alignItems: "center" 
        }}
      >
        {visibleUnits.map((unit) => (
          <Box
            key={unit.id}
            sx={{ 
              width: "100%", // Ensures the container is wide
              maxWidth: "100%" // Removes the 380px restriction
            }}
          >
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
              bgcolor: "#f8b500",
              color: "#000000",
              textTransform: "none",
              fontWeight: 900,
              px: 6, // Wider button to match the full-width card vibe
              py: 1.5,
              borderRadius: 3,
              boxShadow: "0 6px 20px rgba(248, 181, 0, 0.3)",
              "&:hover": { 
                bgcolor: "#eab000",
                transform: "scale(1.02)"
              },
              transition: "all 0.2s ease"
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
  <Box sx={{ mb: 8 }}>
    <Typography
      variant="overline"
      sx={{
        display: 'block',
        textAlign: 'center',
        letterSpacing: 2,
        fontWeight: 800,
        mb: 4,
        color: "text.disabled"
      }}
    >
      {title}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center", // This centers the cards inside the section
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
      p: 6,
      borderRadius: 4,
      bgcolor: "rgba(0,0,0,0.02)",
      border: "2px dashed",
      borderColor: "divider",
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
      No Units Found
    </Typography>
    <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
      {message}
    </Typography>
    <Button
      variant="contained"
      startIcon={ctaIcon}
      onClick={onClick}
      sx={{
        bgcolor: "#f8b500",
        color: "#000000",
        fontWeight: 800,
        px: 4,
        py: 1.2,
        borderRadius: 2.5,
        textTransform: "none",
        "&:hover": { bgcolor: "#eab000" },
      }}
    >
      {ctaText}
    </Button>
  </Box>
);

export default TenantDashboard;