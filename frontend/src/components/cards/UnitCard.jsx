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

const UnitCard = ({ unit = {} }) => {
  const {
    unitNumber = "Unit N/A",
    status = "Vacant",
    type = "Standard Unit",
    tenant = null,
    rentAmount = null,
  } = unit;

  // Dynamic status configuration leveraging theme palette tokens
  const getStatusConfig = (theme, currentStatus) => {
    const s = currentStatus?.toLowerCase();
    switch (s) {
      case "occupied":
        return {
          color: theme.palette.success?.main || "#10B981",
          bg: `${theme.palette.success?.main || "#10B981"}1A`,
          label: "Occupied",
        };
      case "maintenance":
        return {
          color: theme.palette.error?.main || "#EF4444",
          bg: `${theme.palette.error?.main || "#EF4444"}1A`,
          label: "Maintenance",
        };
      case "vacant":
      default:
        return {
          color: theme.palette.secondary.main,
          bg: `${theme.palette.secondary.main}1F`,
          label: currentStatus || "Vacant",
        };
    }
  };

  const tenantName = typeof tenant === "string" ? tenant : tenant?.name;
  const tenantInitial = tenantName ? tenantName.charAt(0).toUpperCase() : null;

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        height: "100%",
        minWidth: "280px",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: `0px 12px 32px ${theme.palette.primary.main}14`,
          transform: "translateY(-4px)",
          borderColor: `${theme.palette.secondary.main}66`,
        },
      })}
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
                sx={(theme) => ({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  borderRadius: `${theme.shape.borderRadius / 1.5}px`,
                  bgcolor: `${theme.palette.primary.main}0A`,
                  color: theme.palette.primary.main,
                })}
              >
                <MeetingRoomOutlinedIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography
                variant="h6"
                sx={(theme) => ({
                  fontWeight: 800,
                  color: theme.palette.text.primary,
                  letterSpacing: "-0.3px",
                  fontSize: "1.125rem",
                })}
              >
                {unitNumber}
              </Typography>
            </Box>

            {(theme) => {
              const statusStyle = getStatusConfig(theme, status);
              return (
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
              );
            }}
          </Box>

          {/* --- Unit Details & Optional Rent Amount --- */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <KingBedOutlinedIcon sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: 18 })} />
              <Typography
                variant="body2"
                sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500, fontSize: "0.8125rem" })}
              >
                {type}
              </Typography>
            </Box>

            {rentAmount && (
              <Typography
                variant="subtitle2"
                sx={(theme) => ({ fontWeight: 800, color: theme.palette.text.primary, fontSize: "0.875rem" })}
              >
                KES {Number(rentAmount).toLocaleString()}
              </Typography>
            )}
          </Stack>
        </Box>

        <Divider sx={(theme) => ({ borderStyle: "dashed", borderColor: theme.palette.divider, my: 2 })} />

        {/* --- Tenant Footer --- */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={(theme) => ({
              width: 38,
              height: 38,
              fontSize: "0.875rem",
              bgcolor: tenantInitial ? theme.palette.primary.main : theme.palette.action.hover,
              color: tenantInitial ? theme.palette.secondary.main : theme.palette.text.secondary,
              fontWeight: 800,
              border: tenantInitial ? `1.5px solid ${theme.palette.secondary.main}` : `1px solid ${theme.palette.divider}`,
            })}
          >
            {tenantInitial || "?"}
          </Avatar>

          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography
              variant="caption"
              sx={(theme) => ({
                display: "block",
                color: theme.palette.text.secondary,
                fontWeight: 600,
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
                mb: -0.2,
              })}
            >
              Current Tenant
            </Typography>
            <Typography
              variant="body2"
              sx={(theme) => ({
                fontWeight: 700,
                color: tenantName ? theme.palette.text.primary : theme.palette.text.secondary,
                fontSize: "0.84rem",
              })}
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