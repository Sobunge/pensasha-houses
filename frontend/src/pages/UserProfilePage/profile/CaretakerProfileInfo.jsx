import React from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export default function CaretakerProfileInfo({ profile }) {
  const propertyName = profile?.assignedProperty?.name;
  const propertyLocation = profile?.assignedProperty?.location;

  return (
    <Box
      sx={{
        bgcolor: "#F8FAFC",
        borderRadius: "14px",
        p: { xs: 2.5, sm: 3 },
        border: "1px solid #E2E8F0",
      }}
    >
      <Grid container spacing={2.5}>
        {/* ASSIGNED PROPERTY */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              gap: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#D4AF37",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.12)",
              },
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "10px",
                bgcolor: "rgba(212, 175, 55, 0.12)",
                color: "#D4AF37",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <HomeWorkOutlinedIcon fontSize="small" />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#64748B",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  fontSize: "0.68rem",
                  display: "block",
                  mb: 0.3,
                }}
              >
                Assigned Property
              </Typography>

              {propertyName ? (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "#0F172A",
                    wordBreak: "break-word",
                  }}
                >
                  {propertyName}
                </Typography>
              ) : (
                <Chip
                  label="No Property Assigned"
                  size="small"
                  sx={{
                    bgcolor: "rgba(100, 116, 139, 0.1)",
                    color: "#64748B",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    borderRadius: "6px",
                  }}
                />
              )}
            </Box>
          </Box>
        </Grid>

        {/* PROPERTY LOCATION */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              gap: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#D4AF37",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.12)",
              },
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "10px",
                bgcolor: "rgba(212, 175, 55, 0.12)",
                color: "#D4AF37",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <LocationOnOutlinedIcon fontSize="small" />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#64748B",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  fontSize: "0.68rem",
                  display: "block",
                  mb: 0.3,
                }}
              >
                Property Location
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: propertyLocation ? "#0F172A" : "#94A3B8",
                  wordBreak: "break-word",
                }}
              >
                {propertyLocation || "Not specified"}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}