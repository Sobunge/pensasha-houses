// src/components/UnitCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
  Stack,
} from "@mui/material";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";

const STATUS_CONFIG = {
  occupied: { color: "#10B981", bg: "rgba(16, 185, 129, 0.1)", label: "Occupied" },
  vacant: { color: "#D4AF37", bg: "rgba(212, 175, 55, 0.12)", label: "Vacant" },
  maintenance: { color: "#EF4444", bg: "rgba(239, 68, 68, 0.1)", label: "Maintenance" },
};

const getStatusConfig = (status) => {
  const s = status?.toLowerCase();
  return STATUS_CONFIG[s] || { color: "#64748B", bg: "rgba(100, 116, 139, 0.1)", label: status || "Unknown" };
};

const UnitCard = ({ unit = {} }) => {
  const {
    unitNumber = "Unit N/A",
    status = "Vacant",
    type = "Standard Unit",
    tenant = null,
    rentAmount = null,
  } = unit;

  const statusStyle = getStatusConfig(status);
  const tenantName = typeof tenant === "string" ? tenant : tenant?.name;
  const tenantInitial = tenantName ? tenantName.charAt(0).toUpperCase() : null;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        height: "100%",
        minWidth: "280px",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0px 12px 32px rgba(15, 23, 42, 0.08)",
          transform: "translateY(-4px)",
          borderColor: "rgba(212, 175, 55, 0.4)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {/* --- Header: Unit Number & Status Badge --- */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  borderRadius: "6px",
                  bgcolor: "rgba(15, 23, 42, 0.04)",
                  color: "#0F172A",
                }}
              >
                <MeetingRoomOutlinedIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "#0F172A",
                  letterSpacing: "-0.3px",
                  fontSize: "1.125rem",
                }}
              >
                {unitNumber}
              </Typography>
            </Box>

            <Chip
              label={statusStyle.label}
              size="small"
              sx={{
                bgcolor: statusStyle.bg,
                color: statusStyle.color,
                fontWeight: 700,
                borderRadius: "6px",
                fontSize: "0.75rem",
                height: "24px",
                px: 0.5,
              }}
            />
          </Box>

          {/* --- Unit Details & Optional Rent Amount --- */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <KingBedOutlinedIcon sx={{ color: "#94A3B8", fontSize: 18 }} />
              <Typography
                variant="body2"
                sx={{ color: "#64748B", fontWeight: 500, fontSize: "0.8125rem" }}
              >
                {type}
              </Typography>
            </Box>

            {rentAmount && (
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 800, color: "#0F172A", fontSize: "0.875rem" }}
              >
                KES {Number(rentAmount).toLocaleString()}
              </Typography>
            )}
          </Stack>
        </Box>

        <Divider sx={{ borderStyle: "dashed", borderColor: "#E2E8F0", my: 2 }} />

        {/* --- Tenant Footer --- */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: 38,
              height: 38,
              fontSize: "0.875rem",
              bgcolor: tenantInitial ? "#0F172A" : "#F1F5F9",
              color: tenantInitial ? "#D4AF37" : "#94A3B8",
              fontWeight: 800,
              border: tenantInitial ? "1.5px solid #D4AF37" : "1px solid #E2E8F0",
            }}
          >
            {tenantInitial || "?"}
          </Avatar>

          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "#64748B",
                fontWeight: 600,
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
                mb: -0.2,
              }}
            >
              Current Tenant
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: tenantName ? "#0F172A" : "#94A3B8",
                fontSize: "0.84rem",
              }}
              noWrap
            >
              {tenantName || "Available for Lease"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UnitCard;