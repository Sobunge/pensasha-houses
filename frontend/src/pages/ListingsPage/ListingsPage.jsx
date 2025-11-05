import React, { useState } from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SidebarFilter from "./SidebarFilter";
import PropertyGrid from "./PropertyGrid";

const ListingsPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);

  const isTabletOrMobile = useMediaQuery("(max-width:1224px)");
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  // Example properties
  const properties = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Property ${i + 1}`,
    location: ["Nairobi", "Mombasa", "Kisumu"][i % 3],
    price: 50000 + i * 5000,
    type: ["Apartment", "Villa", "Studio"][i % 3],
    beds: (i % 4) + 1,
    baths: (i % 3) + 1,
    image: `/assets/images/house.jpg`,
  }));

  // Pagination setup
  const propertiesPerPage = 12;
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const displayedProperties = properties.slice(
    (page - 1) * propertiesPerPage,
    page * propertiesPerPage
  );

  const handlePageChange = (event, value) => setPage(value);

  return (
    <Box
      sx={{
        mt: { xs: 9, md: 10 },
        px: { xs: 2, md: 4 },
        pb: 4,
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header section */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 1, color: "#333" }}
        >
          Explore Available Listings
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 2 }}
        >
          Find your next home — browse apartments, villas, and studios across Kenya.
        </Typography>
        <Divider sx={{ width: 80, mx: "auto", mb: 2, borderColor: "#ffc62c" }} />
      </Box>

      {/* Drawer button for tablets & mobile */}
      {isTabletOrMobile && (
        <Box sx={{ mb: 2, textAlign: "center" }}>
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
                transform: "scale(1.05)",
              },
            }}
          >
            Show Filters
          </Button>
        </Box>
      )}

      {/* Main layout: sidebar + property grid */}
      <Box sx={{ display: { xs: "block", md: "flex" }, alignItems: "flex-start", gap: 3 }}>
        {/* Desktop sidebar */}
        {!isTabletOrMobile && (
          <Box
            sx={{
              flex: "0 0 300px",
              position: "sticky",
              top: 120,
              bgcolor: "#fff",
              p: 2,
              borderRadius: 2,
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <SidebarFilter />
          </Box>
        )}

        {/* Property grid */}
        <Box sx={{ flex: 1 }}>
          <PropertyGrid properties={displayedProperties} />

          {/* Pagination */}
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

      {/* Drawer for tablet & mobile */}
      {isTabletOrMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: "80vw",
              maxWidth: 300,
              bgcolor: "#fff",
              height: "100vh",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
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

            <Box sx={{ mt: 6, pl: 3, pr: 2 }}>
              <SidebarFilter />
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default ListingsPage;
