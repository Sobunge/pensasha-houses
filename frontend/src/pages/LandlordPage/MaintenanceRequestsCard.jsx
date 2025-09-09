// src/components/cards/MaintenanceRequestsCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box, Chip, Divider } from "@mui/material";

const requests = [
  { issue: "Leaking pipe in A-203", status: "In Progress" },
  { issue: "Broken gate lock (Pensasha Towers)", status: "Open" },
  { issue: "Lighting issue in C-405", status: "Completed" },
];

function MaintenanceRequestsCard() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#111" }}>
          Maintenance Requests
        </Typography>
        {requests.map((req, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {req.issue}
            </Typography>
            <Chip
              label={req.status}
              color={
                req.status === "Completed"
                  ? "success"
                  : req.status === "In Progress"
                  ? "warning"
                  : "error"
              }
              size="small"
              sx={{ mt: 1 }}
            />
            {index < requests.length - 1 && <Divider sx={{ mt: 1 }} />}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default MaintenanceRequestsCard;
