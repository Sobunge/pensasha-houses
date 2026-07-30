import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Toolbar,
  Grid,
  Typography,
  Skeleton,
  Button,
  Pagination,
  useTheme,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import PropertyCard from "../ListingsPage/PropertyCard";
import StickyFilterHeader from "../ListingsPage/StickyFilterHeader";
import FilterDrawer from "../ListingsPage/FilterDrawer";

export default function BrowseListings({ properties: passedProperties = [], loading = false }) {
  const theme = useTheme();

  /**
   * Mock properties structured to align with all header and drawer filters
   */
  const mockProperties = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        title: `Property ${i + 1}`,
        location: ["Nairobi", "Mombasa", "Kisumu"][i % 3],
        price: 30000 + i * 7500,
        type: ["Apartments", "Houses", "Shops & Commercial", "Offices"][i % 4],
        beds: (i % 4) + 1,
        baths: (i % 3) + 1,
        size: 50 + i * 15,
        image: "/assets/images/house.jpg",
        category: "Residential",
        amenities: {
          waterSupply: i % 2 === 0,
          parking: i % 3 === 0,
          security: true,
        },
      })),
    []
  );

  const properties = passedProperties.length > 0 ? passedProperties : mockProperties;

  // Primary State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  // Pagination State
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Advanced Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([5000, 200000]);
  const [bedrooms, setBedrooms] = useState("Any");
  const [amenities, setAmenities] = useState({
    waterSupply: false,
    parking: false,
    security: false,
  });

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("newest");
    setPriceRange([5000, 200000]);
    setBedrooms("Any");
    setAmenities({ waterSupply: false, parking: false, security: false });
    setPage(1);
  };

  // Compute active drawer filters count for Badge icon
  const activeFilterCount =
    (bedrooms !== "Any" ? 1 : 0) +
    (amenities.waterSupply ? 1 : 0) +
    (amenities.parking ? 1 : 0) +
    (amenities.security ? 1 : 0);

  // Filter & Sort Pipeline
  const filteredProperties = useMemo(() => {
    return properties
      .filter((item) => {
        // 1. Category Chip Matching
        const matchesCategory =
          selectedCategory === "All" ||
          (selectedCategory === "Shops & Commercial"
            ? item.type?.toLowerCase().includes("shop") || item.type?.toLowerCase().includes("commercial")
            : item.type?.toLowerCase() === selectedCategory.toLowerCase());

        // 2. Search Term Matching (Title or Location)
        const matchesSearch =
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchTerm.toLowerCase());

        // 3. Price Range Matching
        const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];

        // 4. Bedrooms Matching
        const matchesBedrooms =
          bedrooms === "Any" ||
          (bedrooms === "4+" ? item.beds >= 4 : item.beds === Number(bedrooms));

        // 5. Amenities Checkbox Matching
        const matchesAmenities =
          (!amenities.waterSupply || item.amenities?.waterSupply) &&
          (!amenities.parking || item.amenities?.parking) &&
          (!amenities.security || item.amenities?.security);

        return (
          matchesCategory &&
          matchesSearch &&
          matchesPrice &&
          matchesBedrooms &&
          matchesAmenities
        );
      })
      .sort((a, b) => {
        // Synchronized with StickyFilterHeader MenuItem values ('price-low' & 'price-high')
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        // Default / 'newest': retains highest ID first
        return b.id - a.id;
      });
  }, [properties, selectedCategory, searchTerm, priceRange, bedrooms, amenities, sortBy]);

  // Reset page when any search/filter criteria changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory, sortBy, priceRange, bedrooms, amenities]);

  // Paginated Data Slice
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, page, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", pb: 6 }}>
      {/* Navbar space offset */}
      <Toolbar sx={{ minHeight: { xs: 60, md: 72 } }} />

      <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 3 } }}>
        {/* Header Title */}
        <Box sx={{ mb: 3 }}>
          <Typography
            component="h1"
            sx={{
              fontWeight: 800,
              color: theme.palette.text.primary,
              mb: 0.5,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Find Your Next Space
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            Explore available rental houses, shops, and commercial spaces.
          </Typography>
        </Box>

        {/* Sticky Header Component */}
        <StickyFilterHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onOpenDrawer={() => setDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* Filter Drawer Component */}
        <FilterDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          bedrooms={bedrooms}
          setBedrooms={setBedrooms}
          amenities={amenities}
          setAmenities={setAmenities}
          onApply={() => setDrawerOpen(false)}
          onReset={handleResetFilters}
        />

        {/* Loading Skeletons */}
        {loading && (
          <Grid container spacing={3} justifyContent="center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={n}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: "16px 16px 0 0" }} />
                <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
                <Skeleton variant="text" height={20} width="60%" />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State */}
        {!loading && filteredProperties.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 2,
              bgcolor: "#FFFFFF",
              borderRadius: "16px",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <FilterListIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              No vacant units match your search
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
              Try adjusting your price range or clearing selected filters.
            </Typography>
            <Button
              variant="contained"
              onClick={handleResetFilters}
              sx={{ bgcolor: "#0F172A", color: "#FFFFFF" }}
            >
              Reset All Filters
            </Button>
          </Box>
        )}

        {/* Grid and List Output */}
        {!loading && filteredProperties.length > 0 && (
          <>
            <Grid container spacing={3} justifyContent="center">
              {paginatedProperties.map((property) => (
                <Grid
                  item
                  xs={12}
                  sm={viewMode === "list" ? 12 : 6}
                  md={viewMode === "list" ? 12 : 4}
                  lg={viewMode === "list" ? 12 : 3}
                  key={property.id}
                >
                  <PropertyCard property={property} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination Controls */}
            <Box
              sx={{
                mt: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Showing {(page - 1) * itemsPerPage + 1}–
                {Math.min(page * itemsPerPage, filteredProperties.length)} of{" "}
                {filteredProperties.length} properties
              </Typography>

              {totalPages > 1 && (
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontWeight: 600,
                    },
                  }}
                />
              )}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}