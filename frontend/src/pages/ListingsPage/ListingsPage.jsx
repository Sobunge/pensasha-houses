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
   * Mock properties
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
        px: { xs: 2, md: 4 },
        /* Account for fixed Navbar height (60px mobile / 72px desktop) + spacing */
        pt: { xs: "80px", md: "100px" },
        pb: { xs: 6, md: 8 },
        bgcolor: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      {/* Page Header */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="overline"
          sx={{
            color: "#B5922B",
            fontWeight: 700,
            letterSpacing: "0.15em",
            fontSize: "0.8rem",
          }}
        >
          DISCOVER RESIDENCES
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 600,
            color: "#0F172A",
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            mt: 0.5,
            mb: 1.5,
          }}
        >
          Explore Available Listings
        </Typography>

        <Typography variant="body1" sx={{ color: "#64748B", maxWidth: 600, mx: "auto", mb: 2 }}>
          Find your next home — browse apartments, villas, and studios across Kenya.
        </Typography>

        <Divider
          sx={{
            width: 60,
            mx: "auto",
            borderBottomWidth: 3,
            borderColor: "#D4AF37",
            borderRadius: "2px",
          }}
        />
      </Box>

      {/* Mobile Filter Button */}
      {isTabletOrMobile && (
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<FilterAltOutlinedIcon />}
            onClick={toggleDrawer(true)}
            sx={{
              bgcolor: "#0F172A",
              color: "#FFFFFF",
              fontWeight: 600,
              borderRadius: "10px",
              border: "1px solid #D4AF37",
              px: 3.5,
              py: 1,
              textTransform: "none",
              boxShadow: "0 4px 14px rgba(15, 23, 42, 0.15)",
              "&:hover": {
                bgcolor: "#B5922B",
                borderColor: "#B5922B",
                color: "#FFFFFF",
              },
            }}
          >
            Show Filters
          </Button>
        </Box>
      )}

      {/* Main Content Layout */}
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        {/* Sidebar (Desktop) */}
        {!isTabletOrMobile && (
          <Box
            sx={{
              flex: "0 0 300px",
              position: "sticky",
              top: 92, // 72px (fixed navbar height) + 20px padding gap
            }}
          >
            <SidebarFilter onFilter={handleFilterChange} />
          </Box>
        )}

        {/* Listings Grid & Pagination */}
        <Box sx={{ flex: 1 }}>
          <PropertyGrid properties={displayedProperties} />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#0F172A",
                  fontWeight: 600,
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(212, 175, 55, 0.15)",
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "#B5922B !important",
                  color: "#FFFFFF !important",
                  fontWeight: 700,
                  boxShadow: "0 4px 10px rgba(181, 146, 43, 0.3)",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Filter Drawer (Mobile) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "85vw",
            maxWidth: 320,
            p: 2.5,
            backgroundColor: "#FFFFFF",
            borderRight: "1px solid #D4AF37",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <IconButton 
            onClick={toggleDrawer(false)}
            sx={{
              color: "#0F172A",
              "&:hover": { color: "#B5922B" },
            }}
          >
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