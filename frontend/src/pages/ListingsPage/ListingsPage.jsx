import React, { useState } from "react";
import { Box, Grid, Drawer, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SidebarFilter from "./SidebarFilter";

const ListingsPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <Box sx={{ mt: { xs: 8, md: 0 }, px: { xs: 2, md: 4 }, pb: 6 }}>
      {/* Mobile filter button */}
      <Box sx={{ display: { xs: "block", md: "none" }, mb: 2 }}>
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

      <Grid container spacing={3}>
        {/* Desktop sidebar */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "sticky",
              top: 120,
            }}
          >
            <SidebarFilter />
          </Box>
        </Grid>

        {/* Listings */}
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 3,
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
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 240, // fits nicely
            height: "100vh",
            overflowY: "auto",
            position: "relative",
            p: 1,
          }}
        >
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ mt: 4 }}>
            <SidebarFilter />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ListingsPage;
