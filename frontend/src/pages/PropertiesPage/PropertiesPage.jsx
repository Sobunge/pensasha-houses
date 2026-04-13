// src/pages/PropertiesPage/PropertiesPage.jsx
import React, { useMemo, useState } from "react";
import { 
  Box, Typography, Button, Grid, Container, Stack, 
  useMediaQuery, useTheme, IconButton, Pagination 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";

// Components & Context
import PropertyInfoCard from "../../components/cards/PropertyInfoCard";
import { useAuth } from "../Auth/AuthContext";

function PropertiesPage() {
  const { activeRole } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // --- Pagination State ---
  const [page, setPage] = useState(1);
  const itemsPerPage = 4; // 🔥 Strictly 4 properties per page

  const properties = [
    { id: 1, name: "Sunrise Apartments", unit: "A-203", lease: "Jan 2024 – Dec 2024", rentAmount: "Ksh 12,000", rentStatus: "Pending" },
    { id: 2, name: "Pensasha Towers", unit: "B-105", lease: "Feb 2024 – Jan 2025", rentAmount: "Ksh 15,000", rentStatus: "Paid" },
    { id: 3, name: "Lakeview Residences", unit: "C-402", lease: "Mar 2024 – Feb 2025", rentAmount: "Ksh 18,000", rentStatus: "Pending" },
    { id: 4, name: "Garden Court", unit: "D-301", lease: "Apr 2024 – Mar 2025", rentAmount: "Ksh 14,000", rentStatus: "Paid" },
    { id: 5, name: "Sunset Heights", unit: "E-102", lease: "May 2024 – Apr 2025", rentAmount: "Ksh 13,500", rentStatus: "Pending" },
    { id: 6, name: "Victoria Court", unit: "F-501", lease: "Jun 2024 – May 2025", rentAmount: "Ksh 16,000", rentStatus: "Paid" },
  ];

  // Pagination Logic
  const pageCount = Math.ceil(properties.length / itemsPerPage);
  const currentItems = properties.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid": return "success";
      case "pending": return "warning";
      default: return "default";
    }
  };

  const roleContent = useMemo(() => {
    const role = activeRole?.toUpperCase();
    switch (role) {
      case 'ADMIN': return { title: "Global Portfolio", sub: "Full system oversight of all registered units." };
      case 'LANDLORD': return { title: "My Properties", sub: "Manage your assets and track occupancy status." };
      case 'CARETAKER': return { title: "Assigned Units", sub: "Properties under your direct daily management." };
      default: return { title: "My Rental Units", sub: "Overview of your current lease and payments." };
    }
  }, [activeRole]);

  const canAddProperty = ['ADMIN', 'LANDLORD', 'CARETAKER'].includes(activeRole?.toUpperCase());

  return (
    <Box 
      sx={{ 
        minHeight: "85vh", 
        display: "flex", 
        flexDirection: "column", 
        bgcolor: "#fcfcfc" 
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 }, flexGrow: 1 }}>
        
        {/* HEADER SECTION */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: { xs: 4, md: 6 } }}>
          <Box>
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight={900} sx={{ color: "#111", letterSpacing: "-1px" }}>
              {roleContent.title}
            </Typography>
            {!isMobile && (
              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, mt: 0.5 }}>
                {roleContent.sub}
              </Typography>
            )}
          </Box>

          {canAddProperty && (
            isMobile ? (
              <IconButton sx={{ bgcolor: "#f8b500", color: "#111", '&:hover': { bgcolor: "#e0a400" } }}>
                <AddIcon />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ bgcolor: "#111", color: "#fff", fontWeight: 800, borderRadius: 2, px: 3, py: 1.2, textTransform: 'none', '&:hover': { bgcolor: "#333" } }}
              >
                Add Property
              </Button>
            )
          )}
        </Stack>

        {/* CONTENT AREA */}
        {properties.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <HomeWorkOutlinedIcon sx={{ fontSize: 70, color: "#f8b500", mb: 2, opacity: 0.8 }} />
            <Typography variant="h6" fontWeight={800}>No properties found</Typography>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
            {currentItems.map((property) => (
              <Grid item xs={12} sm={6} lg={3} key={property.id} sx={{ display: "flex", justifyContent: "center" }}>
                <PropertyInfoCard property={property} statusColor={getStatusColor(property.rentStatus)} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* PAGINATION SECTION */}
      {pageCount > 1 && (
        <Box sx={{ py: 4, display: "flex", justifyContent: "center", borderTop: "1px solid #eee", bgcolor: "#fff" }}>
          <Pagination 
            count={pageCount} 
            page={page} 
            onChange={handlePageChange}
            sx={{
              '& .MuiPaginationItem-root': { fontWeight: 700 },
              '& .Mui-selected': { bgcolor: "#f8b500 !important", color: "#111" },
              '& .MuiPaginationItem-root:hover': { bgcolor: "rgba(248, 181, 0, 0.1)" }
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default PropertiesPage;