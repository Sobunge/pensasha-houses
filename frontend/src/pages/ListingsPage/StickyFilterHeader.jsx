// src/components/StickyFilterHeader.jsx
import React from "react";
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Badge,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Chip,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";

const CATEGORIES = ["All", "Apartments", "Houses", "Shops & Commercial", "Offices"];

export default function StickyFilterHeader({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onOpenDrawer,
  activeFilterCount = 0,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 16,
        zIndex: 10,
        bgcolor: "#FFFFFF",
        p: 2,
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(15, 23, 42, 0.08)",
        border: `1px solid ${theme.palette.divider}`,
        mb: 4,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Location / Keyword Search */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search neighborhood or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#F8FAFC",
              },
            }}
          />
        </Grid>

        {/* Sort Dropdown */}
        <Grid item xs={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ borderRadius: "10px", backgroundColor: "#F8FAFC" }}
            >
              <MenuItem value="newest">Newest Listed</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* More Filters Trigger & View Switcher */}
        <Grid item xs={6} md={5} sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={
              <Badge badgeContent={activeFilterCount} color="error">
                <FilterListIcon fontSize="small" />
              </Badge>
            }
            onClick={onOpenDrawer}
            sx={{
              borderRadius: "10px",
              borderColor: theme.palette.divider,
              color: theme.palette.text.primary,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Filters
          </Button>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, val) => val && setViewMode(val)}
            size="small"
            sx={{ bgcolor: "#F8FAFC" }}
          >
            <ToggleButton value="grid" aria-label="grid view">
              <GridViewIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>

      {/* Quick Category Chips */}
      <Stack direction="row" spacing={1} sx={{ mt: 2, overflowX: "auto", pb: 0.5 }}>
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            clickable
            onClick={() => setSelectedCategory(cat)}
            sx={{
              fontWeight: 600,
              fontSize: "0.85rem",
              borderRadius: "8px",
              bgcolor: selectedCategory === cat ? "#0F172A" : "#F1F5F9",
              color: selectedCategory === cat ? "#FFFFFF" : theme.palette.text.primary,
              "&:hover": {
                bgcolor: selectedCategory === cat ? "#0F172A" : "#E2E8F0",
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
 