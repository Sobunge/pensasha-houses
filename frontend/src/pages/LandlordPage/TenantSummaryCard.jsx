// src/components/cards/TenantSummaryCard.jsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Skeleton,
  Alert,
  alpha,
} from "@mui/material";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useTenantSummary } from "../../components/hooks/landlord/useTenantSummary";

function TenantSummaryCard({ userId }) {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useTenantSummary(userId);

  // Loading Skeleton State
  if (isLoading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          bgcolor: "#FFFFFF",
          border: "1px solid",
          borderColor: "divider",
          p: 3,
          height: "100%",
        }}
      >
        <Skeleton variant="text" width="50%" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="70%" height={20} sx={{ mb: 3 }} />
        <Box sx={{ display: "flex", gap: 1.5, flexDirection: { xs: "column", md: "row" } }}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" height={80} sx={{ flex: 1, borderRadius: "12px" }} />
          ))}
        </Box>
      </Card>
    );
  }

  // Error State
  if (isError) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          bgcolor: "#FFFFFF",
          border: "1px solid",
          borderColor: "divider",
          p: 3,
          height: "100%",
        }}
      >
        <Alert severity="error" sx={{ width: "100%", borderRadius: 2 }}>
          {error?.message || "Failed to load tenant summary."}
        </Alert>
      </Card>
    );
  }

  const activeTenants = data?.activeTenants ?? 0;
  const expiringLeases = data?.expiringLeases ?? 0;
  const pendingNotices = data?.pendingNotices ?? 0;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
        width: "100%",

        // Pronounced Obsidian Depth Shadow
        boxShadow:
          "0 15px 35px -5px rgba(15, 23, 42, 0.12), 0 10px 15px -8px rgba(15, 23, 42, 0.06)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: "secondary.main",
          boxShadow:
            "0 25px 40px -10px rgba(15, 23, 42, 0.18), 0 12px 18px -6px rgba(15, 23, 42, 0.1)",
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2.5, sm: 3 },
          "&:last-child": { pb: { xs: 2, sm: 2.5 } },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          {/* HEADER */}
          <Box sx={{ mb: 2, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "primary.main", lineHeight: 1.2 }}
            >
              Lease & Tenant Health
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              Active tenancy overview & upcoming lease expirations
            </Typography>
          </Box>

          {/* AGGREGATE HEALTH STATS (FLEXBOX ROW WRAPPER) */}
          <Box
            sx={{
              display: "flex",
              // Stack vertically on mobile, side-by-side on medium and large screens
              flexDirection: { xs: "column", md: "row" },
              gap: 1.5,
              mt: 0.5,
            }}
          >
            {/* Active Tenants */}
            <Box
              sx={{
                p: 1.5,
                flex: 1, // Distribute equal width side-by-side
                borderRadius: "12px",
                bgcolor: "#F8FAFC",
                border: "1px solid #F1F5F9",
                display: "flex",
                flexDirection: { xs: "column", md: "column", lg: "row" },
                alignItems: "center",
                justifyContent: { xs: "center", md: "center", lg: "space-between" },
                gap: { xs: 1.25, lg: 0 },
                textAlign: { xs: "center", md: "center", lg: "left" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  minWidth: 0,
                  flexDirection: { xs: "column", md: "column", lg: "row" },
                  textAlign: { xs: "center", md: "center", lg: "left" },
                }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    bgcolor: alpha("#10B981", 0.12),
                    color: "#10B981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <PeopleOutlinedIcon fontSize="small" />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={700} color="primary.main">
                    Active Tenants
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ display: "block" }}>
                    Fully onboarded residents
                  </Typography>
                </Box>
              </Box>

              {/* 🌟 NUMERIC BADGE 1: Emerald Green */}
              <Box
                sx={{
                  mt: { xs: 0.5, lg: 0 },
                  minWidth: 44,
                  height: 34,
                  px: 1.5,
                  borderRadius: "10px",
                  bgcolor: alpha("#10B981", 0.12),
                  border: "1px solid",
                  borderColor: alpha("#10B981", 0.3),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 800, color: "#059669", fontSize: "1rem", lineHeight: 1 }}
                >
                  {activeTenants}
                </Typography>
              </Box>
            </Box>

            {/* Leases Expiring Soon */}
            <Box
              sx={{
                p: 1.5,
                flex: 1,
                borderRadius: "12px",
                bgcolor: "#F8FAFC",
                border: "1px solid #F1F5F9",
                display: "flex",
                flexDirection: { xs: "column", md: "column", lg: "row" },
                alignItems: "center",
                justifyContent: { xs: "center", md: "center", lg: "space-between" },
                gap: { xs: 1.25, lg: 0 },
                textAlign: { xs: "center", md: "center", lg: "left" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  minWidth: 0,
                  flexDirection: { xs: "column", md: "column", lg: "row" },
                  textAlign: { xs: "center", md: "center", lg: "left" },
                }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    bgcolor: alpha("#D4AF37", 0.15),
                    color: "#B5922B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <EventRepeatOutlinedIcon fontSize="small" />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={700} color="primary.main">
                    Expiring Leases
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ display: "block" }}>
                    Due for renewal within 30 days
                  </Typography>
                </Box>
              </Box>

              {/* 🌟 NUMERIC BADGE 2: Champagne Gold */}
              <Box
                sx={{
                  mt: { xs: 0.5, lg: 0 },
                  minWidth: 44,
                  height: 34,
                  px: 1.5,
                  borderRadius: "10px",
                  bgcolor: alpha("#D4AF37", 0.18),
                  border: "1px solid",
                  borderColor: alpha("#D4AF37", 0.4),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 800, color: "#B5922B", fontSize: "1rem", lineHeight: 1 }}
                >
                  {expiringLeases}
                </Typography>
              </Box>
            </Box>

            {/* Pending Notices */}
            <Box
              sx={{
                p: 1.5,
                flex: 1,
                borderRadius: "12px",
                bgcolor: "#F8FAFC",
                border: "1px solid #F1F5F9",
                display: "flex",
                flexDirection: { xs: "column", md: "column", lg: "row" },
                alignItems: "center",
                justifyContent: { xs: "center", md: "center", lg: "space-between" },
                gap: { xs: 1.25, lg: 0 },
                textAlign: { xs: "center", md: "center", lg: "left" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  minWidth: 0,
                  flexDirection: { xs: "column", md: "column", lg: "row" },
                  textAlign: { xs: "center", md: "center", lg: "left" },
                }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    bgcolor: alpha("#EF4444", 0.12),
                    color: "#DC2626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <GavelOutlinedIcon fontSize="small" />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={700} color="primary.main">
                    Pending Notices
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ display: "block" }}>
                    Overdue lease agreement signatures
                  </Typography>
                </Box>
              </Box>

              {/* 🌟 NUMERIC BADGE 3: Crimson Red */}
              <Box
                sx={{
                  mt: { xs: 0.5, lg: 0 },
                  minWidth: 44,
                  height: 34,
                  px: 1.5,
                  borderRadius: "10px",
                  bgcolor: alpha("#EF4444", 0.12),
                  border: "1px solid",
                  borderColor: alpha("#EF4444", 0.3),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 800, color: "#DC2626", fontSize: "1rem", lineHeight: 1 }}
                >
                  {pendingNotices}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* FOOTER VIEW ALL ACTION */}
        <Box
          sx={{
            mt: 2,
            pt: 1.5,
            borderTop: "1px solid #F1F5F9",
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            alignItems: "center",
          }}
        >
          <Button
            size="small"
            endIcon={<ArrowForwardIcon fontSize="small" />}
            onClick={() => navigate("/landlord/tenants")}
            sx={{
              fontWeight: 700,
              fontSize: "0.82rem",
              color: "primary.main",
              textTransform: "none",
              "&:hover": {
                color: "secondary.main",
                bgcolor: "transparent",
              },
            }}
          >
            Manage All Tenants
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TenantSummaryCard;