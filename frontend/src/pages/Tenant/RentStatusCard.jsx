import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

function RentStatusCard() {
  // Example props – later you can fetch this dynamically
  const rentStatus = "Pending"; // "Pending" | "Paid" | "Overdue"
  const amount = "Ksh 12,000";

  // Pick icon + color based on status
  const getStatusIcon = () => {
    switch (rentStatus) {
      case "Paid":
        return <CheckCircleIcon sx={{ color: "green" }} />;
      case "Pending":
        return <WarningAmberIcon sx={{ color: "#f8b500" }} />;
      case "Overdue":
        return <ErrorIcon sx={{ color: "red" }} />;
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        bgcolor: "#fff",
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#111" }}>
          Rent Status
        </Typography>

        {/* Status Row with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          {getStatusIcon()}
          <Typography variant="body1">
            {rentStatus} – {amount}
          </Typography>
        </Box>

        {/* Show button only if Pending/Overdue */}
        {(rentStatus === "Pending" || rentStatus === "Overdue") && (
          <Box>
            <Button
              variant="contained"
              startIcon={<PaymentIcon />}
              sx={{
                bgcolor: "#f8b500",
                color: "#111",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                "&:hover": { bgcolor: "#c59000" },
              }}
            >
              Pay Now
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default RentStatusCard;
