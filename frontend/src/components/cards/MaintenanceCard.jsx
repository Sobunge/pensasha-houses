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
  Stack,
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
      elevation={0}
      sx={{
        flex: { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: { xs: "100%", sm: "320px" }, // Added minWidth for consistency
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": { 
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)", 
          transform: "translateY(-5px)" 
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: "rgba(248, 181, 0, 0.04)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <BuildIcon sx={{ color: "#f8b500" }} />
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          Maintenance
        </Typography>
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          minHeight: 160,
        }}
      >
        {loading ? (
          <Stack alignItems="center" spacing={1}>
            <CircularProgress size={24} sx={{ color: "#f8b500" }} />
            <Typography variant="body2" color="text.secondary">Fetching status...</Typography>
          </Stack>
        ) : error ? (
          <Typography variant="body2" color="error.main" fontWeight={500}>
            Unable to load requests
          </Typography>
        ) : (
          <Stack spacing={2.5} alignItems="center" width="100%">
            <Box textAlign="center">
              <Typography variant="h3" fontWeight={800} sx={{ color: "#1a1a1a", lineHeight: 1 }}>
                {totalOpen}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mt: 0.5 }}>
                Active Request{totalOpen !== 1 ? "s" : ""}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
              <Chip 
                label={`Pending: ${counts.PENDING}`} 
                size="small" 
                variant="outlined"
                sx={{ 
                  fontWeight: 600, 
                  bgcolor: "background.paper",
                  borderColor: "divider" 
                }} 
              />
              <Chip 
                label={`In Progress: ${counts.IN_PROGRESS}`} 
                size="small" 
                color="info" 
                sx={{ 
                  fontWeight: 600,
                  bgcolor: "#0288d1" // Sharper blue for a cleaner look
                }} 
              />
            </Box>
          </Stack>
        )}
      </CardContent>

      <Divider sx={{ borderStyle: "dashed", opacity: 0.6 }} />

      {/* Footer Aligned Responsively */}
      <Box 
        sx={{ 
          p: 2, 
          display: "flex", 
          justifyContent: { xs: "center", sm: "flex-end" } 
        }}
      >
        <Button
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={() => navigate("/tenant/maintenance-requests")}
          disabled={loading || error}
          sx={{
            bgcolor: "#f8b500",
            color: "#000000",
            textTransform: "none",
            fontWeight: 800,
            fontSize: { xs: "0.8rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: 1.2,
            borderRadius: 2.5,
            width: { xs: "100%", sm: "auto" }, // Full width button on small screens
            boxShadow: "0 4px 12px 0 rgba(248, 181, 0, 0.25)",
            "& .MuiButton-startIcon": {
              color: "#000000",
            },
            "&:hover": { 
              bgcolor: "#eab000", 
              boxShadow: "0 6px 16px rgba(248, 181, 0, 0.4)",
              transform: "translateY(-1px)",
            },
            "&.Mui-disabled": {
              bgcolor: "action.disabledBackground"
            }
          }}
        >
          Manage Requests
        </Button>
      </Box>
    </Card>
  );
}

export default MaintenanceCard;