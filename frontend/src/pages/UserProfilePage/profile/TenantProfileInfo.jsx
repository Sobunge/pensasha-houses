import React from "react";
import { Box, Typography, Stack, Chip, Divider } from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

export default function TenantProfileInfo({ profile }) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        p: { xs: 2, sm: 3 },
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <Stack spacing={3}>
        {/* ===== Emergency Contact ===== */}
        <Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <PhoneOutlinedIcon fontSize="small" sx={{ color: "#4caf50" }} />
            <Typography
              variant="subtitle2"
              sx={{
                minWidth: { sm: 150 },
                color: "text.secondary",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              Emergency Contact
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "text.primary" }}
            >
              {profile.emergencyContact || "-s"}
            </Typography>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "divider" }} />

        {/* ===== Active Leases ===== */}
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <HomeWorkOutlinedIcon sx={{ color: "#1976d2" }} />
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              Active Leases
            </Typography>
          </Stack>

          {profile.leases && profile.leases.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {profile.leases.map((lease) => (
                <Chip
                  key={lease.id}
                  icon={<HomeWorkOutlinedIcon />}
                  label={lease.propertyName ?? "Property"}
                  variant="outlined"
                  color="primary"
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          ) : (
            <Typography fontWeight={500} color="text.primary">
              No active leases
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
