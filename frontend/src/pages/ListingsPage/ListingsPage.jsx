import React, { useState } from "react";
import { Box, Grid, Drawer, IconButton, Button, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SidebarFilter from "./SidebarFilter";

const ListingsPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mobile breakpoint at 768px
  const isMobile = useMediaQuery("(max-width:768px)");

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <Box sx={{ mt: { xs: 8, md: 0 }, px: { xs: 2, md: 4 }, pb: 6 }}>
      {/* Mobile filter button */}
      {isMobile && (
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

      <Grid container spacing={3}>
        {/* Desktop sidebar */}
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                position: "sticky",
                top: 120,
              }}
            >
              <SidebarFilter />
            </Box>
          </Grid>
        )}

        {/* Listings */}
        <Grid item xs={12} md={isMobile ? 12 : 9}>
          <Box
            sx={{
              bgcolor: "background.paper",
              p: { xs: 2, md: 3 },
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              minHeight: "80vh",
            }}
          >
            Listings content goes here...
          </Box>
        </Grid>
      </Grid>

      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: "80vw",
              maxWidth: 300,   // keeps drawer readable on tablets
              boxSizing: "border-box",
              bgcolor: "#fff",
              height: "100vh",
            },
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
            size="small"
          >
            <CloseIcon />
          </IconButton>

          {/* Sidebar content */}
          <Box sx={{ mt: 4, pl: 1, pr: 3 }}>
            <SidebarFilter />
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default ListingsPage;
