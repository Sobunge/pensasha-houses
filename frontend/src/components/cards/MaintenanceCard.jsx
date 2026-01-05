import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  CircularProgress,
  Chip,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useTenantRequestsCount } from "../hooks/useTenantRequestsCount";

function MaintenanceCard({ tenantId }) {
  const navigate = useNavigate();
  const { counts, loading, error } = useTenantRequestsCount(tenantId);

  const totalOpen = counts ? counts.PENDING + counts.IN_PROGRESS : 0;

  return (
    <Card
      elevation={2}
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%", lg: "auto" },
        minWidth: 400,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: { xs: 1.5, sm: 2 },
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <BuildIcon color="warning" />
        <Typography variant="subtitle1" fontWeight={600}>
          Maintenance Requests
        </Typography>
      </Box>

      {/* Card Content */}
      <CardContent
        sx={{
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          flexGrow: 1,
        }}
      >
        {loading ? (
          <Box
            sx={{
              minHeight: 64,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">
              Loading maintenance requests…
            </Typography>
          </Box>
        ) : error ? (
          <Typography
            variant="body2"
            color="error.main"
            sx={{ textAlign: "center" }}
          >
            Failed to load requests
          </Typography>
        ) : (
          <>
            {/* Summary */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              You currently have{" "}
              <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
                {totalOpen}
              </Box>{" "}
              open request{totalOpen !== 1 && "s"}.
            </Typography>

            {/* Status Chips */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Chip label={`Pending: ${counts.PENDING}`} color="warning" size="small" />
              <Chip label={`In Progress: ${counts.IN_PROGRESS}`} color="info" size="small" />
              <Chip label={`Completed: ${counts.COMPLETED}`} color="success" size="small" />
            </Box>
          </>
        )}
      </CardContent>

      {/* Footer */}
      <Divider />
      <Box
        sx={{
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
      >
        <Button
          variant="contained"
          size="small"
          startIcon={<VisibilityIcon />}
          onClick={() => navigate("/tenant/maintenance-requests")}
          disabled={loading || error}
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          View Requests
        </Button>
      </Box>
    </Card>
  );
}

export default MaintenanceCard;
