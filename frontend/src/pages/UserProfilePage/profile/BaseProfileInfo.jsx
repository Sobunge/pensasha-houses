import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

export default function BaseProfileInfo({ profile }) {
  // Combine names into a single field
  const fullName = [profile?.firstName, profile?.middleName, profile?.lastName]
    .filter(Boolean)
    .join(" ") || "-";

  const infoData = [
    {
      label: "Name",
      value: fullName,
      icon: <PermIdentityIcon fontSize="small" sx={{ color: "#1976d2" }} />,
    },
    {
      label: "ID Number",
      value: profile?.idNumber || "-",
      icon: <BadgeIcon fontSize="small" sx={{ color: "#f8b500" }} />,
    },
    {
      label: "Phone Number",
      value: profile?.phoneNumber || "-",
      icon: <PhoneIcon fontSize="small" sx={{ color: "#4caf50" }} />,
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        p: { xs: 2, sm: 3 }, // responsive padding
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <Stack spacing={2}>
        {infoData.map((item, index) => (
          <Box key={item.label}>
            <Stack
              direction={{ xs: "column", sm: "row" }} // vertical on mobile, horizontal on desktop
              spacing={1.5}
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              {item.icon}
              <Typography
                variant="subtitle2"
                sx={{
                  minWidth: { sm: 120 }, // only fixed on desktop
                  color: "text.secondary",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                {item.label}
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: "text.primary" }}
              >
                {item.value}
              </Typography>
            </Stack>
            {index < infoData.length - 1 && (
              <Divider sx={{ my: 1.5, borderColor: "divider" }} />
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
