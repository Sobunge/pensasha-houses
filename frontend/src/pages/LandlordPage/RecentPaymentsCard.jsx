// src/components/cards/RecentPaymentsCard.jsx
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
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { useNavigate } from "react-router-dom";
import { useRecentPayments } from "../../components/hooks/landlord/useRecentPayments";

function RecentPaymentsCard({ userId }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const { data: paymentsData = [], isLoading, isError, error } = useRecentPayments(userId, 5);

  const hasPayments = paymentsData && paymentsData.length > 0;
  const displayedPayments = paymentsData.slice(0, 3);

  const formatPaymentDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  const getMethodChipStyles = (currentTheme, method) => {
    const formattedMethod = method?.toUpperCase() || "";
    if (formattedMethod.includes("MPESA") || formattedMethod.includes("M-PESA")) {
      return {
        bgcolor: alpha(currentTheme.palette.success?.main || "#10B981", 0.12),
        color: currentTheme.palette.success?.dark || "#059669",
      };
    }
    if (formattedMethod.includes("BANK") || formattedMethod.includes("WIRE")) {
      return {
        bgcolor: alpha(currentTheme.palette.info?.main || "#3B82F6", 0.12),
        color: currentTheme.palette.info?.dark || "#2563EB",
      };
    }
    if (formattedMethod.includes("CASH")) {
      return {
        bgcolor: alpha(currentTheme.palette.secondary.main, 0.15),
        color: currentTheme.palette.secondary.dark,
      };
    }
    return {
      bgcolor: currentTheme.palette.action.hover,
      color: currentTheme.palette.text.secondary,
    };
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
          {error?.message || "Failed to load recent payments log."}
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
          p: { xs: 2.5, sm: 3 },
          "&:last-child": { pb: { xs: 2, sm: 2.5 } },
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* HEADER */}
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="h6"
            sx={(t) => ({ fontWeight: 800, color: t.palette.primary.main, lineHeight: 1.2 })}
          >
            Recent Payment Log
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Real-time rent collections & transaction history
          </Typography>
        </Box>

        {/* CONTENT AREA: TABLE OR EMPTY STATE */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {hasPayments ? (
            <Table sx={{ minWidth: 320, mt: 1 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={(t) => ({
                      color: t.palette.primary.main,
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      pl: 0,
                      py: 1,
                      borderBottom: `1px solid ${t.palette.divider}`,
                    })}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={(t) => ({
                      color: t.palette.primary.main,
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      py: 1,
                      borderBottom: `1px solid ${t.palette.divider}`,
                    })}
                  >
                    Tenant & Unit
                  </TableCell>
                  <TableCell
                    sx={(t) => ({
                      color: t.palette.primary.main,
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      py: 1,
                      borderBottom: `1px solid ${t.palette.divider}`,
                    })}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={(t) => ({
                      color: t.palette.primary.main,
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      pr: 0,
                      py: 1,
                      borderBottom: `1px solid ${t.palette.divider}`,
                    })}
                  >
                    Method
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {displayedPayments.map((payment) => {
                  const methodStyles = getMethodChipStyles(theme, payment.method);
                  const formattedAmount = payment.amount
                    ? `Ksh ${Number(payment.amount).toLocaleString()}`
                    : "Ksh 0";

                  return (
                    <TableRow
                      key={payment.id}
                      sx={(t) => ({
                        transition: "background-color 0.15s ease",
                        "&:hover": {
                          bgcolor: alpha(t.palette.primary.main, 0.02),
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      })}
                    >
                      {/* Column 1: Date */}
                      <TableCell
                        sx={{
                          pl: 0,
                          py: 1.5,
                          fontWeight: 700,
                          color: "text.secondary",
                          fontSize: "0.78rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatPaymentDate(payment.paymentDate)}
                      </TableCell>

                      {/* Column 2: Tenant & Unit */}
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          color="primary.main"
                          noWrap
                          sx={{ lineHeight: 1.2 }}
                        >
                          {payment.tenantName}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight={500}
                          sx={{ fontSize: "0.72rem" }}
                        >
                          {payment.unitName}
                        </Typography>
                      </TableCell>

                      {/* Column 3: Amount */}
                      <TableCell
                        sx={(t) => ({
                          py: 1.5,
                          fontWeight: 800,
                          color: t.palette.primary.main,
                          fontSize: "0.85rem",
                          whiteSpace: "nowrap",
                        })}
                      >
                        {formattedAmount}
                      </TableCell>

                      {/* Column 4: Payment Method Pill */}
                      <TableCell align="right" sx={{ pr: 0, py: 1.5 }}>
                        <Chip
                          label={payment.method}
                          size="small"
                          sx={(t) => ({
                            ...methodStyles,
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            borderRadius: `${t.shape.borderRadius / 1.5}px`,
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
            /* EMPTY STATE */
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
                <PaymentOutlinedIcon sx={{ fontSize: 30 }} />
              </Box>

              <Typography
                variant="subtitle1"
                sx={(t) => ({ fontWeight: 800, color: t.palette.primary.main, mb: 0.5 })}
              >
                No Payments Recorded
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 280, mb: 2, fontSize: "0.82rem" }}
              >
                There are no recent payments logged for the current active billing cycle.
              </Typography>
            </Box>
          )}
        </Box>

        {/* FOOTER VIEW ALL ACTION */}
        {hasPayments && (
          <Box
            sx={(t) => ({
              mt: "auto",
              pt: 1,
              borderTop: `1px solid ${t.palette.divider}`,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            })}
          >
            <Button
              size="small"
              endIcon={<ArrowForwardIcon fontSize="small" />}
              onClick={() => navigate("/landlord/finances")}
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
              {paymentsData.length > 3
                ? `View All (${paymentsData.length}) Payments`
                : "View All Payments"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentPaymentsCard;