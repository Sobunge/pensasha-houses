import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function PropertyInfoCard() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#fff" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#111" }}>
          My Property
        </Typography>
        <Typography variant="body2" sx={{ color: "#555" }}>
          Apartment: Sunrise Apartments
        </Typography>
        <Typography variant="body2" sx={{ color: "#555" }}>
          Unit: A-203
        </Typography>
        <Typography variant="body2" sx={{ color: "#555" }}>
          Lease: Jan 2024 – Dec 2024
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PropertyInfoCard;
