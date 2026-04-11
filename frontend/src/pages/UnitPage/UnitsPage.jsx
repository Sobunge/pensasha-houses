import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Button, TextField, InputAdornment, 
  Tabs, Tab, Card, Grid, Pagination 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import UnitCard from "../../components/cards/UnitCard";

const sampleUnits = [
  { id: 101, unitNumber: "A-101", type: "2 Bedroom", status: "Occupied", tenant: "Alice W.", property: "Sunrise Apartments" },
  { id: 102, unitNumber: "A-102", type: "Studio", status: "Vacant", tenant: null, property: "Sunrise Apartments" },
  { id: 201, unitNumber: "B-201", type: "1 Bedroom", status: "Maintenance", tenant: null, property: "Pensasha Towers" },
  { id: 103, unitNumber: "A-103", type: "3 Bedroom", status: "Occupied", tenant: "Bob O.", property: "Sunrise Apartments" },
  { id: 104, unitNumber: "A-104", type: "2 Bedroom", status: "Vacant", tenant: null, property: "Sunrise Apartments" },
  { id: 301, unitNumber: "C-301", type: "Penthouse", status: "Occupied", tenant: "Charlie D.", property: "Skyline Views" },
  { id: 302, unitNumber: "C-302", type: "Studio", status: "Occupied", tenant: "Daisy M.", property: "Skyline Views" },
  { id: 303, unitNumber: "C-303", type: "2 Bedroom", status: "Maintenance", tenant: null, property: "Skyline Views" },
];

function UnitsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setPage(1);
  }, [searchTerm, tabValue]);

  const filteredUnits = sampleUnits.filter((unit) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      unit.unitNumber.toLowerCase().includes(searchLower) ||
      (unit.tenant && unit.tenant.toLowerCase().includes(searchLower)) ||
      unit.property.toLowerCase().includes(searchLower);

    const unitStatus = unit.status.toLowerCase();
    let matchesTab = false;
    
    if (tabValue === 0) matchesTab = true; 
    else if (tabValue === 1) matchesTab = unitStatus === "vacant";
    else if (tabValue === 2) matchesTab = unitStatus === "occupied";
    else if (tabValue === 3) matchesTab = unitStatus === "maintenance";

    return matchesSearch && matchesTab;
  });

  const count = Math.ceil(filteredUnits.length / itemsPerPage);
  const currentData = filteredUnits.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box 
      sx={{ 
        pb: 5, 
        maxWidth: "1200px", 
        mx: "auto", 
        px: { xs: 2, sm: 3 },
        minHeight: "80vh" // Ensures the page occupies most of the screen even if empty
      }}
    >
      {/* Header Area */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}>
            Units Inventory
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Showing {filteredUnits.length} total units
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#f8b500", color: "#111", fontWeight: 700, borderRadius: 2, px: 3, "&:hover": { bgcolor: "#e0a400" } }}
        >
          Add New Unit
        </Button>
      </Box>

      {/* Filters Card */}
      <Card sx={{ p: 1.5, mb: 4, borderRadius: 3, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <TextField
          size="small"
          placeholder="Search unit, tenant, or property..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: "250px" }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#f8b500" }} /></InputAdornment>,
          }}
        />
        <Tabs 
          value={tabValue} 
          onChange={(e, v) => setTabValue(v)} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ "& .MuiTabs-indicator": { bgcolor: "#f8b500" } }}
        >
          <Tab label="All Units" sx={{ textTransform: "none", fontWeight: 600 }} />
          <Tab label="Vacant" sx={{ textTransform: "none", fontWeight: 600 }} />
          <Tab label="Occupied" sx={{ textTransform: "none", fontWeight: 600 }} />
          <Tab label="Maintenance" sx={{ textTransform: "none", fontWeight: 600 }} />
        </Tabs>
      </Card>

      {/* Results Area with Min Height to prevent footer-jump */}
      <Box sx={{ minHeight: "500px" }}> 
        <Grid container spacing={3} justifyContent="center">
          {currentData.length > 0 ? (
            currentData.map((unit) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={unit.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <UnitCard unit={unit} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", py: 10, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 4, border: "2px dashed #eee" }}>
                <HomeWorkOutlinedIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
                <Typography variant="h6" sx={{ color: "#999" }}>No units found</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Pagination Controls */}
      {count > 1 && (
        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <Pagination 
            count={count} 
            page={page} 
            onChange={handlePageChange} 
            sx={{
              "& .MuiPaginationItem-root": { fontWeight: 700 },
              "& .Mui-selected": { bgcolor: "#f8b500 !important", color: "#111" }
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default UnitsPage;