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

/**
 * Layout constants
 * Keep these aligned with your Navbar and Hero
 */
const NAVBAR_HEIGHT = {
  mobile: 56,
  desktop: 64,
};

const ListingsPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  const isTabletOrMobile = useMediaQuery("(max-width:1224px)");

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  /**
   * Mock properties (replace with API later)
   */
  const properties = Array.from({ length: 20 }, (_, i) => ({
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
  }));

  /**
   * Filtering logic
   */
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.category && property.category !== filters.category) return false;
      if (filters.type && property.type !== filters.type) return false;
      if (
        filters.location &&
        !property.location.toLowerCase().includes(filters.location.toLowerCase())
      )
        return false;
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

  /**
   * Pagination
   */
  const propertiesPerPage = 12;
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const displayedProperties = filteredProperties.slice(
    (page - 1) * propertiesPerPage,
    page * propertiesPerPage
  );

  const handlePageChange = (_, value) => setPage(value);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <Box
      sx={{
        mt: {
          xs: `${NAVBAR_HEIGHT.mobile}px`,
          md: `${NAVBAR_HEIGHT.desktop}px`,
        },
        px: { xs: 2, md: 4 },
        p: 4,
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Page header */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Explore Available Listings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Find your next home — browse apartments, villas, and studios across Kenya.
        </Typography>
        <Divider
          sx={{ width: 80, mx: "auto", borderColor: "#ffc62c" }}
        />
      </Box>

      {/* Mobile filter button */}
      {isTabletOrMobile && (
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<FilterAltOutlinedIcon />}
            onClick={toggleDrawer(true)}
            sx={{
              background: "linear-gradient(45deg, #f8b500, #ffc62c)",
              color: "#111",
              fontWeight: 700,
              borderRadius: 2,
              textTransform: "none",
              px: 2,
              py: 0.8,
              "&:hover": {
                background: "linear-gradient(45deg, #ffc62c, #f8b500)",
              },
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
          gap: 3,
        }}
      >
        {/* Sidebar (desktop) */}
        {!isTabletOrMobile && (
          <Box
            sx={{
              flex: "0 0 300px",
              position: "sticky",
              top: {
                xs: NAVBAR_HEIGHT.mobile + 16,
                md: NAVBAR_HEIGHT.desktop + 16,
              },
            }}
          >
            <SidebarFilter onFilter={handleFilterChange} />
          </Box>
        )}

        {/* Listings */}
        <Box sx={{ flex: 1 }}>
          <PropertyGrid properties={displayedProperties} />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 600,
                  borderRadius: "50%",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Filter drawer (mobile) */}
      {isTabletOrMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: "80vw",
              maxWidth: 350,
              height: "100vh",
            },
          }}
        >
          <Box sx={{ position: "relative", height: "100%" }}>
            <IconButton
              onClick={toggleDrawer(false)}
              sx={{ position: "absolute", top: 8, right: 8 }}
              size="small"
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ mt: 6, px: 2 }}>
              <SidebarFilter
                onFilter={handleFilterChange}
                onCloseDrawer={() => setDrawerOpen(false)}
              />
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default ListingsPage;
