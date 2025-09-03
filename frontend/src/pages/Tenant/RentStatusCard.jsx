import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

function RentStatusCard() {
  // later you can pass props like rent status, amount, etc.
  const rentStatus = "Pending"; 
  const amount = "Ksh 12,000";

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        bgcolor: "#fff",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#111" }}>
          Rent Status
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {rentStatus} – {amount}
        </Typography>
        {rentStatus === "Pending" && (
          <Box>
            <Button
              variant="contained"
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
