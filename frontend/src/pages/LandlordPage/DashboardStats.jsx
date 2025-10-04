// src/components/cards/DashboardStats.jsx
import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleIcon from "@mui/icons-material/People";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// Sample dynamic stats
const stats = [
  { label: "Properties", value: 3, icon: <HomeWorkIcon /> },
  { label: "Units", value: 40, icon: <ApartmentIcon /> },
  { label: "Occupancy", value: "85%", icon: <PeopleIcon /> },
  { label: "Pending Rent", value: "Ksh 20,000", icon: <WarningAmberIcon /> },
];

function DashboardStats() {
  return (
    <Grid container spacing={2} justifyContent="center">
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              height: "100%",
              bgcolor: "#fff",
              maxWidth: 320,
              mx: "auto",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: { xs: 2, sm: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: "#f8b50022",
                  color: "#f8b500",
                  fontSize: 28,
                  flexShrink: 0,
                }}
              >
                {stat.icon}
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#111", fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardStats;
