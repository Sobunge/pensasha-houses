// src/components/cards/DashboardStats.jsx

import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Skeleton,
  Alert,
  useTheme,
  alpha,
} from "@mui/material";

import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

import { useLandlordStats } from "../../hooks/useLandlordStats";

function DashboardStats({ userId }) {
  const theme = useTheme();
  const { data, isLoading, isError, error } = useLandlordStats(userId);

  // Loading skeleton state
  if (isLoading) {
    return (
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 2.5, lg: 3 }}>
        {[1, 2, 3, 4].map((item) => (
          <Grid key={item} size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
            <Skeleton
              variant="rounded"
              width="100%"
              height={160}
              sx={{ borderRadius: { xs: 2.5, md: 3 } }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  // Error boundary state
  if (isError) {
    return (
      <Alert severity="error" sx={{ width: "100%", borderRadius: 2 }}>
        {error?.message || "Failed to load dashboard statistics."}
      </Alert>
    );
  }

  // Extract metrics returned from GET /api/landlords/{userId}/stats
  const occupancyRate = data?.occupancyRate ?? 0;
  const occupiedUnits = data?.occupiedUnits ?? 0;
  const totalOccupancyUnits = data?.totalOccupancyUnits ?? 0;
  const totalUnits = data?.totalUnits ?? 0;
  const propertyCount = data?.propertyCount ?? 0;
  const pendingRentAmount = data?.pendingRent ?? 0;

  const formattedPendingRent = `KSh ${Number(pendingRentAmount).toLocaleString()}`;

  const stats = [
    {
      id: "occupancy",
      label: "Occupancy Rate",
      value: `${occupancyRate}%`,
      subtext: `${occupiedUnits} of ${totalOccupancyUnits} units occupied`,
      progress: occupancyRate,
      icon: <PeopleOutlinedIcon />,
      colorKey: "success",
    },
    {
      id: "units",
      label: "Total Units",
      value: String(totalUnits),
      subtext: "Units",
      icon: <ApartmentOutlinedIcon />,
      colorKey: "primary",
    },
    {
      id: "properties",
      label: "Property Count",
      value: String(propertyCount),
      subtext: "Properties",
      icon: <HomeWorkOutlinedIcon />,
      colorKey: "primary",
    },
    {
      id: "pending_rent",
      label: "Pending Rent",
      value: formattedPendingRent,
      subtext: "Overdue",
      icon: <WarningAmberOutlinedIcon />,
      colorKey: "error",
    },
  ];

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2.5, md: 2.5, lg: 3 }}
      alignItems="stretch"
    >
      {stats.map((stat) => {
        const isErrorStat = stat.colorKey === "error";
        const isSuccessStat = stat.colorKey === "success";

        const iconBg = isErrorStat
          ? alpha(theme.palette.error.main, 0.1)
          : isSuccessStat
            ? alpha(theme.palette.success.main, 0.1)
            : "#F1F5F9";

        const iconColor = isErrorStat
          ? theme.palette.error.main
          : isSuccessStat
            ? theme.palette.success.main
            : theme.palette.primary.main;

        return (
          <Grid
            key={stat.id}
            size={{ xs: 12, sm: 6, md: 6, lg: 3 }}
            sx={{
              display: "flex",
              minWidth: 0,
            }}
          >
            <Card
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                minWidth: 0,
                minHeight: { xs: 140, sm: 150, md: 155, lg: 165 },
                borderRadius: { xs: 2.5, md: 3 },
                bgcolor: "#FFFFFF",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                transition:
                  "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

                "&:hover": {
                  transform: {
                    xs: "none",
                    md: "translateY(-4px)",
                  },
                  borderColor: isErrorStat
                    ? theme.palette.error.main
                    : "secondary.main",
                  boxShadow: "0 12px 28px rgba(15, 23, 42, 0.10)",
                },

                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                  "&:hover": {
                    transform: "none",
                  },
                },
              }}
            >
              <CardContent
                sx={{
                  p: {
                    xs: 2,
                    sm: 2,
                    md: 2.25,
                    lg: 2.5,
                  },
                  "&:last-child": {
                    pb: {
                      xs: 2,
                      sm: 2,
                      md: 2.25,
                      lg: 2.5,
                    },
                  },
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  justifyContent: "center",
                  minWidth: 0,
                }}
              >
                {/* Occupancy card */}
                {stat.id === "occupancy" ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      flexGrow: 1,
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                        mb: 1.5,
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          fontWeight: 600,
                          fontSize: {
                            xs: "0.72rem",
                            sm: "0.75rem",
                            md: "0.78rem",
                          },
                          minWidth: 0,
                        }}
                      >
                        {stat.label}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 34,
                          height: 34,
                          flexShrink: 0,
                          borderRadius: "10px",
                          bgcolor: iconBg,
                          color: iconColor,
                        }}
                      >
                        {React.cloneElement(stat.icon, {
                          fontSize: "small",
                        })}
                      </Box>
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: "primary.main",
                        fontSize: {
                          xs: "1.4rem",
                          sm: "1.5rem",
                          md: "1.6rem",
                          lg: "1.65rem",
                        },
                        lineHeight: 1.2,
                        mb: 1.25,
                      }}
                    >
                      {stat.value}
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={stat.progress}
                      aria-label={`Occupancy rate ${stat.progress}%`}
                      sx={{
                        height: 6,
                        borderRadius: 4,
                        bgcolor: "#E2E8F0",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: "#10B981",
                          borderRadius: 4,
                        },
                      }}
                    />

                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 500,
                        fontSize: {
                          xs: "0.68rem",
                          sm: "0.72rem",
                          md: "0.75rem",
                        },
                        mt: 1,
                      }}
                    >
                      {stat.subtext}
                    </Typography>
                  </Box>
                ) : (
                  /* Standard statistic cards */
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: {
                        xs: 1.5,
                        sm: 1.5,
                        md: 1.75,
                        lg: 2,
                      },
                      flexGrow: 1,
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: {
                          xs: 40,
                          sm: 42,
                          md: 44,
                          lg: 48,
                        },
                        height: {
                          xs: 40,
                          sm: 42,
                          md: 44,
                          lg: 48,
                        },
                        borderRadius: {
                          xs: "11px",
                          md: "12px",
                          lg: "14px",
                        },
                        bgcolor: iconBg,
                        color: iconColor,
                        flexShrink: 0,
                      }}
                    >
                      {React.cloneElement(stat.icon, {
                        fontSize: "small",
                      })}
                    </Box>

                    <Box
                      sx={{
                        minWidth: 0,
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          color: "text.secondary",
                          fontWeight: 600,
                          fontSize: {
                            xs: "0.7rem",
                            sm: "0.72rem",
                            md: "0.75rem",
                            lg: "0.78rem",
                          },
                          lineHeight: 1.3,
                          mb: 0.5,
                        }}
                      >
                        {stat.label}
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: "primary.main",
                          fontSize: {
                            xs:
                              stat.id === "pending_rent"
                                ? "0.95rem"
                                : "1.15rem",
                            sm:
                              stat.id === "pending_rent"
                                ? "1rem"
                                : "1.2rem",
                            md:
                              stat.id === "pending_rent"
                                ? "1rem"
                                : "1.25rem",
                            lg:
                              stat.id === "pending_rent"
                                ? "1.15rem"
                                : "1.4rem",
                          },
                          lineHeight: 1.25,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {stat.value}
                      </Typography>

                      {stat.subtext && (
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            color: isErrorStat
                              ? "error.main"
                              : "text.secondary",
                            fontWeight: isErrorStat ? 700 : 500,
                            fontSize: {
                              xs: "0.68rem",
                              sm: "0.7rem",
                              md: "0.72rem",
                              lg: "0.75rem",
                            },
                            mt: 0.5,
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