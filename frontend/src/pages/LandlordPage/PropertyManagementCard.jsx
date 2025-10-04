// src/components/cards/PropertyManagementCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box, LinearProgress, Stack, Button } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { useNavigate } from "react-router-dom";

// Sample properties
const properties = [
  { name: "Sunrise Apartments", units: 12, occupied: 10 },
  { name: "Pensasha Towers", units: 20, occupied: 18 },
];

function PropertyManagementCard() {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        background: "linear-gradient(135deg, #ffffff, #fafafa)",
        width: "100%",
        maxWidth: 350, // responsive max width
        mx: "auto",    // center horizontally
      }}
    >
      <CardContent>
        {/* Property List */}
        <Stack spacing={3}>
          {properties.map((property, index) => {
            const occupancyRate = Math.round((property.occupied / property.units) * 100);
            const progressColor =
              occupancyRate > 80 ? "#4caf50" : occupancyRate > 50 ? "#f8b500" : "#f44336";

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
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2a2a2a" }}>
                      {property.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "#777", fontWeight: 500 }}>
                    {occupancyRate}% Occupied
                  </Typography>
                </Box>

                {/* Occupancy Progress Bar */}
                <LinearProgress
                  variant="determinate"
                  value={occupancyRate}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: "#eee",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: progressColor,
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

        {/* View All Button */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="outlined"
            startIcon={<HomeWorkIcon />}
            onClick={() => navigate("/landlord/properties")}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: 600,
              fontSize: "0.85rem",
              color: "#111111",
              borderColor: "#f8b500",
              "&:hover": {
                backgroundColor: "#f8b500",
                color: "#111111",
                borderColor: "#111111",
              },
            }}
          >
            View All Properties
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PropertyManagementCard;
