// src/components/Profile/TenantProfileInfo.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Stack,
} from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

export default function TenantProfileInfo({ profile }) {
  const leases = profile?.leases || [];

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
        {/* EMERGENCY CONTACT */}
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
              height: "100%",
              boxSizing: "border-box",
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
            {/* Premium Icon Container */}
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
              <PhoneOutlinedIcon sx={{ fontSize: 18 }} />
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
                Emergency Contact
              </Typography>
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
                {profile?.emergencyContact || "Not provided"}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* ACTIVE LEASES */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={(theme) => ({
              p: 1.5,
              borderRadius: `${theme.shape.borderRadius * 1.5}px`,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              height: "100%",
              boxSizing: "border-box",
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
            {/* Premium Icon Container */}
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
                  mb: 0.8,
                })}
              >
                Active Leases ({leases.length})
              </Typography>

              {leases.length > 0 ? (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                  {leases.map((lease) => (
                    <Chip
                      key={lease.id}
                      icon={
                        <HomeWorkOutlinedIcon
                          sx={(theme) => ({
                            fontSize: "0.875rem !important",
                            color: `${theme.palette.secondary.main} !important`,
                          })}
                        />
                      }
                      label={lease.propertyName ?? "Property"}
                      size="small"
                      sx={(theme) => ({
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        borderRadius: `${theme.shape.borderRadius}px`,
                        border: `1px solid ${theme.palette.secondary.main}66`,
                      })}
                    />
                  ))}
                </Stack>
              ) : (
                <Chip
                  label="No Active Leases"
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
      </Grid>
    </Box>
  );
}