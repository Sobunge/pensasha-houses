import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";

function MaintenanceCard() {
  // Placeholder data (later this can come from your API)
  const openRequests = 2;

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        bgcolor: "#fff",
      }}
    >
      <CardContent>
        {/* Title with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <BuildIcon sx={{ color: "#f8b500" }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#111" }}>
            Maintenance Requests
          </Typography>
        </Box>

        {/* Status Info */}
        <Typography variant="body1" sx={{ color: "#555", mb: 2 }}>
          You currently have <strong>{openRequests}</strong> open request
          {openRequests !== 1 && "s"}.
        </Typography>

        {/* Action Button */}
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
          New Request
        </Button>
      </CardContent>
    </Card>
  );
}

export default MaintenanceCard;
