// src/components/Profile/TenantProfileInfo.jsx
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
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        p: { xs: 2.5, sm: 3 },
        border: "1px solid #E2E8F0",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Stack spacing={3}>
        {/* ===== Emergency Contact ===== */}
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                bgcolor: "rgba(212, 175, 55, 0.12)",
                color: "#D4AF37",
                width: 44,
                height: 44,
                border: "1px solid rgba(212, 175, 55, 0.3)",
              }}
            >
              <PhoneOutlinedIcon fontSize="small" />
            </Avatar>

            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "#64748B",
                  fontWeight: 700,
                  letterSpacing: 0.8,
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                }}
              >
                EMERGENCY CONTACT
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  color: "#0F172A",
                  fontSize: "0.95rem",
                  mt: 0.2,
                }}
              >
                {profile?.emergencyContact || "Not provided"}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "#E2E8F0" }} />

        {/* ===== Active Leases ===== */}
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Avatar
              sx={{
                bgcolor: "rgba(15, 23, 42, 0.06)",
                color: "#0F172A",
                width: 44,
                height: 44,
                border: "1px solid #E2E8F0",
              }}
            >
              <HomeWorkOutlinedIcon fontSize="small" />
            </Avatar>

            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "#64748B",
                  fontWeight: 700,
                  letterSpacing: 0.8,
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                }}
              >
                ACTIVE LEASES
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#64748B", fontSize: "0.825rem", mt: 0.2 }}
              >
                Properties currently occupied
              </Typography>
            </Box>
          </Stack>

          {profile?.leases && profile.leases.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
              {profile.leases.map((lease) => (
                <Chip
                  key={lease.id}
                  icon={<HomeWorkOutlinedIcon sx={{ color: "#D4AF37 !important", fontSize: "18px" }} />}
                  label={lease.propertyName ?? "Property"}
                  sx={{
                    mb: 1,
                    py: 2.2,
                    px: 0.5,
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    bgcolor: "#0F172A",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.12)",
                    "&:hover": {
                      bgcolor: "#1E293B",
                    },
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Box
              sx={{
                py: 2.5,
                px: 2,
                borderRadius: "10px",
                bgcolor: "#F8FAFC",
                border: "1px dashed rgba(212, 175, 55, 0.4)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#64748B",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
              >
                This tenant has no active leases
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
}