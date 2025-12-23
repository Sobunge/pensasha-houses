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
      <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#fff", minWidth: 250, textAlign: "center" }}>
        <CardContent>
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
      <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#fff", minWidth: 250, textAlign: "center" }}>
        <CardContent>
          <Typography color="error">Failed to load requests</Typography>
        </CardContent>
      </Card>
    );
  }

  const totalOpen = counts.PENDING + counts.IN_PROGRESS;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#fff", minWidth: 250 }}>
      <CardContent>
        {/* Title with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <BuildIcon sx={{ color: "#f8b500" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#111" }}>
            Maintenance Requests
          </Typography>
        </Box>

        {/* Status Summary */}
        <Typography variant="body2" sx={{ color: "#555", mb: 1 }}>
          You currently have <strong>{totalOpen}</strong> open request{totalOpen !== 1 && "s"}.
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          <Chip label={`Pending: ${counts.PENDING}`} color="warning" size="small" />
          <Chip label={`In Progress: ${counts.IN_PROGRESS}`} color="info" size="small" />
          <Chip label={`Completed: ${counts.COMPLETED}`} color="success" size="small" />
        </Box>

        {/* Action Button */}
        <Button
          variant="contained"
          size="small"
          startIcon={<VisibilityIcon />}
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
