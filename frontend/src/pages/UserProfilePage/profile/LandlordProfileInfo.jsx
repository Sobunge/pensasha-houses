import React from "react";
import { Box, Typography, Stack, Chip, Divider } from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

export default function LandlordProfileInfo({ profile }) {
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
        {/* ===== Properties Owned ===== */}
        <Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems={{ xs: "flex-start", sm: "center" }}
            mb={1}
          >
            <HomeWorkOutlinedIcon sx={{ color: "#1976d2" }} />
            <Typography
              variant="subtitle2"
              sx={{
                minWidth: { sm: 150 },
                color: "text.secondary",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              Properties Owned
            </Typography>
          </Stack>

          {profile.properties && profile.properties.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {profile.properties.map((property) => (
                <Chip
                  key={property.id}
                  icon={<HomeWorkOutlinedIcon />}
                  label={property.name || "Property"}
                  variant="outlined"
                  color="primary"
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          ) : (
            <Typography fontWeight={500} color="text.primary">
              No properties registered
            </Typography>
          )}
        </Box>

        <Divider sx={{ borderColor: "divider" }} />

        {/* ===== Bank Details ===== */}
        <Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems={{ xs: "flex-start", sm: "center" }}
            mb={1}
          >
            <AccountBalanceOutlinedIcon sx={{ color: "#f8b500" }} />
            <Typography
              variant="subtitle2"
              sx={{
                minWidth: { sm: 150 },
                color: "text.secondary",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              Bank Details
            </Typography>
            {profile.bankDetails ? (
              <Typography fontWeight={500} color="text.primary">
                {profile.bankDetails.bankName || "-"} — {profile.bankDetails.accountName || "-"}
              </Typography>
            ) : (
              <Typography fontWeight={500} color="text.primary">
                No bank details provided
              </Typography>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
