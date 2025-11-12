// src/pages/PropertiesPage/PropertiesPage.jsx
import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PropertyInfoCard from "../../components/cards/PropertyInfoCard";

function PropertiesPage() {
  // Sample properties
  const sampleProperties = [
    { id: 1, name: "Sunrise Apartments", unit: "A-203", lease: "Jan 2024 – Dec 2024", rentAmount: "Ksh 12,000", rentStatus: "Pending" },
    { id: 2, name: "Pensasha Towers", unit: "B-105", lease: "Feb 2024 – Jan 2025", rentAmount: "Ksh 15,000", rentStatus: "Paid" },
    { id: 3, name: "Lakeview Residences", unit: "C-402", lease: "Mar 2024 – Feb 2025", rentAmount: "Ksh 18,000", rentStatus: "Pending" },
    { id: 4, name: "Garden Court", unit: "D-301", lease: "Apr 2024 – Mar 2025", rentAmount: "Ksh 14,000", rentStatus: "Paid" },
  ];

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ mb: 3, px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 } }}>
      {/* Page Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 2,
          textAlign: "center",
          color: "#111111", // black text
          fontSize: { xs: "2rem", md: "2.5rem" },
        }}
      >
        Your Properties
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 4, textAlign: "center", color: "#2a2a2a" }}
      >
        Manage your rented units or explore available properties to rent.
      </Typography>

      {/* Empty State */}
      {sampleProperties.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            p: 5,
            borderRadius: 3,
            border: "2px dashed #f8b500",
            backgroundColor: "#f7f7f7",
          }}
        >
          <HomeWorkOutlinedIcon sx={{ fontSize: 80, color: "#f8b500", mb: 2 }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 1, color: "#111111" }}
          >
            No Properties Found
          </Typography>
          <Typography sx={{ color: "#2a2a2a", mb: 3 }}>
            You don’t have any properties yet. Start browsing and rent your dream place!
          </Typography>
          <Button
            variant="contained"
            startIcon={<SearchOutlinedIcon />}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontWeight: 700,
              fontSize: "1rem",
              color: "#111111",          // dark text for contrast
              backgroundColor: "#f8b500", // solid gold
              border: "2px solid #c59000", // thin darker gold border
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#ffc62c", // lighter gold on hover
                transform: "scale(1.05)",   // subtle grow effect
                boxShadow: "0 4px 15px rgba(248, 181, 0, 0.4)", // soft glow
              },
            }}
          >
            Browse Properties
          </Button>

        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {sampleProperties.map((property) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={property.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <PropertyInfoCard property={property} statusColor={getStatusColor(property.rentStatus)} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Load more button */}
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
              "&:hover": {
                backgroundColor: "#ffc62c",
                borderColor: "#c59000",
              },
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
