// src/components/cards/PropertyManagementCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Stack,
} from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

const properties = [
  { name: "Sunrise Apartments", units: 12, occupied: 10 },
  { name: "Pensasha Towers", units: 20, occupied: 18 },
  { name: "Lakeview Residences", units: 8, occupied: 6 },
];

function PropertyManagementCard() {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        background: "linear-gradient(135deg, #ffffff, #fafafa)",
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: "#111",
            letterSpacing: 0.5,
          }}
        >
          Managed Properties
        </Typography>

        {/* Property List */}
        <Stack spacing={3}>
          {properties.map((property, index) => {
            const occupancyRate = Math.round(
              (property.occupied / property.units) * 100
            );

            return (
              <Box key={index}>
                {/* Property Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <HomeWorkIcon sx={{ color: "#f8b500" }} />
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, color: "#2a2a2a" }}
                    >
                      {property.name}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{ color: "#777", fontWeight: 500 }}
                  >
                    {occupancyRate}% Occupied
                  </Typography>
                </Box>

                {/* Occupancy Progress */}
                <LinearProgress
                  variant="determinate"
                  value={occupancyRate}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: "#eee",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor:
                        occupancyRate > 80
                          ? "#4caf50"
                          : occupancyRate > 50
                          ? "#f8b500"
                          : "#f44336",
                    },
                  }}
                />

                {/* Units Info */}
                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 1, color: "#555" }}
                >
                  {property.occupied} of {property.units} units occupied
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PropertyManagementCard;
