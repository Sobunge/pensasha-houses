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
      sx={(theme) => ({
        flex: { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: { xs: "100%", sm: "320px" },
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        border: `1.5px solid ${theme.palette.secondary.main}`,
        boxShadow: `0 10px 30px ${theme.palette.primary.main}14`,
        bgcolor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: `0 14px 36px ${theme.palette.primary.main}1F`,
          transform: "translateY(-4px)",
          borderColor: theme.palette.secondary.dark,
        },
      })}
    >
      {/* Header */}
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: `${theme.palette.secondary.main}0A`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: `${theme.shape.borderRadius}px`,
            bgcolor: `${theme.palette.secondary.main}1F`,
            color: theme.palette.secondary.main,
          })}
        >
          <BuildIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography
          variant="subtitle1"
          sx={(theme) => ({
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: "1rem",
            letterSpacing: "-0.2px",
          })}
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
            <CircularProgress size={28} sx={(theme) => ({ color: theme.palette.secondary.main })} />
            <Typography
              variant="body2"
              sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}
            >
              Fetching status...
            </Typography>
          </Stack>
        ) : error ? (
          <Typography
            variant="body2"
            sx={(theme) => ({ color: theme.palette.error?.main || "#EF4444", fontWeight: 600 })}
          >
            Unable to load requests
          </Typography>
        ) : (
          <Stack spacing={2} alignItems="center" width="100%">
            <Box textAlign="center">
              <Typography
                variant="h3"
                sx={(theme) => ({
                  fontWeight: 800,
                  color: theme.palette.text.primary,
                  lineHeight: 1,
                  fontSize: { xs: "2.5rem", sm: "3rem" },
                })}
              >
                {totalOpen}
              </Typography>
              <Typography
                variant="body2"
                sx={(theme) => ({
                  mt: 1.5,
                  color: theme.palette.text.secondary,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  fontSize: "0.75rem",
                })}
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
                sx={(theme) => ({
                  height: 24,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  bgcolor: `${theme.palette.primary.main}0D`,
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.divider}`,
                })}
              />

              {/* In Progress Badge */}
              <Chip
                label={`In Progress: ${inProgressCount}`}
                size="small"
                sx={(theme) => ({
                  height: 24,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  bgcolor: `${theme.palette.secondary.main}26`,
                  color: theme.palette.secondary.main,
                  border: `1px solid ${theme.palette.secondary.main}4D`,
                })}
              />
            </Box>
          </Stack>
        )}
      </CardContent>

      <Divider sx={(theme) => ({ borderStyle: "dashed", borderColor: theme.palette.divider })} />

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
          sx={(theme) => ({
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            textTransform: "none",
            fontWeight: 700,
            fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: 1.2,
            borderRadius: `${theme.shape.borderRadius}px`,
            width: { xs: "100%", sm: "auto" },
            boxShadow: `0 4px 12px ${theme.palette.primary.main}26`,
            "& .MuiButton-startIcon": {
              color: theme.palette.secondary.main,
            },
            "&:hover": {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              boxShadow: `0 6px 16px ${theme.palette.secondary.main}4D`,
              "& .MuiButton-startIcon": {
                color: theme.palette.primary.main,
              },
            },
            "&.Mui-disabled": {
              bgcolor: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
              "& .MuiButton-startIcon": {
                color: theme.palette.action.disabled,
              },
            },
            transition: "all 0.2s ease-in-out",
          })}
        >
          Manage Requests
        </Button>
      </Box>
    </Card>
  );
}

export default MaintenanceCard;