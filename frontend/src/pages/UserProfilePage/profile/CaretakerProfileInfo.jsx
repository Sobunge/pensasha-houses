import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export default function CaretakerProfileInfo({ profile }) {
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
        {/* ===== Assigned Property ===== */}
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
              Assigned Property
            </Typography>
            {profile.assignedProperty ? (
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: "text.primary" }}
              >
                {profile.assignedProperty.name || "Property"}
              </Typography>
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: "text.primary" }}
              >
                No property assigned
              </Typography>
            )}
          </Stack>

          {profile.assignedProperty?.location && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={0.5}
              alignItems={{ xs: "flex-start", sm: "center" }}
              mt={1}
            >
              <LocationOnOutlinedIcon
                fontSize="small"
                sx={{ color: "#f50057" }}
              />
              <Typography fontWeight={500} color="text.primary">
                {profile.assignedProperty.location}
              </Typography>
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
