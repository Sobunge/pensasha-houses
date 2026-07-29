// src/components/QuickActions.jsx
import React from "react";
import { Stack, Card, Typography, Divider, Button, Box } from "@mui/material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const QuickActions = ({
  rentAmount = 0,
  lastPayment = "No recent payments",
  onGenerateInvoice,
  onLogMaintenance,
  onTerminateLease,
}) => (
  <Stack spacing={2.5}>
    {/* --- Rent Summary Slate --- */}
    <Card
      elevation={0}
      sx={{
        bgcolor: "#0F172A",
        color: "#FFFFFF",
        borderRadius: "16px",
        p: 3,
        border: "1px solid rgba(212, 175, 55, 0.3)",
        boxShadow: "0px 12px 32px rgba(15, 23, 42, 0.15)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "120px",
          height: "120px",
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(15, 23, 42, 0) 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <AccountBalanceWalletOutlinedIcon
          sx={{ color: "#D4AF37", fontSize: 18 }}
        />
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            letterSpacing: "0.8px",
            color: "#94A3B8",
            textTransform: "uppercase",
          }}
        >
          Monthly Rent
        </Typography>
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "#FFFFFF",
          mb: 1.5,
          letterSpacing: "-0.5px",
        }}
      >
        KES {Number(rentAmount).toLocaleString()}
      </Typography>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 1.5 }} />

      <Typography
        variant="body2"
        sx={{ color: "#CBD5E1", fontSize: "0.8125rem" }}
      >
        Last payment:{" "}
        <Box component="span" sx={{ color: "#D4AF37", fontWeight: 700 }}>
          {lastPayment}
        </Box>
      </Typography>
    </Card>

    {/* --- Quick Actions Section --- */}
    <Typography
      variant="caption"
      sx={{
        px: 0.5,
        fontWeight: 800,
        color: "#64748B",
        letterSpacing: "0.8px",
        textTransform: "uppercase",
      }}
    >
      Quick Actions
    </Typography>

    <Stack spacing={1.5}>
      {/* Primary Action Button */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<ReceiptLongOutlinedIcon />}
        onClick={onGenerateInvoice}
        sx={{
          bgcolor: "#0F172A",
          color: "#FFFFFF",
          fontWeight: 700,
          py: 1.25,
          borderRadius: "10px",
          textTransform: "none",
          fontSize: "0.875rem",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.12)",
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
          transition: "all 0.2s ease-in-out",
        }}
      >
        Generate Invoice
      </Button>

      {/* Secondary Action Button */}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<BuildOutlinedIcon />}
        onClick={onLogMaintenance}
        sx={{
          borderColor: "#E2E8F0",
          bgcolor: "#FFFFFF",
          color: "#0F172A",
          fontWeight: 700,
          py: 1.25,
          borderRadius: "10px",
          textTransform: "none",
          fontSize: "0.875rem",
          "& .MuiButton-startIcon": {
            color: "#64748B",
          },
          "&:hover": {
            borderColor: "#0F172A",
            bgcolor: "rgba(15, 23, 42, 0.04)",
            "& .MuiButton-startIcon": {
              color: "#0F172A",
            },
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        Log Maintenance
      </Button>

      {/* Danger/Destructive Action Button */}
      <Button
        fullWidth
        variant="text"
        startIcon={<GavelOutlinedIcon />}
        onClick={onTerminateLease}
        sx={{
          color: "#EF4444",
          fontWeight: 700,
          py: 1,
          borderRadius: "10px",
          textTransform: "none",
          fontSize: "0.8125rem",
          "&:hover": {
            bgcolor: "rgba(239, 68, 68, 0.08)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        Terminate Lease
      </Button>
    </Stack>
  </Stack>
);

export default QuickActions;