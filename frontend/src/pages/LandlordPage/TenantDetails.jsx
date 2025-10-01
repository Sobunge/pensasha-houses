import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Dummy tenants (replace with API)
const dummyTenants = Array.from({ length: 120 }).map((_, i) => ({
  id: String(i + 1),
  name: `Tenant ${i + 1}`,
  property: i % 2 === 0 ? "Greenwood Apartments" : "Lakeview Villas",
  email: `tenant${i + 1}@example.com`,
  phone: `+2547${Math.floor(10000000 + Math.random() * 8999999)}`,
  status: i % 3 === 0 ? "Pending" : "Active",
  leaseStart: "2024-01-01",
  leaseEnd: "2025-01-01",
  balance: i % 2 === 0 ? 0 : 2500,
}));

const TenantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tenant = dummyTenants.find((t) => t.id === id);

  if (!tenant) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Tenant not found</Typography>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to Tenants
      </Button>

      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar sx={{ bgcolor: "#f8b500", width: 72, height: 72 }}>
            <PersonIcon fontSize="large" sx={{ color: "#111" }} />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {tenant.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tenant.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tenant.phone}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Property
            </Typography>
            <Typography variant="body1">{tenant.property}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Status
            </Typography>
            <Typography
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                bgcolor:
                  tenant.status === "Active"
                    ? "success.light"
                    : "warning.light",
                color:
                  tenant.status === "Active"
                    ? "success.dark"
                    : "warning.dark",
                display: "inline-block",
                fontWeight: 600,
              }}
            >
              {tenant.status}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Lease Period
            </Typography>
            <Typography variant="body1">
              {tenant.leaseStart} → {tenant.leaseEnd}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Balance
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: tenant.balance === 0 ? "success.main" : "error.main" }}
            >
              {tenant.balance === 0 ? "No Balance" : `Ksh ${tenant.balance}`}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default TenantDetails;
