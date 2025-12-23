import React from "react";
import { Card, CardContent, Typography, Button, Box, Chip, CircularProgress } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useTenantRequestsCount } from "../hooks/useTenantRequestsCount";

function MaintenanceCard({ tenantId }) {
  const navigate = useNavigate();
  const { counts, loading, error } = useTenantRequestsCount(tenantId);

  const handleNavigate = () => {
    navigate("/tenant/maintenance-requests");
  };

  if (loading) {
    return (
      <Card sx={cardStyle}>
        <CardContent sx={cardContentStyle}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Loading maintenance requests...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={cardStyle}>
        <CardContent sx={cardContentStyle}>
          <Typography color="error">Failed to load requests</Typography>
        </CardContent>
      </Card>
    );
  }

  const totalOpen = counts.PENDING + counts.IN_PROGRESS;

  return (
    <Card sx={cardStyle}>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 1.5, // spacing between items
        }}
      >
        {/* Title with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BuildIcon sx={{ color: "#f8b500" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#111" }}>
            Maintenance Requests
          </Typography>
        </Box>

        {/* Summary */}
        <Typography variant="body2" sx={{ color: "#555" }}>
          You currently have <strong>{totalOpen}</strong> open request{totalOpen !== 1 && "s"}.
        </Typography>

        {/* Status Chips */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
          <Chip label={`Pending: ${counts.PENDING}`} color="warning" size="small" />
          <Chip label={`In Progress: ${counts.IN_PROGRESS}`} color="info" size="small" />
          <Chip label={`Completed: ${counts.COMPLETED}`} color="success" size="small" />
        </Box>

        {/* View Requests Button */}
        <Button
          variant="contained"
          size="small"
          startIcon={<VisibilityIcon />}
          onClick={handleNavigate}
          sx={buttonStyle}
        >
          View Requests
        </Button>
      </CardContent>

    </Card>
  );
}

// Common styles
const cardStyle = {
  borderRadius: 3,
  boxShadow: 2,
  bgcolor: "#fff",
  width: 400,
  minHeight: 100,
  display: "flex",
  flexDirection: "column",
};

const cardContentStyle = {
  flexGrow: 1,
};

const buttonStyle = {
  bgcolor: "#f8b500",
  color: "#111",
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 2,
  "&:hover": { bgcolor: "#c59000" },
};

export default MaintenanceCard;
