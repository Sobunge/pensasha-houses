// src/pages/BrowsePropertiesPage.jsx
import React, { useState, useMemo } from "react";
import { Box, Typography, Button, Pagination } from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PropertyGrid from "../ListingsPage/PropertyGrid";
import PropertyFilters from "./UnitFilters";

function BrowsePropertiesPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    price: [0, 100000], // min and max price
  });

  // Mock property data
  const availableProperties = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Property ${i + 1}`,
    location: ["Nairobi", "Mombasa", "Kisumu"][i % 3],
    price: 50000 + i * 5000,
    type: ["Apartment", "Villa", "Studio"][i % 3],
    beds: (i % 4) + 1,
    baths: (i % 3) + 1,
    size: 50 + i * 10,
    image: `/assets/images/house.jpg`,
    category: ["Residential", "Commercial"][i % 2],
  }));

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleFilterReset = () => {
    setFilters({ search: "", category: "", price: [0, 100000] });
    setPage(1);
  };

  // Apply filters
  const filteredProperties = useMemo(() => {
    return availableProperties.filter((property) => {
      const matchesSearch = property.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const matchesCategory = filters.category
        ? property.type === filters.category
        : true;

      const matchesPrice =
        property.price >= filters.price[0] && property.price <= filters.price[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [availableProperties, filters]);

  // Pagination logic
  const propertiesPerPage = 9;
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const displayedProperties = useMemo(() => {
    const start = (page - 1) * propertiesPerPage;
    return filteredProperties.slice(start, start + propertiesPerPage);
  }, [page, filteredProperties]);

  const handlePageChange = (event, value) => setPage(value);

  return (
    <Box
      sx={{
        mb: 3,
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 4 },
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Page Header */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "#111" }}>
          Browse Units
        </Typography>
        <Typography variant="body1" sx={{ color: "#2a2a2a" }}>
          Explore available units and find your dream home.
        </Typography>
        <Box
          sx={{
            width: 100,
            height: 4,
            backgroundColor: "#f8b500",
            mx: "auto",
            mt: 2,
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Filters */}
      <PropertyFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleFilterReset}
      />

      {/* Empty State */}
      {filteredProperties.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            p: 5,
            borderRadius: 3,
            border: "2px dashed #f8b500",
            backgroundColor: "#fff8e1",
          }}
        >
          <HomeWorkOutlinedIcon sx={{ fontSize: 80, color: "#f8b500", mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#111" }}>
            No units Found
          </Typography>
          <Typography sx={{ color: "#2a2a2a", mb: 3 }}>
            We couldn’t find any unit matching your filters.
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
              color: "#111",
              backgroundColor: "#f8b500",
              border: "2px solid #c59000",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#ffc62c",
                transform: "scale(1.05)",
                boxShadow: "0 4px 15px rgba(248, 181, 0, 0.4)",
              },
            }}
            onClick={handleFilterReset}
          >
            Reset Filters
          </Button>
        </Box>
      ) : (
        <>
          {/* Property Cards */}
          <PropertyGrid properties={displayedProperties} />

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: "auto", py: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 600,
                  borderRadius: "50%",
                  color: "#111",
                },
                "& .Mui-selected": {
                  backgroundColor: "#f8b500 !important",
                  color: "#111",
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default BrowsePropertiesPage;
