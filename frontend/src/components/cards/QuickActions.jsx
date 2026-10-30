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
      sx={(theme) => ({
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        p: 3,
        border: `1px solid ${theme.palette.secondary.main}4D`,
        boxShadow: `0px 12px 32px ${theme.palette.primary.main}26`,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "120px",
          height: "120px",
          background: `radial-gradient(circle, ${theme.palette.secondary.main}1F 0%, ${theme.palette.primary.main}00 70%)`,
          pointerEvents: "none",
        },
      })}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <AccountBalanceWalletOutlinedIcon
          sx={(theme) => ({ color: theme.palette.secondary.main, fontSize: 18 })}
        />
        <Typography
          variant="caption"
          sx={(theme) => ({
            fontWeight: 800,
            letterSpacing: "0.8px",
            color: theme.palette.text.secondary,
            textTransform: "uppercase",
          })}
        >
          Monthly Rent
        </Typography>
      </Box>

      <Typography
        variant="h4"
        sx={(theme) => ({
          fontWeight: 800,
          color: theme.palette.primary.contrastText,
          mb: 1.5,
          letterSpacing: "-0.5px",
        })}
      >
        KES {Number(rentAmount).toLocaleString()}
      </Typography>

      <Divider sx={(theme) => ({ borderColor: `${theme.palette.common.white}1A`, my: 1.5 })} />

      <Typography
        variant="body2"
        sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: "0.8125rem" })}
      >
        Last payment:{" "}
        <Box component="span" sx={(theme) => ({ color: theme.palette.secondary.main, fontWeight: 700 })}>
          {lastPayment}
        </Box>
      </Typography>
    </Card>

    {/* --- Quick Actions Section --- */}
    <Typography
      variant="caption"
      sx={(theme) => ({
        px: 0.5,
        fontWeight: 800,
        color: theme.palette.text.secondary,
        letterSpacing: "0.8px",
        textTransform: "uppercase",
      })}
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
        sx={(theme) => ({
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: 700,
          py: 1.25,
          borderRadius: `${theme.shape.borderRadius}px`,
          textTransform: "none",
          fontSize: "0.875rem",
          boxShadow: `0 4px 12px ${theme.palette.primary.main}1F`,
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
          transition: "all 0.2s ease-in-out",
        })}
      >
        Generate Invoice
      </Button>

      {/* Secondary Action Button */}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<BuildOutlinedIcon />}
        onClick={onLogMaintenance}
        sx={(theme) => ({
          borderColor: theme.palette.divider,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.primary.main,
          fontWeight: 700,
          py: 1.25,
          borderRadius: `${theme.shape.borderRadius}px`,
          textTransform: "none",
          fontSize: "0.875rem",
          "& .MuiButton-startIcon": {
            color: theme.palette.text.secondary,
          },
          "&:hover": {
            borderColor: theme.palette.primary.main,
            bgcolor: `${theme.palette.primary.main}0A`,
            "& .MuiButton-startIcon": {
              color: theme.palette.primary.main,
            },
          },
          transition: "all 0.2s ease-in-out",
        })}
      >
        Log Maintenance
      </Button>

      {/* Danger/Destructive Action Button */}
      <Button
        fullWidth
        variant="text"
        startIcon={<GavelOutlinedIcon />}
        onClick={onTerminateLease}
        sx={(theme) => ({
          color: theme.palette.error?.main || "#EF4444",
          fontWeight: 700,
          py: 1,
          borderRadius: `${theme.shape.borderRadius}px`,
          textTransform: "none",
          fontSize: "0.8125rem",
          "&:hover": {
            bgcolor: `${theme.palette.error?.main || "#EF4444"}14`,
          },
          transition: "all 0.2s ease-in-out",
        })}
      >
        Terminate Lease
      </Button>
    </Stack>
  </Stack>
);

export default QuickActions;