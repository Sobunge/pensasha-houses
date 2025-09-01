import React, { useState } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import MainContent from "../../components/MainContent";
import PropertySearch from "./PropertySearch";
import PropertyGrid from "./PropertyGrid";

// Generate 20 dummy properties
const properties = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Property ${i + 1}`,
  location: ["Karen", "Westlands", "Runda", "Kileleshwa"][i % 4] + ", Nairobi",
  price: 5000000 + i * 1000000,
  type: ["Apartment", "Villa", "House"][i % 3],
  beds: 2 + (i % 4),
  baths: 1 + (i % 3),
  image: `/assets/images/house.jpg`,
}));

const ITEMS_PER_PAGE = 8;

export default function ListingsPage() {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [page, setPage] = useState(1);

  const handleSearch = (searchData) => {
    const filtered = properties.filter((prop) => {
      const matchLocation = searchData.location
        ? prop.location.toLowerCase().includes(searchData.location.toLowerCase())
        : true;
      const matchType = searchData.type
        ? prop.type.toLowerCase() === searchData.type.toLowerCase()
        : true;
      const matchMinPrice = searchData.minPrice
        ? prop.price >= Number(searchData.minPrice)
        : true;
      const matchMaxPrice = searchData.maxPrice
        ? prop.price <= Number(searchData.maxPrice)
        : true;

      return matchLocation && matchType && matchMinPrice && matchMaxPrice;
    });

    setFilteredProperties(filtered);
    setPage(1); // Reset to first page
  };

  // Pagination slice
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProperties = filteredProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <MainContent>
      {/* Search Bar */}
      <PropertySearch onSearch={handleSearch} />

      {/* Property Grid */}
      {paginatedProperties.length > 0 ? (
        <>
          <PropertyGrid properties={paginatedProperties} />

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            No properties found. Try adjusting your filters.
          </Typography>
        </Box>
      )}
    </MainContent>
  );
}
