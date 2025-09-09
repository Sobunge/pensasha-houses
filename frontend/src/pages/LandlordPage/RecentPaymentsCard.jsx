// src/components/cards/RecentPaymentsCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

const payments = [
  { tenant: "John Doe", amount: "Ksh 20,000", date: "Sept 3, 2025" },
  { tenant: "Jane Wanjiku", amount: "Ksh 18,000", date: "Sept 1, 2025" },
  { tenant: "Ali Mwinyi", amount: "Ksh 15,000", date: "Aug 30, 2025" },
];

function RecentPaymentsCard() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#111" }}>
          Recent Payments
        </Typography>
        {payments.map((payment, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {payment.tenant}
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              {payment.amount} – {payment.date}
            </Typography>
            {index < payments.length - 1 && <Divider sx={{ mt: 1 }} />}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentPaymentsCard;
