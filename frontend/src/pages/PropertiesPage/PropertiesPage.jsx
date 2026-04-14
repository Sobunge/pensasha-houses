// src/pages/PropertiesPage/PropertiesPage.jsx
import React, { useMemo, useState } from "react";
import { 
  Box, Typography, Button, Grid, Container, Stack, 
  useMediaQuery, useTheme, Pagination, CircularProgress 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";

// Components & Context
import PropertyInfoCard from "../../components/cards/PropertyInfoCard";
import AddPropertyDialog from "../../pages/PropertiesPage/AddPropertyDialog";
import { useAuth } from "../Auth/AuthContext";
import { useProperties } from "../../components/hooks/useProperties";

function PropertiesPage() {
  const { activeRole, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // --- UI State ---
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 4;

  // --- Data Fetching via Hook ---
  // Added 'refresh' to trigger a re-fetch after a new property is created
  const { properties, totalPages, loading, error, refresh } = useProperties(
    activeRole, 
    user?.id, 
    page, 
    itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddSuccess = () => {
    setIsDialogOpen(false);
    refresh(); // Refresh the data without reloading the entire page
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
      case 'ADMIN': return { title: "Global Portfolio", sub: "Full system oversight." };
      case 'LANDLORD': return { title: "My Properties", sub: "Manage your assets." };
      case 'CARETAKER': return { title: "Assigned Units", sub: "Managed properties." };
      default: return { title: "My Rental Units", sub: "Overview of your lease." };
    }
  }, [activeRole]);

  const canAddProperty = ['ADMIN', 'LANDLORD'].includes(activeRole?.toUpperCase());

  return (
    <Box sx={{ minHeight: "85vh", display: "flex", flexDirection: "column", bgcolor: "#fcfcfc" }}>
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
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsDialogOpen(true)}
              sx={{ 
                bgcolor: "#111", 
                color: "#fff", 
                fontWeight: 800, 
                borderRadius: 2, 
                px: 3, 
                py: 1.2, 
                textTransform: 'none', 
                '&:hover': { bgcolor: "#333" } 
              }}
            >
              Add Property
            </Button>
          )}
        </Stack>

        {/* CONTENT AREA */}
        {loading ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#f8b500" }} />
            <Typography sx={{ mt: 2, fontWeight: 600 }}>Loading properties...</Typography>
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography color="error" variant="h6">{error}</Typography>
            <Button onClick={() => refresh()} sx={{ mt: 2 }}>Retry</Button>
          </Box>
        ) : properties.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <HomeWorkOutlinedIcon sx={{ fontSize: 70, color: "#f8b500", mb: 2, opacity: 0.8 }} />
            <Typography variant="h6" fontWeight={800}>No properties found</Typography>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {properties.map((property) => (
              <Grid item xs={12} sm={6} lg={3} key={property.id} sx={{ display: "flex", justifyContent: "center" }}>
                <PropertyInfoCard 
                    property={property} 
                    statusColor={getStatusColor(property.rentStatus || "pending")} 
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* PAGINATION SECTION */}
      {totalPages > 1 && (
        <Box sx={{ py: 4, display: "flex", justifyContent: "center", borderTop: "1px solid #eee", bgcolor: "#fff" }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            sx={{
              '& .Mui-selected': { bgcolor: "#f8b500 !important", color: "#111" },
              '& .MuiPaginationItem-root': { fontWeight: 700 }
            }}
          />
        </Box>
      )}

      {/* ADD PROPERTY DIALOG COMPONENT */}
      <AddPropertyDialog 
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleAddSuccess}
        userId={user?.id}
      />
    </Box>
  );
}

export default PropertiesPage;