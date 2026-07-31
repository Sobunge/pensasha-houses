// src/pages/Tenant/TenantDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress sx={{ color: "#D4AF37" }} size={40} />
      </Box>
    );
  }

  const hasUnits = tenantUnits.length > 0;
  const visibleUnits = tenantUnits.slice(0, 2);

  return (
    <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 1.5, sm: 3 }, py: 1 }}>

      {/* ===== 2. ACTION HEADER ===== */}
      <Box
        sx={{
          mb: 5,
          pb: 3,
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            pl: 2,
            borderLeft: "4px solid #D4AF37",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.03em",
              fontSize: { xs: "1.5rem", sm: "1.875rem" },
            }}
          >
            Tenancy Overview
          </Typography>

          {/* Status Badge */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.8,
              py: 0.6,
              borderRadius: "20px",
              bgcolor: hasUnits ? "rgba(16, 185, 129, 0.08)" : "rgba(100, 116, 139, 0.08)",
              border: "1px solid",
              borderColor: hasUnits ? "rgba(16, 185, 129, 0.25)" : "#CBD5E1",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
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
                  "100%": { transform: "scale(3)", opacity: 0 },
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
                fontSize: "0.68rem",
              }}
            >
              {hasUnits ? "Active Tenant" : "No Active Lease"}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: "#64748B", fontWeight: 600 }}>
          {hasUnits ? (
            <>
              Managing <strong>{tenantUnits.length}</strong> active{" "}
              {tenantUnits.length === 1 ? "lease agreement" : "lease agreements"}
            </>
          ) : (
            "No active lease agreements linked to your profile"
          )}
        </Typography>
      </Box>

      {/* ===== 3. RENTAL UNITS SECTION ===== */}
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
                    bgcolor: "#0F172A",
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontWeight: 700,
                    px: 4,
                    py: 1.2,
                    borderRadius: "10px",
                    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.15)",
                    "& .MuiButton-endIcon": { color: "#D4AF37" },
                    "&:hover": {
                      bgcolor: "#D4AF37",
                      color: "#0F172A",
                      "& .MuiButton-endIcon": { color: "#0F172A" },
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  View All Units ({tenantUnits.length})
                </Button>
              </Box>
            )}
          </Box>
        ) : (
          <EmptyState
            message="You are not currently linked to any rental unit. Explore available units or reach out to property management."
            ctaText="Browse Available Units"
            ctaIcon={<SearchOutlinedIcon />}
            onClick={() => navigate("/tenant/browse-units")}
          />
        )}
      </Section>

      {/* ===== 4. MAINTENANCE & ANNOUNCEMENTS ===== */}
      <Section title="Maintenance & Announcements">
        <MaintenanceCard tenantId={user.id} />
        <AnnouncementsCard userId={user.id} />
      </Section>

      {/* ===== 5. BILLING & DOCUMENTS ===== */}
      <Section title="Billing & Documents">
        <PaymentsCard />
        <DocumentsCard userId={user.id} />
      </Section>
    </Box>
  );
}

/* ---------------- Helper Components ---------------- */

const Section = ({ title, children }) => (
  <Box sx={{ mb: 6 }}>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3.5 }}>
      <Typography
        variant="overline"
        sx={{
          letterSpacing: 2.5,
          fontWeight: 800,
          color: "#475569",
          fontSize: "0.78rem",
          position: "relative",
          "&::after": {
            content: '""',
            display: "block",
            width: "36px",
            height: "2px",
            bgcolor: "#D4AF37",
            mx: "auto",
            mt: 0.5,
            borderRadius: "2px",
          },
        }}
      >
        {title}
      </Typography>
    </Box>
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
      maxWidth: 640,
      mx: "auto",
      textAlign: "center",
      p: { xs: 4, sm: 5 },
      borderRadius: "18px",
      bgcolor: "#FFFFFF",
      border: "1.5px solid #D4AF37",
      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        bgcolor: "rgba(212, 175, 55, 0.1)",
        color: "#D4AF37",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2.5,
      }}
    >
      <HomeWorkOutlinedIcon sx={{ fontSize: 32 }} />
    </Box>

    <Typography
      variant="h6"
      sx={{ fontWeight: 800, color: "#0F172A", mb: 1, fontSize: "1.2rem" }}
    >
      No Rental Units Found
    </Typography>

    <Typography
      variant="body2"
      sx={{ color: "#64748B", mb: 3.5, maxWidth: 460, lineHeight: 1.6 }}
    >
      {message}
    </Typography>

    <Button
      variant="contained"
      startIcon={ctaIcon}
      onClick={onClick}
      sx={{
        bgcolor: "#0F172A",
        color: "#FFFFFF",
        fontWeight: 700,
        px: 4,
        py: 1.3,
        borderRadius: "10px",
        textTransform: "none",
        boxShadow: "0 4px 14px rgba(15, 23, 42, 0.2)",
        "& .MuiButton-startIcon": { color: "#D4AF37" },
        "&:hover": {
          bgcolor: "#D4AF37",
          color: "#0F172A",
          boxShadow: "0 6px 18px rgba(212, 175, 55, 0.35)",
          transform: "translateY(-2px)",
          "& .MuiButton-startIcon": { color: "#0F172A" },
        },
        transition: "all 0.2s ease",
      }}
    >
      {ctaText}
    </Button>
  </Box>
);

export default TenantDashboard;