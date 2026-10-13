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
    subtext: "10 of 12 units occupied",
    progress: 85,
    icon: <PeopleOutlinedIcon />,
    colorKey: "success",
  },
  {
    id: "units",
    label: "Total Units",
    value: "40",
    subtext: "Units",
    icon: <ApartmentOutlinedIcon />,
    colorKey: "primary",
  },
  {
    id: "properties",
    label: "Property Count",
    value: "3",
    subtext: "Properties",
    icon: <HomeWorkOutlinedIcon />,
    colorKey: "primary",
  },
  {
    id: "pending_rent",
    label: "Pending Rent",
    value: "KSh 20,000",
    subtext: "Overdue",
    icon: <WarningAmberOutlinedIcon />,
    colorKey: "error",
  },
];

function DashboardStats() {
  const theme = useTheme();

  return (
    <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} alignItems="stretch">
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
          <Grid
            key={stat.id}
            size={{ xs: 12, sm: 6, md: 3 }}
            sx={{ display: "flex", minWidth: 0 }}
          >
            <Card
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                minWidth: 0,
                minHeight: { xs: 145, sm: 155, md: 165 },
                borderRadius: { xs: 2.5, md: 3 },
                bgcolor: "#FFFFFF",
                border: "1px solid",
                borderColor: "divider",
                boxShadow:
                  "0 4px 16px rgba(15, 23, 42, 0.04)",
                transition:
                  "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

                "&:hover": {
                  transform: { xs: "none", md: "translateY(-4px)" },
                  borderColor: isError
                    ? theme.palette.error.main
                    : "secondary.main",
                  boxShadow:
                    "0 12px 28px rgba(15, 23, 42, 0.10)",
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
                  p: { xs: 2, sm: 2.25, md: 2.5 },
                  "&:last-child": {
                    pb: { xs: 2, sm: 2.25, md: 2.5 },
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
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          fontWeight: 600,
                          fontSize: { xs: "0.72rem", sm: "0.78rem" },
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
                        fontSize: { xs: "1.4rem", sm: "1.65rem" },
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
                        fontSize: { xs: "0.68rem", sm: "0.75rem" },
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
                      gap: { xs: 1.5, sm: 2 },
                      flexGrow: 1,
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: { xs: 40, sm: 46, md: 48 },
                        height: { xs: 40, sm: 46, md: 48 },
                        borderRadius: { xs: "11px", md: "14px" },
                        bgcolor: iconBg,
                        color: iconColor,
                        flexShrink: 0,
                      }}
                    >
                      {React.cloneElement(stat.icon, {
                        fontSize: "small",
                      })}
                    </Box>

                    <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          color: "text.secondary",
                          fontWeight: 600,
                          fontSize: { xs: "0.7rem", sm: "0.78rem" },
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
                            xs: stat.id === "pending_rent"
                              ? "0.95rem"
                              : "1.15rem",
                            sm: stat.id === "pending_rent"
                              ? "1.05rem"
                              : "1.3rem",
                            md: stat.id === "pending_rent"
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
                            color: isError
                              ? "error.main"
                              : "text.secondary",
                            fontWeight: isError ? 700 : 500,
                            fontSize: { xs: "0.68rem", sm: "0.75rem" },
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