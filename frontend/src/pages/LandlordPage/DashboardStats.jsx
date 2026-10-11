// src/components/cards/DashboardStats.jsx
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  useTheme,
  alpha,
} from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const stats = [
  {
    id: "occupancy",
    label: "Occupancy Rate",
    value: "85%",
    subtext: "85% Occupied – 10 of 12 units",
    progress: 85,
    icon: <PeopleOutlinedIcon fontSize="small" />,
    colorKey: "success",
  },
  {
    id: "units",
    label: "Total Units",
    value: "40 Units",
    icon: <ApartmentOutlinedIcon fontSize="small" />,
    colorKey: "primary",
  },
  {
    id: "properties",
    label: "Property Count",
    value: "3 Properties",
    icon: <HomeWorkOutlinedIcon fontSize="small" />,
    colorKey: "primary",
  },
  {
    id: "pending_rent",
    label: "Pending Rent",
    value: "Ksh 20,000",
    subtext: "Overdue",
    icon: <WarningAmberOutlinedIcon fontSize="small" />,
    colorKey: "error",
  },
];

function DashboardStats() {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => {
        const isError = stat.colorKey === "error";
        const isSuccess = stat.colorKey === "success";

        const iconBg = isError
          ? alpha(theme.palette.error.main, 0.1)
          : isSuccess
          ? alpha(theme.palette.success.main, 0.1)
          : "#F1F5F9";

        const iconColor = isError
          ? theme.palette.error.main
          : isSuccess
          ? theme.palette.success.main
          : theme.palette.primary.main;

        return (
          <Grid item xs={12} sm={6} md={3} key={stat.id}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "16px",
                bgcolor: "#FFFFFF",
                height: "100%",
                width: "100%",

                // 🌟 Step 1: Back to light gray, thin border
                border: "1px solid",
                borderColor: "divider", // #4e4e4e (Subtle)

                // 🌟 Step 2: Very pronounced multi-layered shadow (deep Obsidian tint)
                boxShadow:
                  "0 15px 35px -5px rgba(15, 23, 42, 0.12), 0 10px 15px -8px rgba(15, 23, 42, 0.06)",

                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-5px)", // Smooth lift

                  // Highlight border on hover only
                  borderColor: isError
                    ? theme.palette.error.main
                    : "secondary.main", // Gold light frame on hover

                  // 🌟 Stronger depth on hover
                  boxShadow:
                    "0 25px 40px -10px rgba(15, 23, 42, 0.18), 0 12px 18px -6px rgba(15, 23, 42, 0.1)",
                },
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  "&:last-child": { pb: { xs: 2.5, sm: 3 } },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {/* OCCUPANCY CARD WITH PROGRESS BAR */}
                {stat.id === "occupancy" ? (
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        fontSize: "0.78rem",
                      }}
                    >
                      {stat.label}
                    </Typography>

                    <Box sx={{ my: 1.5 }}>
                      <LinearProgress
                        variant="determinate"
                        value={stat.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: "#E2E8F0",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "#10B981",
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: "primary.main",
                        fontSize: "0.85rem",
                      }}
                    >
                      {stat.subtext}
                    </Typography>
                  </Box>
                ) : (
                  /* STANDARD METRIC CARDS */
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 50,
                        height: 50,
                        borderRadius: "14px",
                        bgcolor: iconBg,
                        color: iconColor,
                        flexShrink: 0,
                      }}
                    >
                      {stat.icon}
                    </Box>

                    <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          fontWeight: 600,
                          fontSize: "0.78rem",
                          display: "block",
                          lineHeight: 1.2,
                        }}
                      >
                        {stat.label}
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: "primary.main",
                          fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          lineHeight: 1.2,
                          mt: 0.4,
                        }}
                      >
                        {stat.value}
                      </Typography>

                      {stat.subtext && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "error.main",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            display: "block",
                            mt: 0.3,
                          }}
                        >
                          {stat.subtext}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default DashboardStats;