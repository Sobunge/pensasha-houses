// src/components/cards/DashboardStats.jsx
import React from "react";
import { Grid, Card, CardContent, Typography, Box, useTheme, alpha } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleIcon from "@mui/icons-material/People";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// Sample dynamic stats
const stats = [
  { label: "Properties", value: 3, icon: <HomeWorkIcon fontSize="small" /> },
  { label: "Units", value: 40, icon: <ApartmentIcon fontSize="small" /> },
  { label: "Occupancy", value: "85%", icon: <PeopleIcon fontSize="small" /> },
  { 
    label: "Pending Rent", 
    value: "Ksh 20,000", 
    icon: <WarningAmberIcon fontSize="small" />,
    colorKey: "error" // Optionally highlight critical metrics using palette states
  },
];

function DashboardStats() {
  const theme = useTheme();
  const primaryAccent = theme.palette.primary.main;

  return (
    <Grid container spacing={2} justifyContent="center">
      {stats.map((stat, index) => {
        // Determine accent colors dynamically per stat card
        const accentColor = stat.colorKey 
          ? theme.palette[stat.colorKey].main 
          : primaryAccent;

        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 3.5,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
                maxWidth: 320,
                mx: "auto",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: accentColor,
                  bgcolor: alpha(accentColor, 0.02),
                  boxShadow: `0 6px 16px ${alpha(accentColor, 0.12)}`,
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: { xs: 2, sm: 2.5 },
                  "&:last-child": { pb: { xs: 2, sm: 2.5 } }, // Fix MUI default padding issue
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    bgcolor: alpha(accentColor, 0.12),
                    color: accentColor,
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: "text.primary",
                      fontSize: { xs: "1.1rem", sm: "1.25rem" },
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      fontSize: { xs: "0.78rem", sm: "0.85rem" },
                      mt: 0.3,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default DashboardStats;