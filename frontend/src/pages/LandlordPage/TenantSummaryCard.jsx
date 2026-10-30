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
  useTheme,
} from "@mui/material";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useTenantSummary } from "../../components/hooks/landlord/useTenantSummary";

function TenantSummaryCard({ userId }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const { data, isLoading, isError, error } = useTenantSummary(userId);

  const successColor = theme.palette.success?.main || "#10B981";
  const successDark = theme.palette.success?.dark || "#059669";
  const errorColor = theme.palette.error?.main || "#EF4444";
  const errorDark = theme.palette.error?.dark || "#DC2626";

  // Loading Skeleton State
  if (isLoading) {
    return (
      <Card
        elevation={0}
        sx={(t) => ({
          borderRadius: `${t.shape.borderRadius * 2}px`,
          bgcolor: t.palette.background.paper,
          border: "1px solid",
          borderColor: t.palette.divider,
          p: 3,
          height: "100%",
        })}
      >
        <Skeleton variant="text" width="50%" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="70%" height={20} sx={{ mb: 3 }} />
        <Box sx={{ display: "flex", gap: 1.5, flexDirection: { xs: "column", md: "row" } }}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" height={80} sx={{ flex: 1, borderRadius: `${theme.shape.borderRadius * 1.5}px` }} />
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
        sx={(t) => ({
          borderRadius: `${t.shape.borderRadius * 2}px`,
          bgcolor: t.palette.background.paper,
          border: "1px solid",
          borderColor: t.palette.divider,
          p: 3,
          height: "100%",
        })}
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
      sx={(t) => ({
        borderRadius: `${t.shape.borderRadius * 2}px`,
        bgcolor: t.palette.background.paper,
        border: "1px solid",
        borderColor: t.palette.divider,
        height: "100%",
        width: "100%",

        // Pronounced Obsidian Depth Shadow
        boxShadow: `0 15px 35px -5px ${t.palette.primary.main}1F, 0 10px 15px -8px ${t.palette.primary.main}0F`,
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: t.palette.secondary.main,
          boxShadow: `0 25px 40px -10px ${t.palette.primary.main}2E, 0 12px 18px -6px ${t.palette.primary.main}1A`,
        },
      })}
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
              sx={(t) => ({ fontWeight: 800, color: t.palette.primary.main, lineHeight: 1.2 })}
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
              sx={(t) => ({
                p: 1.5,
                flex: 1,
                borderRadius: `${t.shape.borderRadius * 1.5}px`,
                bgcolor: t.palette.background.default,
                border: `1px solid ${t.palette.divider}`,
                display: "flex",
                flexDirection: { xs: "column", md: "column", lg: "row" },
                alignItems: "center",
                justifyContent: { xs: "center", md: "center", lg: "space-between" },
                gap: { xs: 1.25, lg: 0 },
                textAlign: { xs: "center", md: "center", lg: "left" },
              })}
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
                  sx={(t) => ({
                    width: 38,
                    height: 38,
                    borderRadius: `${t.shape.borderRadius}px`,
                    bgcolor: alpha(successColor, 0.12),
                    color: successColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  })}
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
                sx={(t) => ({
                  mt: { xs: 0.5, lg: 0 },
                  minWidth: 44,
                  height: 34,
                  px: 1.5,
                  borderRadius: `${t.shape.borderRadius}px`,
                  bgcolor: alpha(successColor, 0.12),
                  border: "1px solid",
                  borderColor: alpha(successColor, 0.3),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                })}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 800, color: successDark, fontSize: "1rem", lineHeight: 1 }}
                >
                  {activeTenants}
                </Typography>
              </Box>
            </Box>

            {/* Leases Expiring Soon */}
            <Box
              sx={(t) => ({
                p: 1.5,
                flex: 1,
                borderRadius: `${t.shape.borderRadius * 1.5}px`,
                bgcolor: t.palette.background.default,
                border: `1px solid ${t.palette.divider}`,
                display: "flex",
                flexDirection: { xs: "column", md: "column", lg: "row" },
                alignItems: "center",
                justifyContent: { xs: "center", md: "center", lg: "space-between" },
                gap: { xs: 1.25, lg: 0 },
                textAlign: { xs: "center", md: "center", lg: "left" },
              })}
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
                  sx={(t) => ({
                    width: 38,
                    height: 38,
                    borderRadius: `${t.shape.borderRadius}px`,
                    bgcolor: alpha(t.palette.secondary.main, 0.15),
                    color: t.palette.secondary.dark,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  })}
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
                sx={(t) => ({
                  mt: { xs: 0.5, lg: 0 },
                  minWidth: 44,
                  height: 34,
                  px: 1.5,
                  borderRadius: `${t.shape.borderRadius}px`,
                  bgcolor: alpha(t.palette.secondary.main, 0.18),
                  border: "1px solid",
                  borderColor: alpha(t.palette.secondary.main, 0.4),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                })}
              >
                <Typography
                  variant="subtitle1"
                  sx={(t) => ({ fontWeight: 800, color: t.palette.secondary.dark, fontSize: "1rem", lineHeight: 1 })}
                >
                  {expiringLeases}
                </Typography>
              </Box>
            </Box>

            {/* Pending Notices */}
            <Box
              sx={(t) => ({
                p: 1.5,
                flex: 1,
                borderRadius: `${t.shape.borderRadius * 1.5}px`,
                bgcolor: t.palette.background.default,
                border: `1px solid ${t.palette.divider}`,
                display: "flex",
                flexDirection: { xs: "column", md: "column", lg: "row" },
                alignItems: "center",
                justifyContent: { xs: "center", md: "center", lg: "space-between" },
                gap: { xs: 1.25, lg: 0 },
                textAlign: { xs: "center", md: "center", lg: "left" },
              })}
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
                  sx={(t) => ({
                    width: 38,
                    height: 38,
                    borderRadius: `${t.shape.borderRadius}px`,
                    bgcolor: alpha(errorColor, 0.12),
                    color: errorDark,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  })}
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
                sx={(t) => ({
                  mt: { xs: 0.5, lg: 0 },
                  minWidth: 44,
                  height: 34,
                  px: 1.5,
                  borderRadius: `${t.shape.borderRadius}px`,
                  bgcolor: alpha(errorColor, 0.12),
                  border: "1px solid",
                  borderColor: alpha(errorColor, 0.3),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                })}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 800, color: errorDark, fontSize: "1rem", lineHeight: 1 }}
                >
                  {pendingNotices}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* FOOTER VIEW ALL ACTION */}
        <Box
          sx={(t) => ({
            mt: 2,
            pt: 1.5,
            borderTop: `1px solid ${t.palette.divider}`,
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            alignItems: "center",
          })}
        >
          <Button
            size="small"
            endIcon={<ArrowForwardIcon fontSize="small" />}
            onClick={() => navigate("/landlord/tenants")}
            sx={(t) => ({
              fontWeight: 700,
              fontSize: "0.82rem",
              color: t.palette.primary.main,
              textTransform: "none",
              borderRadius: `${t.shape.borderRadius}px`,
              "&:hover": {
                color: t.palette.secondary.main,
                bgcolor: alpha(t.palette.secondary.main, 0.06),
              },
            })}
          >
            Manage All Tenants
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TenantSummaryCard;