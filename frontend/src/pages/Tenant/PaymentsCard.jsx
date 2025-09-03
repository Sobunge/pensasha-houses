import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

function PaymentsCard() {
  // Placeholder recent payments
  const recentPayments = [
    { date: "Aug 2025", amount: "Ksh 12,000", status: "Paid" },
    { date: "Jul 2025", amount: "Ksh 12,000", status: "Paid" },
    { date: "Jun 2025", amount: "Ksh 12,000", status: "Paid" },
  ];

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#fff" }}>
      <CardContent>
        {/* Title with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <PaymentIcon sx={{ color: "#f8b500" }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#111" }}>
            Payments History
          </Typography>
        </Box>

        {/* Recent Payments List */}
        <List dense>
          {recentPayments.map((payment, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemText
                primary={`${payment.date} – ${payment.amount}`}
                secondary={payment.status}
                primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
                secondaryTypographyProps={{ fontSize: "0.8rem", color: "#555" }}
              />
            </ListItem>
          ))}
        </List>

        {/* Action */}
        <Button
          variant="contained"
          size="small"
          sx={{
            mt: 1,
            bgcolor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            "&:hover": { bgcolor: "#c59000" },
          }}
        >
          View All
        </Button>
      </CardContent>
    </Card>
  );
}

export default PaymentsCard;
