import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  Pagination,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SidebarFilter from "./SidebarFilter";
import PropertyGrid from "./PropertyGrid";

const ListingsPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Drawer for tablet and smaller devices
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

  // 12 properties per page
  const propertiesPerPage = 12;
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const displayedProperties = properties.slice(
    (page - 1) * propertiesPerPage,
    page * propertiesPerPage
  );

  const handlePageChange = (event, value) => setPage(value);

  return (
    <Box sx={{ mt: { xs: 8, md: 8 }, px: { xs: 2, md: 2 }, pb: 1 }}>
      {/* Drawer button for tablets & mobile */}
      {isTabletOrMobile && (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<MenuIcon />}
            onClick={toggleDrawer(true)}
            size="small"
            sx={{ fontSize: "0.75rem", py: 0.5, px: 1.5 }}
          >
            Filters
          </Button>
        </Box>
      )}

      {/* Main layout: sidebar (desktop only) + property grid */}
      <Box sx={{ display: { xs: "block", md: "flex" }, alignItems: "flex-start" }}>
        {/* Desktop sidebar */}
        {!isTabletOrMobile && (
          <Box sx={{ flex: "0 0 300px", position: "sticky", top: 120 }}>
            <SidebarFilter />
          </Box>
        )}

        {/* Property grid */}
        <Box sx={{ flex: 1, mt: { xs: 2, md: 2 } }}>
          <PropertyGrid properties={displayedProperties} />

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
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
              boxSizing: "border-box",
              bgcolor: "#fff",
              height: "100vh",
            },
          }}
        >
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
            size="small"
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ mt: 4, pl: 3 }}>
            <SidebarFilter />
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default ListingsPage;
