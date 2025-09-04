import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Icon for button
import { useNavigate } from "react-router-dom";

function MaintenanceCard() {
  const navigate = useNavigate();
  const openRequests = 2;

  const handleNavigate = () => {
    navigate("/tenant/maintenance-requests");
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
        {/* Title Section with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <BuildIcon sx={{ color: "#f8b500" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#111" }}>
            Maintenance Requests
          </Typography>
        </Box>

        {/* Status Information */}
        <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
          You currently have <strong>{openRequests}</strong> open request
          {openRequests !== 1 && "s"}.
        </Typography>

        {/* Action Button */}
        <Button
          variant="contained"
          size="small"
          startIcon={<VisibilityIcon />} // Added icon
          onClick={handleNavigate}
          sx={{
            bgcolor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            "&:hover": { bgcolor: "#c59000" },
          }}
        >
          View Requests
        </Button>
      </CardContent>
    </Card>
  );
}

export default MaintenanceCard;
