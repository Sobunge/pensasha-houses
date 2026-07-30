// src/components/MaintenanceCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/BuildOutlined";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import { useTenantRequestsCount } from "../hooks/useTenantRequestsCount";

function MaintenanceCard({ tenantId }) {
  const navigate = useNavigate();
  const { counts, loading, error } = useTenantRequestsCount(tenantId);

  const pendingCount = counts?.PENDING || 0;
  const inProgressCount = counts?.IN_PROGRESS || 0;
  const totalOpen = pendingCount + inProgressCount;

  return (
    <Card
      elevation={0}
      sx={{
        flex: { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: { xs: "100%", sm: "320px" },
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0px 12px 32px rgba(15, 23, 42, 0.08)",
          transform: "translateY(-4px)",
          borderColor: "rgba(212, 175, 55, 0.4)",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: "rgba(212, 175, 55, 0.04)",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "8px",
            bgcolor: "rgba(212, 175, 55, 0.12)",
            color: "#D4AF37",
          }}
        >
          <BuildIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: "#0F172A",
            fontSize: "1rem",
            letterSpacing: "-0.2px",
          }}
        >
          Maintenance
        </Typography>
      </Box>

      {/* Main Content */}
      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          minHeight: 160,
        }}
      >
        {loading ? (
          <Stack alignItems="center" spacing={1.5}>
            <CircularProgress size={28} sx={{ color: "#D4AF37" }} />
            <Typography
              variant="body2"
              sx={{ color: "#64748B", fontWeight: 500 }}
            >
              Fetching status...
            </Typography>
          </Stack>
        ) : error ? (
          <Typography
            variant="body2"
            sx={{ color: "#EF4444", fontWeight: 600 }}
          >
            Unable to load requests
          </Typography>
        ) : (
          <Stack spacing={2} alignItems="center" width="100%">
            <Box textAlign="center">
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "#0F172A",
                  lineHeight: 1,
                  fontSize: { xs: "2.5rem", sm: "3rem" },
                }}
              >
                {totalOpen}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 1.5,
                  color: "#64748B",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  fontSize: "0.75rem",
                }}
              >
                Active Request{totalOpen !== 1 ? "s" : ""}
              </Typography>
            </Box>

            {/* Status Breakdown Badges */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {/* Pending Badge */}
              <Chip
                label={`Pending: ${pendingCount}`}
                size="small"
                sx={{
                  height: 24,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  bgcolor: "rgba(15, 23, 42, 0.05)",
                  color: "#0F172A",
                  border: "1px solid #E2E8F0",
                }}
              />

              {/* In Progress Badge */}
              <Chip
                label={`In Progress: ${inProgressCount}`}
                size="small"
                sx={{
                  height: 24,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  bgcolor: "rgba(212, 175, 55, 0.15)",
                  color: "#D4AF37",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                }}
              />
            </Box>
          </Stack>
        )}
      </CardContent>

      <Divider sx={{ borderStyle: "dashed", borderColor: "#E2E8F0" }} />

      {/* Footer Aligned Responsively */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
      >
        <Button
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={() => navigate("/tenant/maintenance-requests")}
          disabled={loading || error}
          sx={{
            bgcolor: "#0F172A",
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: 700,
            fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: 1.2,
            borderRadius: "10px",
            width: { xs: "100%", sm: "auto" },
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            "& .MuiButton-startIcon": {
              color: "#D4AF37",
            },
            "&:hover": {
              bgcolor: "#D4AF37",
              color: "#0F172A",
              boxShadow: "0 6px 16px rgba(212, 175, 55, 0.3)",
              "& .MuiButton-startIcon": {
                color: "#0F172A",
              },
            },
            "&.Mui-disabled": {
              bgcolor: "#F1F5F9",
              color: "#94A3B8",
              "& .MuiButton-startIcon": {
                color: "#94A3B8",
              },
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          Manage Requests
        </Button>
      </Box>
    </Card>
  );
}

export default MaintenanceCard;