// src/pages/Tenant/TenantDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, Button, Avatar, CircularProgress } from "@mui/material";
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
        <CircularProgress />
      </Box>
    );
  }

  const hasUnits = tenantUnits.length > 0;
  const visibleUnits = tenantUnits.slice(0, 2);

  return (
    <Box sx={{ flexGrow: 1, width: "100%", bgcolor: "#f7f7f7", p: { xs: 2, md: 3 } }}>
      {/* Hero Card */}
      <Card sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: { xs: "center", md: "space-between" },
            gap: 2,
            width: "100%",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 2 }}>
            <Avatar
              src="/assets/images/avatar.png"
              alt={user.name || user.idNumber}
              sx={{
                width: hasUnits ? 56 : 72,
                height: hasUnits ? 56 : 72,
                bgcolor: "#f8b500",
                color: "#111",
                boxShadow: 2,
              }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#111" }}>
                Welcome back, {user.name || user.idNumber} 👋
              </Typography>
              <Typography variant="body2" sx={{ color: hasUnits ? "#555" : "#888", mt: 0.5 }}>
                {hasUnits
                  ? `You have ${tenantUnits.length} rental unit${tenantUnits.length > 1 ? "s" : ""}`
                  : "You don’t have any rental units yet"}
              </Typography>
            </Box>
          </Box>

          {hasUnits && (
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
                alignSelf: { xs: "center", md: "auto" },
              }}
            >
              Pay Rent Now
            </Button>
          )}
        </Box>
      </Card>

      {/* Rental Units Section */}
      <Section title="Your Rental Units & Rent">
        {hasUnits ? (
          <>
            {visibleUnits.map((unit) => (
              <Box
                key={unit.id}
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 48%", md: "1 1 30%" },
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <PropertyInfoCard property={unit} />
              </Box>
            ))}
            {tenantUnits.length > visibleUnits.length && (
              <Box
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 48%", md: "1 1 30%" },
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
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
      <Section title="Requests & Updates">
        <MaintenanceCard tenantId={user.id} />
        <AnnouncementsCard userId={user.id} />
      </Section>

      {/* Documents */}
      <Section title="Your Documents">
        <DocumentsCard userId={user.id} />
      </Section>

      {/* Payments */}
      <Section title="Recent Payments">
        <PaymentsCard />
      </Section>
    </Box>
  );
}

/* ---------------- Helper Components ---------------- */
const Section = ({ title, children }) => (
  <Box sx={{ mb: 4, textAlign: { xs: "center", md: "center", lg: "left" } }}>
    <Typography
      variant="subtitle2"
      sx={{ textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, mb: 2, color: "#2a2a2a" }}
    >
      {title}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: { xs: "center", md: "center", lg: "flex-start" },
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
      mt: 1,
      p: 3,
      borderRadius: 3,
      bgcolor: "#ffffff",
      border: "1px dashed #ffc62c",
    }}
  >
    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2a2a2a", mb: 1 }}>
      No Rental Unit Assigned
    </Typography>
    <Typography variant="body2" sx={{ color: "#555", mb: 3, maxWidth: 360, mx: "auto" }}>
      {message}
    </Typography>
    <Button
      variant="contained"
      size="medium"
      startIcon={ctaIcon}
      onClick={onClick}
      sx={{
        bgcolor: "#f8b500",
        color: "#111",
        fontWeight: 600,
        textTransform: "none",
        borderRadius: 3,
        px: 4,
        "&:hover": { bgcolor: "#ffc62c" },
        mx: { xs: "auto", md: "auto", lg: 0 },
      }}
    >
      {ctaText}
    </Button>
  </Box>
);

export default TenantDashboard;
