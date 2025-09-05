import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

function RentSummaryCard({ payments }) {
  const totalDue = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const outstanding = totalDue - totalPaid;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 2, bgcolor: "#f8f9fa" }}>
          <CardContent>
            <Typography variant="subtitle2">Total Due</Typography>
            <Typography variant="h6" fontWeight="bold">
              Ksh {totalDue.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 2, bgcolor: "#e6f4ea" }}>
          <CardContent>
            <Typography variant="subtitle2">Total Paid</Typography>
            <Typography variant="h6" fontWeight="bold" color="green">
              Ksh {totalPaid.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 2, bgcolor: "#fff4e6" }}>
          <CardContent>
            <Typography variant="subtitle2">Outstanding</Typography>
            <Typography variant="h6" fontWeight="bold" color="red">
              Ksh {outstanding.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RentSummaryCard;
