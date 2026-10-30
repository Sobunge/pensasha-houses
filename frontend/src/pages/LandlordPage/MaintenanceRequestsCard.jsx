// src/components/cards/MaintenanceRequestsCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Skeleton,
  Alert,
  useTheme,
  alpha,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import { useNavigate } from "react-router-dom";
import { useMaintenanceRequests } from "../../components/hooks/landlord/useMaintenanceRequests";

function MaintenanceRequestsCard({ userId }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    data: maintenanceData = [],
    isLoading,
    isError,
    error,
  } = useMaintenanceRequests(userId, 5);

  const hasRequests = maintenanceData && maintenanceData.length > 0;
  const displayedRequests = maintenanceData.slice(0, 3);

  // Helper to resolve status pill styles using theme tokens
  const getStatusChipStyles = (currentTheme, status) => {
    const s = status?.toUpperCase() || "";
    if (s.includes("PENDING") || s.includes("NEW") || s.includes("OPEN")) {
      return { bgcolor: currentTheme.palette.action.hover, color: currentTheme.palette.text.secondary };
    }
    if (s.includes("PROGRESS")) {
      return {
        bgcolor: alpha(currentTheme.palette.warning?.main || "#D97706", 0.15),
        color: currentTheme.palette.warning?.dark || "#D97706",
      };
    }
    if (s.includes("COMPLETED") || s.includes("RESOLVED")) {
      return {
        bgcolor: alpha(currentTheme.palette.success?.main || "#10B981", 0.15),
        color: currentTheme.palette.success?.dark || "#059669",
      };
    }
    return {
      bgcolor: currentTheme.palette.action.hover,
      color: currentTheme.palette.text.secondary,
    };
  };

  // Helper to resolve urgency pill styles using theme tokens
  const getUrgencyChipStyles = (currentTheme, urgency) => {
    const u = urgency?.toUpperCase() || "";
    if (u.includes("URGENT") || u.includes("HIGH")) {
      return {
        bgcolor: alpha(currentTheme.palette.error?.main || "#EF4444", 0.15),
        color: currentTheme.palette.error?.main || "#DC2626",
      };
    }
    if (u.includes("MEDIUM") || u.includes("MED")) {
      return {
        bgcolor: alpha(currentTheme.palette.warning?.main || "#D97706", 0.15),
        color: currentTheme.palette.warning?.dark || "#D97706",
      };
    }
    return {
      bgcolor: currentTheme.palette.action.hover,
      color: currentTheme.palette.text.secondary,
    };
  };

  // Format Status enum to readable text
  const formatStatus = (status) => {
    if (!status) return "Pending";
    return status
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Format Urgency/Priority enum to readable text
  const formatUrgency = (urgency) => {
    if (!urgency) return "Medium";
    return urgency
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Loading state
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
        <Skeleton variant="rounded" width="100%" height={180} sx={{ borderRadius: 2 }} />
      </Card>
    );
  }

  // Error state
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
          {error?.message || "Failed to load maintenance requests."}
        </Alert>
      </Card>
    );
  }

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
          p: { xs: 2, sm: 3 },
          "&:last-child": { pb: { xs: 2, sm: 2.5 } },
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        {/* HEADER */}
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="h6"
            sx={(t) => ({ fontWeight: 800, color: t.palette.primary.main, lineHeight: 1.2 })}
          >
            Open Maintenance Requests
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Prioritized list at central location
          </Typography>
        </Box>

        {/* CONTENT AREA: 3-COLUMN TABLE OR EMPTY STATE */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", width: "100%" }}>
          {hasRequests ? (
            <Table sx={{ width: "100%", mt: 1 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={(t) => ({
                      color: t.palette.primary.main,
                      fontWeight: 800,
                      fontSize: { xs: "0.72rem", sm: "0.78rem" },
                      pl: 0,
                      py: 1,
                      borderBottom: `1px solid ${t.palette.divider}`,
                    })}
                  >
                    Ticket Status
                  </TableCell>
                  <TableCell
                    sx={(t) => ({
                      color: t.palette.primary.main,
                      fontWeight: 800,
                      fontSize: { xs: "0.72rem", sm: "0.78rem" },
                      py: 1,
                      px: { xs: 1, sm: 1.5 },
                      borderBottom: `1px solid ${t.palette.divider}`,
                    })}
                  >
                    Unit
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={(t) => ({
                      color: t.palette.primary.main,
                      fontWeight: 800,
                      fontSize: { xs: "0.72rem", sm: "0.78rem" },
                      pr: 0,
                      py: 1,
                      borderBottom: `1px solid ${t.palette.divider}`,
                    })}
                  >
                    Urgency
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {displayedRequests.map((req) => {
                  const statusStyles = getStatusChipStyles(theme, req.status);
                  const urgencyStyles = getUrgencyChipStyles(theme, req.urgency);

                  return (
                    <TableRow
                      key={req.id}
                      sx={(t) => ({
                        transition: "background-color 0.15s ease",
                        "&:hover": {
                          bgcolor: alpha(t.palette.primary.main, 0.02),
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      })}
                    >
                      {/* Column 1: Ticket Status Pill */}
                      <TableCell sx={{ pl: 0, py: 1.5 }}>
                        <Chip
                          label={formatStatus(req.status)}
                          size="small"
                          sx={(t) => ({
                            ...statusStyles,
                            fontWeight: 700,
                            fontSize: { xs: "0.68rem", sm: "0.72rem" },
                            borderRadius: `${t.shape.borderRadius / 1.5}px`,
                            height: 24,
                            px: 0.5,
                          })}
                        />
                      </TableCell>

                      {/* Column 2: Unit */}
                      <TableCell
                        sx={(t) => ({
                          py: 1.5,
                          px: { xs: 1, sm: 1.5 },
                          fontWeight: 600,
                          color: t.palette.primary.main,
                          fontSize: { xs: "0.78rem", sm: "0.82rem" },
                          whiteSpace: "nowrap",
                        })}
                      >
                        {req.unitName}
                      </TableCell>

                      {/* Column 3: Urgency / Issue Pill */}
                      <TableCell align="right" sx={{ pr: 0, py: 1.5 }}>
                        <Chip
                          label={`${req.issue} • ${formatUrgency(req.urgency)}`}
                          size="small"
                          sx={(t) => ({
                            ...urgencyStyles,
                            fontWeight: 700,
                            fontSize: { xs: "0.68rem", sm: "0.72rem" },
                            borderRadius: `${t.shape.borderRadius}px`,
                            height: 24,
                            px: 0.5,
                          })}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            /* ELEGANT EMPTY STATE */
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 3,
                textAlign: "center",
              }}
            >
              <Box
                sx={(t) => ({
                  width: 56,
                  height: 56,
                  borderRadius: `${t.shape.borderRadius * 1.5}px`,
                  bgcolor: alpha(t.palette.secondary.main, 0.12),
                  color: t.palette.secondary.main,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                })}
              >
                <HandymanOutlinedIcon sx={{ fontSize: 30 }} />
              </Box>

              <Typography
                variant="subtitle1"
                sx={(t) => ({ fontWeight: 800, color: t.palette.primary.main, mb: 0.5 })}
              >
                No Pending Maintenance
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 280, mb: 2, fontSize: "0.82rem" }}
              >
                All maintenance tickets have been resolved across your units.
              </Typography>
            </Box>
          )}
        </Box>

        {/* FOOTER VIEW ALL ACTION */}
        {hasRequests && (
          <Box
            sx={(t) => ({
              mt: "auto",
              pt: 1.5,
              borderTop: `1px solid ${t.palette.divider}`,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
            })}
          >
            <Button
              size="small"
              endIcon={<ArrowForwardIcon fontSize="small" />}
              onClick={() => navigate("/landlord/maintenance-requests")}
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
              {maintenanceData.length > 3
                ? `View All (${maintenanceData.length}) Requests`
                : "View All Requests"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default MaintenanceRequestsCard;