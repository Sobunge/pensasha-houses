// src/components/PaymentsCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
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

  // Dynamic status mapping utilizing theme palette tokens
  const getStatusConfig = (theme, status) => {
    switch (status) {
      case "Paid":
        return {
          icon: CheckCircleIcon,
          color: theme.palette.success?.main || "#10B981",
          bg: `${theme.palette.success?.main || "#10B981"}1A`,
        };
      case "Failed":
        return {
          icon: CancelIcon,
          color: theme.palette.error?.main || "#EF4444",
          bg: `${theme.palette.error?.main || "#EF4444"}1A`,
        };
      case "Pending":
      default:
        return {
          icon: HourglassEmptyIcon,
          color: theme.palette.secondary.main,
          bg: `${theme.palette.secondary.main}1A`,
        };
    }
  };

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        flex: compact
          ? undefined
          : { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: compact
          ? { xs: 300, sm: 360 }
          : { xs: "100%", sm: "320px" },
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
      {/* --- Header --- */}
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
          <PaymentIcon sx={{ fontSize: 18 }} />
        </Box>

        <Typography
          variant="subtitle1"
          sx={(theme) => ({
            fontWeight: 700,
            color: theme.palette.text.primary,
            flexGrow: 1,
            fontSize: "1rem",
            letterSpacing: "-0.2px",
          })}
        >
          Payment History
        </Typography>

        {onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              "&:hover": {
                bgcolor: `${theme.palette.primary.main}0D`,
                color: theme.palette.text.primary,
              },
            })}
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
            {displayPayments.map((payment, index) => (
              <PaymentListItem
                key={payment.id || index}
                payment={payment}
                index={index}
                length={displayPayments.length}
                getStatusConfig={getStatusConfig}
              />
            ))}
          </List>
        ) : (
          <Box sx={{ py: 3, textAlign: "center", my: "auto" }}>
            <Typography
              variant="body2"
              sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}
            >
              No recent transactions found.
            </Typography>
          </Box>
        )}
      </CardContent>

      <Divider sx={(theme) => ({ borderStyle: "dashed", borderColor: theme.palette.divider })} />

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
            "& .MuiButton-endIcon": {
              color: theme.palette.secondary.main,
            },
            "&:hover": {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              boxShadow: `0 6px 16px ${theme.palette.secondary.main}4D`,
              "& .MuiButton-endIcon": {
                color: theme.palette.primary.main,
              },
            },
            transition: "all 0.2s ease-in-out",
          })}
        >
          View Full History
        </Button>
      </Box>
    </Card>
  );
}

// Helper sub-component to cleanly scope theme callbacks for list items
function PaymentListItem({ payment, index, length, getStatusConfig }) {
  return (
    <Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          py: 1.25,
          px: 1,
          borderRadius: `${theme.shape.borderRadius * 1.5}px`,
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            bgcolor: `${theme.palette.secondary.main}0F`,
          },
        })}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          {/* Status Icon Badge */}
          <Box
            sx={(theme) => {
              const config = getStatusConfig(theme, payment.status);
              return {
                bgcolor: config.bg,
                width: 36,
                height: 36,
                borderRadius: `${theme.shape.borderRadius}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              };
            }}
          >
            {(theme) => {
              const config = getStatusConfig(theme, payment.status);
              const StatusIcon = config.icon;
              return <StatusIcon sx={{ color: config.color, fontSize: 20 }} />;
            }}
          </Box>

          {/* Payment Metadata */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              sx={(theme) => ({
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: "0.875rem",
              })}
              noWrap
            >
              {payment.amount}
            </Typography>
            <Typography
              variant="caption"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                fontSize: "0.75rem",
                fontWeight: 500,
                display: "block",
              })}
              noWrap
            >
              {payment.date} • {payment.status}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {index < length - 1 && (
        <Divider sx={(theme) => ({ my: 0.5, borderColor: theme.palette.divider })} />
      )}
    </Box>
  );
}

export default PaymentsCard;