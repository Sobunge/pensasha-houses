import React from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Divider,
  Avatar,
} from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

export default function TenantProfileInfo({ profile }) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        p: { xs: 2.5, sm: 3 },
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Stack spacing={3}>
        {/* ===== Emergency Contact ===== */}
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                bgcolor: "rgba(76, 175, 80, 0.12)",
                color: "#4caf50",
                width: 40,
                height: 40,
              }}
            >
              <PhoneOutlinedIcon fontSize="small" />
            </Avatar>

            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  letterSpacing: 0.6,
                }}
              >
                EMERGENCY CONTACT
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                {profile.emergencyContact || "Not provided"}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Divider />

        {/* ===== Active Leases ===== */}
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" mb={1.5}>
            <Avatar
              sx={{
                bgcolor: "rgba(25, 118, 210, 0.12)",
                color: "#1976d2",
                width: 40,
                height: 40,
              }}
            >
              <HomeWorkOutlinedIcon fontSize="small" />
            </Avatar>

            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  letterSpacing: 0.6,
                }}
              >
                ACTIVE LEASES
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Properties currently occupied
              </Typography>
            </Box>
          </Stack>

          {profile.leases && profile.leases.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {profile.leases.map((lease) => (
                <Chip
                  key={lease.id}
                  icon={<HomeWorkOutlinedIcon />}
                  label={lease.propertyName ?? "Property"}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    fontWeight: 600,
                    bgcolor: "rgba(25,118,210,0.08)",
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              This tenant has no active leases
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
