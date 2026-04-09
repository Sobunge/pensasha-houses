import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  Pagination,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SidebarFilter from "./SidebarFilter";
import PropertyGrid from "./PropertyGrid";

const ListingsPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  const isTabletOrMobile = useMediaQuery("(max-width:1224px)");

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  /**
   * Mock properties (replace with API later)
   */
  const properties = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Property ${i + 1}`,
    location: ["Nairobi", "Mombasa", "Kisumu"][i % 3],
    price: 50000 + i * 5000,
    type: ["Apartment", "Villa", "Studio"][i % 3],
    beds: (i % 4) + 1,
    baths: (i % 3) + 1,
    size: 50 + i * 10,
    image: "/assets/images/house.jpg",
    category: "Residential",
  })), []);

  /**
   * Filtering logic
   */
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.category && property.category !== filters.category) return false;
      if (filters.type && property.type !== filters.type) return false;
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.bedrooms && property.beds < filters.bedrooms) return false;
      if (filters.bathrooms && property.baths < filters.bathrooms) return false;

      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (property.price < min || property.price > max) return false;
      }
      if (filters.sizeRange) {
        const [min, max] = filters.sizeRange;
        if (property.size < min || property.size > max) return false;
      }
      return true;
    });
  }, [filters, properties]);

  const propertiesPerPage = 12;
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const displayedProperties = filteredProperties.slice((page - 1) * propertiesPerPage, page * propertiesPerPage);

  const handlePageChange = (_, value) => setPage(value);
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <Box
      sx={{
        /* 1. REMOVED mt: Layout handles this now. */
        px: { xs: 2, md: 4 },
        py: 4, 
        bgcolor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Page header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "#111" }}>
          Explore Available Listings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Find your next home — browse apartments, villas, and studios across Kenya.
        </Typography>
        <Divider sx={{ width: 60, mx: "auto", borderBottomWidth: 3, borderColor: "#F8B500" }} />
      </Box>

      {/* Mobile filter button */}
      {isTabletOrMobile && (
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<FilterAltOutlinedIcon />}
            onClick={toggleDrawer(true)}
            sx={{
              bgcolor: "#F8B500",
              color: "#111",
              fontWeight: 700,
              borderRadius: 2,
              px: 3,
              "&:hover": { bgcolor: "#e0a400" },
            }}
          >
            Show Filters
          </Button>
        </Box>
      )}

      {/* Main content */}
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        {/* Sidebar (desktop) */}
        {!isTabletOrMobile && (
          <Box
            sx={{
              flex: "0 0 300px",
              position: "sticky",
              /* 2. SIMPLIFIED STICKY: 
                 Since the main container is already padded by 64px, 
                 'top: 20px' here means the sidebar stays 20px below the Navbar.
              */
              top: 84, // 64px (navbar) + 20px gap
            }}
          >
            <SidebarFilter onFilter={handleFilterChange} />
          </Box>
        )}

        {/* Listings */}
        <Box sx={{ flex: 1 }}>
          <PropertyGrid properties={displayedProperties} />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{
                "& .Mui-selected": {
                  bgcolor: "#F8B500 !important",
                  color: "#111",
                  fontWeight: 700,
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Filter drawer (mobile) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { width: "85vw", maxWidth: 320, p: 2 } }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <SidebarFilter
          onFilter={handleFilterChange}
          onCloseDrawer={() => setDrawerOpen(false)}
        />
      </Drawer>
    </Box>
  );
};

export default ListingsPage;