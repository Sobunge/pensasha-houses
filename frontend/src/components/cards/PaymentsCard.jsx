// src/components/PaymentsCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  Button,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/PaymentOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmptyOutlined";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../pages/Auth/AuthContext";

const STATUS_CONFIG = {
  Paid: { icon: CheckCircleIcon, color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" },
  Pending: { icon: HourglassEmptyIcon, color: "#D4AF37", bg: "rgba(212, 175, 55, 0.1)" },
  Failed: { icon: CancelIcon, color: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" },
};

function PaymentsCard({ payments = [], compact = false, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role || "tenant";

  const displayPayments = compact ? payments.slice(0, 3) : payments.slice(0, 3);
  const hasPayments = displayPayments.length > 0;

  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <Card
      elevation={0}
      sx={{
        flex: compact
          ? undefined
          : { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: compact
          ? { xs: 300, sm: 360 }
          : { xs: "100%", sm: "320px" },
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
      {/* --- Header --- */}
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
          <PaymentIcon sx={{ fontSize: 18 }} />
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: "#0F172A",
            flexGrow: 1,
            fontSize: "1rem",
            letterSpacing: "-0.2px",
          }}
        >
          Payment History
        </Typography>

        {onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: "#64748B",
              "&:hover": { bgcolor: "rgba(15, 23, 42, 0.05)", color: "#0F172A" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* --- Content Area --- */}
      <CardContent
        sx={{
          p: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: !hasPayments ? "center" : "flex-start",
          minHeight: 160,
        }}
      >
        {hasPayments ? (
          <List disablePadding>
            {displayPayments.map((payment, index) => {
              const config = STATUS_CONFIG[payment.status] || STATUS_CONFIG.Pending;
              const StatusIcon = config.icon;

              return (
                <Box key={payment.id || index}>
                  <ListItem
                    disableGutters
                    sx={{
                      py: 1.25,
                      px: 1,
                      borderRadius: "12px",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        bgcolor: "rgba(212, 175, 55, 0.06)",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{ width: "100%" }}
                    >
                      {/* Status Icon Badge */}
                      <Box
                        sx={{
                          bgcolor: config.bg,
                          width: 36,
                          height: 36,
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <StatusIcon sx={{ color: config.color, fontSize: 20 }} />
                      </Box>

                      {/* Payment Metadata */}
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: "#0F172A",
                            fontSize: "0.875rem",
                          }}
                          noWrap
                        >
                          {payment.amount}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#64748B",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                          }}
                          noWrap
                        >
                          {payment.date} • {payment.status}
                        </Typography>
                      </Box>
                    </Stack>
                  </ListItem>

                  {index < displayPayments.length - 1 && (
                    <Divider sx={{ my: 0.5, borderColor: "#F1F5F9" }} />
                  )}
                </Box>
              );
            })}
          </List>
        ) : (
          <Box sx={{ py: 3, textAlign: "center", my: "auto" }}>
            <Typography
              variant="body2"
              sx={{ color: "#64748B", fontWeight: 500 }}
            >
              No recent transactions found.
            </Typography>
          </Box>
        )}
      </CardContent>

      <Divider sx={{ borderStyle: "dashed", borderColor: "#E2E8F0" }} />

      {/* --- Action Footer --- */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
      >
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => handleNavigate(`/${role}/rent-payments`)}
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
            "& .MuiButton-endIcon": {
              color: "#D4AF37",
            },
            "&:hover": {
              bgcolor: "#D4AF37",
              color: "#0F172A",
              boxShadow: "0 6px 16px rgba(212, 175, 55, 0.3)",
              "& .MuiButton-endIcon": {
                color: "#0F172A",
              },
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          View Full History
        </Button>
      </Box>
    </Card>
  );
}

export default PaymentsCard;