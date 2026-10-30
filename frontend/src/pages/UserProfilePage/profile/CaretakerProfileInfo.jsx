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
      sx={(theme) => ({
        bgcolor: theme.palette.background.paper,
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        p: { xs: 1.5, sm: 2 },
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: `0 10px 30px -10px ${theme.palette.primary.main}14`,
        background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
      })}
    >
      <Grid container spacing={1.5}>
        {/* ASSIGNED PROPERTY */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={(theme) => ({
              p: 1.5,
              borderRadius: `${theme.shape.borderRadius * 1.5}px`,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                borderColor: `${theme.palette.secondary.main}80`,
                boxShadow: `0 8px 20px ${theme.palette.secondary.main}20`,
                transform: "translateY(-1px)",
                "& .icon-box": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1E293B 100%)`,
                  color: theme.palette.secondary.main,
                  transform: "scale(1.05)",
                },
              },
            })}
          >
            <Box
              className="icon-box"
              sx={(theme) => ({
                width: 38,
                height: 38,
                borderRadius: `${theme.shape.borderRadius}px`,
                bgcolor: `${theme.palette.secondary.main}1A`,
                color: theme.palette.secondary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.25s ease",
              })}
            >
              <HomeWorkOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="caption"
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                  fontSize: "0.725rem",
                  display: "block",
                  lineHeight: 1.2,
                  mb: 0.3,
                })}
              >
                Assigned Property
              </Typography>

              {propertyName ? (
                <Typography
                  variant="body2"
                  sx={(theme) => ({
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    fontSize: "0.875rem",
                    wordBreak: "break-word",
                    lineHeight: 1.3,
                  })}
                >
                  {propertyName}
                </Typography>
              ) : (
                <Chip
                  label="No Property Assigned"
                  size="small"
                  sx={(theme) => ({
                    bgcolor: `${theme.palette.text.secondary}1A`,
                    color: theme.palette.text.secondary,
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    borderRadius: `${theme.shape.borderRadius * 0.75}px`,
                  })}
                />
              )}
            </Box>
          </Box>
        </Grid>

        {/* PROPERTY LOCATION */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={(theme) => ({
              p: 1.5,
              borderRadius: `${theme.shape.borderRadius * 1.5}px`,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                borderColor: `${theme.palette.secondary.main}80`,
                boxShadow: `0 8px 20px ${theme.palette.secondary.main}20`,
                transform: "translateY(-1px)",
                "& .icon-box": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1E293B 100%)`,
                  color: theme.palette.secondary.main,
                  transform: "scale(1.05)",
                },
              },
            })}
          >
            <Box
              className="icon-box"
              sx={(theme) => ({
                width: 38,
                height: 38,
                borderRadius: `${theme.shape.borderRadius}px`,
                bgcolor: `${theme.palette.secondary.main}1A`,
                color: theme.palette.secondary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.25s ease",
              })}
            >
              <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="caption"
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                  fontSize: "0.725rem",
                  display: "block",
                  lineHeight: 1.2,
                  mb: 0.3,
                })}
              >
                Property Location
              </Typography>
              <Typography
                variant="body2"
                sx={(theme) => ({
                  fontWeight: 700,
                  color: propertyLocation ? theme.palette.primary.main : theme.palette.text.disabled,
                  fontSize: "0.875rem",
                  wordBreak: "break-word",
                  lineHeight: 1.3,
                })}
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