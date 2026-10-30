// src/components/TenantCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
  Grid,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

const TenantCard = ({ tenant }) => {
  if (!tenant) {
    return (
      <Card
        elevation={0}
        sx={(theme) => ({
          borderRadius: `${theme.shape.borderRadius * 2}px`,
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          p: 4,
          textAlign: "center",
        })}
      >
        <Typography variant="body2" sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}>
          No current tenant assigned.
        </Typography>
      </Card>
    );
  }

  const {
    name = "Unknown Tenant",
    email = "N/A",
    phone = "N/A",
    leaseStart = "N/A",
    leaseEnd = "N/A",
    status = "Active",
  } = tenant;

  const initial = name.charAt(0).toUpperCase();

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: `0px 12px 32px ${theme.palette.primary.main}14`,
          transform: "translateY(-4px)",
          borderColor: `${theme.palette.secondary.main}66`,
        },
      })}
    >
      {/* --- Header --- */}
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          bgcolor: `${theme.palette.secondary.main}0A`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: `${theme.shape.borderRadius}px`,
              bgcolor: `${theme.palette.secondary.main}1F`,
              color: theme.palette.secondary.main,
            })}
          >
            <PersonOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography
            variant="subtitle1"
            sx={(theme) => ({
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontSize: "1rem",
              letterSpacing: "-0.2px",
            })}
          >
            Current Tenant
          </Typography>
        </Box>

        <Chip
          label={status}
          size="small"
          sx={(theme) => ({
            fontWeight: 700,
            bgcolor: `${theme.palette.success?.main || "#10B981"}1A`,
            color: theme.palette.success?.main || "#10B981",
            fontSize: "0.75rem",
            borderRadius: `${theme.shape.borderRadius / 1.5}px`,
            height: "24px",
          })}
        />
      </Box>

      {/* --- Card Body --- */}
      <CardContent sx={{ p: 3 }}>
        {/* Tenant Details */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 3 }}>
          <Avatar
            sx={(theme) => ({
              width: 60,
              height: 60,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
              fontSize: "1.5rem",
              fontWeight: 800,
              border: `2px solid ${theme.palette.secondary.main}`,
              boxShadow: `0 4px 12px ${theme.palette.primary.main}26`,
            })}
          >
            {initial}
          </Avatar>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={(theme) => ({
                fontWeight: 800,
                color: theme.palette.text.primary,
                fontSize: "1.125rem",
                letterSpacing: "-0.2px",
                lineHeight: 1.2,
                mb: 0.5,
              })}
              noWrap
            >
              {name}
            </Typography>

            <Typography
              variant="body2"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                fontSize: "0.8125rem",
                fontWeight: 500,
              })}
              noWrap
            >
              {email}
            </Typography>

            <Typography
              variant="body2"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                fontSize: "0.8125rem",
                fontWeight: 500,
              })}
              noWrap
            >
              {phone}
            </Typography>
          </Box>

          {/* Quick Action Shortcuts */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 0.5 }}>
            {email !== "N/A" && (
              <Tooltip title="Send Email">
                <IconButton
                  component="a"
                  href={`mailto:${email}`}
                  size="small"
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                    bgcolor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    "&:hover": {
                      bgcolor: `${theme.palette.secondary.main}1F`,
                      color: theme.palette.primary.main,
                      borderColor: `${theme.palette.secondary.main}66`,
                    },
                  })}
                >
                  <EmailOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {phone !== "N/A" && (
              <Tooltip title="Call Tenant">
                <IconButton
                  component="a"
                  href={`tel:${phone}`}
                  size="small"
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                    bgcolor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    "&:hover": {
                      bgcolor: `${theme.palette.secondary.main}1F`,
                      color: theme.palette.primary.main,
                      borderColor: `${theme.palette.secondary.main}66`,
                    },
                  })}
                >
                  <PhoneOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        <Divider sx={(theme) => ({ borderStyle: "dashed", borderColor: theme.palette.divider, my: 2.5 })} />

        {/* Lease Dates Metadata */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={(theme) => ({
                bgcolor: `${theme.palette.primary.main}0A`,
                p: 1.5,
                borderRadius: `${theme.shape.borderRadius}px`,
                border: `1px solid ${theme.palette.divider}`,
              })}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
                <CalendarTodayOutlinedIcon sx={(theme) => ({ fontSize: 14, color: theme.palette.secondary.main })} />
                <Typography
                  variant="caption"
                  sx={(theme) => ({
                    fontWeight: 800,
                    color: theme.palette.text.secondary,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  })}
                >
                  Lease Started
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={(theme) => ({ fontWeight: 700, color: theme.palette.text.primary, fontSize: "0.875rem" })}
              >
                {leaseStart}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={(theme) => ({
                bgcolor: `${theme.palette.primary.main}0A`,
                p: 1.5,
                borderRadius: `${theme.shape.borderRadius}px`,
                border: `1px solid ${theme.palette.divider}`,
              })}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
                <EventOutlinedIcon sx={(theme) => ({ fontSize: 14, color: theme.palette.secondary.main })} />
                <Typography
                  variant="caption"
                  sx={(theme) => ({
                    fontWeight: 800,
                    color: theme.palette.text.secondary,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  })}
                >
                  Lease Ends
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={(theme) => ({ fontWeight: 700, color: theme.palette.text.primary, fontSize: "0.875rem" })}
              >
                {leaseEnd}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TenantCard;