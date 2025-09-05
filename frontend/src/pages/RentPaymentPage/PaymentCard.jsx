// src/pages/RentPayments/PaymentCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function PaymentCard({ payment, onView }) {
  // Status chip styling
  const getStatusChip = (status) => {
    switch (status) {
      case "Paid":
        return (
          <Chip
            label="Paid"
            color="success"
            size="small"
            icon={<PaidIcon />}
            sx={{ fontWeight: 600 }}
          />
        );
      case "Pending":
        return (
          <Chip
            label="Pending"
            color="warning"
            size="small"
            icon={<AccessTimeIcon />}
            sx={{ fontWeight: 600 }}
          />
        );
      case "Overdue":
        return (
          <Chip
            label="Overdue"
            color="error"
            size="small"
            icon={<WarningAmberIcon />}
            sx={{ fontWeight: 600 }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        bgcolor: "#fff",
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          {/* Header: Period + Status */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {payment.period}
            </Typography>
            {getStatusChip(payment.status)}
          </Stack>

          {/* Invoice and amount */}
          <Typography variant="body2" color="text.secondary">
            Invoice: {payment.invoiceNo}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Ksh {payment.amount.toLocaleString()}
          </Typography>

          {/* Due date */}
          <Typography variant="caption" color="text.secondary">
            Due: {payment.dueDate}
          </Typography>

          {/* Action Button */}
          <Stack direction="row" justifyContent="flex-end">
            <Button
              size="small"
              variant="contained"
              sx={{
                bgcolor:
                  payment.status === "Paid"
                    ? "primary.main"
                    : "success.main",
                "&:hover": {
                  bgcolor:
                    payment.status === "Paid"
                      ? "primary.dark"
                      : "success.dark",
                },
              }}
              onClick={() => onView(payment)}
            >
              {payment.status === "Paid" ? "View" : "Pay Now"}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PaymentCard;
