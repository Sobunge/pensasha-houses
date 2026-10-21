// src/components/Profile/CaretakerProfileInfo.jsx
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
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        p: { xs: 1.5, sm: 2 },
        border: "1px solid rgba(226, 232, 240, 0.8)",
        boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.05)",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
      }}
    >
      <Grid container spacing={1.5}>
        {/* ASSIGNED PROPERTY */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: "12px",
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                borderColor: "rgba(212, 175, 55, 0.5)",
                boxShadow: "0 8px 20px rgba(212, 175, 55, 0.12)",
                transform: "translateY(-1px)",
                "& .icon-box": {
                  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                  color: "#D4AF37",
                  transform: "scale(1.05)",
                },
              },
            }}
          >
            <Box
              className="icon-box"
              sx={{
                width: 38,
                height: 38,
                borderRadius: "8px",
                bgcolor: "rgba(212, 175, 55, 0.1)",
                color: "#B48A1D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.25s ease",
              }}
            >
              <HomeWorkOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#475569",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                  fontSize: "0.725rem",
                  display: "block",
                  lineHeight: 1.2,
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
                    fontSize: "0.875rem",
                    wordBreak: "break-word",
                    lineHeight: 1.3,
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
              p: 1.5,
              borderRadius: "12px",
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                borderColor: "rgba(212, 175, 55, 0.5)",
                boxShadow: "0 8px 20px rgba(212, 175, 55, 0.12)",
                transform: "translateY(-1px)",
                "& .icon-box": {
                  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                  color: "#D4AF37",
                  transform: "scale(1.05)",
                },
              },
            }}
          >
            <Box
              className="icon-box"
              sx={{
                width: 38,
                height: 38,
                borderRadius: "8px",
                bgcolor: "rgba(212, 175, 55, 0.1)",
                color: "#B48A1D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.25s ease",
              }}
            >
              <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#475569",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                  fontSize: "0.725rem",
                  display: "block",
                  lineHeight: 1.2,
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
                  fontSize: "0.875rem",
                  wordBreak: "break-word",
                  lineHeight: 1.3,
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