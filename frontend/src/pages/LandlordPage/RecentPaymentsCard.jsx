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
  useTheme,
  alpha,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { useNavigate } from "react-router-dom";

// Sample payments data matching the financial log
const paymentsData = [
  {
    id: 1,
    date: "10 Oct",
    tenant: "John Doe",
    unit: "Unit B2",
    amount: "Ksh 20,000",
    method: "M-Pesa",
  },
  {
    id: 2,
    date: "08 Oct",
    tenant: "Jane Wanjiku",
    unit: "Unit A4",
    amount: "Ksh 18,000",
    method: "Bank Wire",
  },
  {
    id: 3,
    date: "05 Oct",
    tenant: "Ali Mwinyi",
    unit: "Unit C1",
    amount: "Ksh 15,000",
    method: "Cash",
  },
  {
    id: 4,
    date: "01 Oct",
    tenant: "Mary Otieno",
    unit: "Unit A1",
    amount: "Ksh 25,000",
    method: "M-Pesa",
  },
];

function RecentPaymentsCard() {
  const navigate = useNavigate();
  const theme = useTheme();

  const hasPayments = paymentsData && paymentsData.length > 0;

  // Cap at 3 items maximum on dashboard overview
  const displayedPayments = paymentsData ? paymentsData.slice(0, 3) : [];

  // Helper to format method badge colors
  const getMethodChipStyles = (method) => {
    switch (method) {
      case "M-Pesa":
        return {
          bgcolor: alpha("#10B981", 0.12),
          color: "#059669",
        };
      case "Bank Wire":
        return {
          bgcolor: alpha("#3B82F6", 0.12),
          color: "#2563EB",
        };
      case "Cash":
        return {
          bgcolor: alpha("#D4AF37", 0.15),
          color: "#B5922B",
        };
      default:
        return {
          bgcolor: "#F1F5F9",
          color: "#64748B",
        };
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
        border: "1px solid",
        borderColor: "divider",
        height: "90%",
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
          height: "100%",
        }}
      >
        {/* HEADER */}
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: "primary.main", lineHeight: 1.2 }}
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
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      pl: 0,
                      py: 1,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      py: 1,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    Tenant & Unit
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      py: 1,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      pr: 0,
                      py: 1,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    Method
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {displayedPayments.map((payment) => {
                  const methodStyles = getMethodChipStyles(payment.method);

                  return (
                    <TableRow
                      key={payment.id}
                      sx={{
                        transition: "background-color 0.15s ease",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.02),
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
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
                        {payment.date}
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
                          {payment.tenant}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight={500}
                          sx={{ fontSize: "0.72rem" }}
                        >
                          {payment.unit}
                        </Typography>
                      </TableCell>

                      {/* Column 3: Amount */}
                      <TableCell
                        sx={{
                          py: 1.5,
                          fontWeight: 800,
                          color: "primary.main",
                          fontSize: "0.85rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {payment.amount}
                      </TableCell>

                      {/* Column 4: Payment Method Pill */}
                      <TableCell align="right" sx={{ pr: 0, py: 1.5 }}>
                        <Chip
                          label={payment.method}
                          size="small"
                          sx={{
                            ...methodStyles,
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            borderRadius: "8px",
                            height: 24,
                            px: 0.5,
                          }}
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
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "16px",
                  bgcolor: "rgba(212, 175, 55, 0.12)",
                  color: "secondary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <PaymentOutlinedIcon sx={{ fontSize: 30 }} />
              </Box>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 800, color: "primary.main", mb: 0.5 }}
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
            sx={{
              mt: "auto",
              pt: 1.5,
              borderTop: "1px solid #F1F5F9",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              size="small"
              endIcon={<ArrowForwardIcon fontSize="small" />}
              onClick={() => navigate("/landlord/finances")}
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