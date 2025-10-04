// src/pages/PropertiesPage/PropertiesPage.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import PropertyInfoCard from "../../components/cards/PropertyInfoCard";
import { useAuth } from "../Auth/AuthContext";

function PropertiesPage() {
  const { user } = useAuth();

  // Sample properties
  const sampleProperties = [
    { id: 1, name: "Sunrise Apartments", unit: "A-203", lease: "Jan 2024 – Dec 2024", rentAmount: "Ksh 12,000", rentStatus: "Pending" },
    { id: 2, name: "Pensasha Towers", unit: "B-105", lease: "Feb 2024 – Jan 2025", rentAmount: "Ksh 15,000", rentStatus: "Paid" },
    { id: 3, name: "Lakeview Residences", unit: "C-402", lease: "Mar 2024 – Feb 2025", rentAmount: "Ksh 18,000", rentStatus: "Pending" },
    { id: 4, name: "Garden Court", unit: "D-301", lease: "Apr 2024 – Mar 2025", rentAmount: "Ksh 14,000", rentStatus: "Paid" },
  ];

  return (
    <Box sx={{ mb: 3, px: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 3, textAlign: "center", color: "#111111" }}
      >
        Your Properties
      </Typography>

      {sampleProperties.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            p: 4,
            borderRadius: 3,
            border: "2px dashed #c59000",
            backgroundColor: "#f7f7f7",
          }}
        >
          <HomeWorkOutlinedIcon sx={{ fontSize: 60, color: "#f8b500", mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#111111" }}>
            No properties found
          </Typography>
          <Typography sx={{ color: "#2a2a2a", mb: 3 }}>
            It looks like you don’t have any properties linked to your account yet.
          </Typography>
          {user.role === "landlord" && (
            <Button
              variant="contained"
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                fontWeight: 600,
                backgroundColor: "#f8b500",
                "&:hover": { backgroundColor: "#ffc62c" },
              }}
            >
              Add Your First Property
            </Button>
          )}
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {sampleProperties.map((property) => (
            <Box
              key={property.id}
              sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%", md: "1 1 30%" } }}
            >
              <PropertyInfoCard property={property} />
            </Box>
          ))}
        </Box>
      )}

      {sampleProperties.length > 6 && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 3,
              borderColor: "#f8b500",
              color: "#111111",
              "&:hover": { backgroundColor: "#ffc62c", borderColor: "#c59000" },
            }}
          >
            Load More Properties
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default PropertiesPage;
