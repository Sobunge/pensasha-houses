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
        sx={{
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          bgcolor: "#FFFFFF",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: "#64748B", fontWeight: 500 }}>
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
      sx={{
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0px 12px 32px rgba(15, 23, 42, 0.08)",
          transform: "translateY(-4px)",
          borderColor: "rgba(212, 175, 55, 0.4)",
        },
      }}
    >
      {/* --- Header --- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          bgcolor: "rgba(212, 175, 55, 0.04)",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "8px",
              bgcolor: "rgba(212, 175, 55, 0.12)",
              color: "#D4AF37",
            }}
          >
            <PersonOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "#0F172A",
              fontSize: "1rem",
              letterSpacing: "-0.2px",
            }}
          >
            Current Tenant
          </Typography>
        </Box>

        <Chip
          label={status}
          size="small"
          sx={{
            fontWeight: 700,
            bgcolor: "rgba(16, 185, 129, 0.1)",
            color: "#10B981",
            fontSize: "0.75rem",
            borderRadius: "6px",
            height: "24px",
          }}
        />
      </Box>

      {/* --- Card Body --- */}
      <CardContent sx={{ p: 3 }}>
        {/* Tenant Details */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 3 }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: "#0F172A",
              color: "#D4AF37",
              fontSize: "1.5rem",
              fontWeight: 800,
              border: "2px solid #D4AF37",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            }}
          >
            {initial}
          </Avatar>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                fontSize: "1.125rem",
                letterSpacing: "-0.2px",
                lineHeight: 1.2,
                mb: 0.5,
              }}
              noWrap
            >
              {name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#64748B",
                fontSize: "0.8125rem",
                fontWeight: 500,
              }}
              noWrap
            >
              {email}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#64748B",
                fontSize: "0.8125rem",
                fontWeight: 500,
              }}
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
                  sx={{
                    color: "#64748B",
                    bgcolor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    "&:hover": {
                      bgcolor: "rgba(212, 175, 55, 0.12)",
                      color: "#0F172A",
                      borderColor: "rgba(212, 175, 55, 0.4)",
                    },
                  }}
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
                  sx={{
                    color: "#64748B",
                    bgcolor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    "&:hover": {
                      bgcolor: "rgba(212, 175, 55, 0.12)",
                      color: "#0F172A",
                      borderColor: "rgba(212, 175, 55, 0.4)",
                    },
                  }}
                >
                  <PhoneOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        <Divider sx={{ borderStyle: "dashed", borderColor: "#E2E8F0", my: 2.5 }} />

        {/* Lease Dates Metadata */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "rgba(15, 23, 42, 0.02)",
                p: 1.5,
                borderRadius: "10px",
                border: "1px solid #F1F5F9",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
                <CalendarTodayOutlinedIcon sx={{ fontSize: 14, color: "#D4AF37" }} />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    color: "#64748B",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Lease Started
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.875rem" }}
              >
                {leaseStart}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "rgba(15, 23, 42, 0.02)",
                p: 1.5,
                borderRadius: "10px",
                border: "1px solid #F1F5F9",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
                <EventOutlinedIcon sx={{ fontSize: 14, color: "#D4AF37" }} />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    color: "#64748B",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Lease Ends
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.875rem" }}
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