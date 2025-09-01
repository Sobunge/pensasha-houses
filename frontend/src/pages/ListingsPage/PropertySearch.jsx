import React, { useState } from "react";
import { Box, TextField, Button, Stack, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const propertyTypes = [
  { value: "", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "house", label: "House" },
];

export default function PropertySearch({ onSearch }) {
  const [searchData, setSearchData] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchData);
  };

  const handleReset = () => {
    setSearchData({ location: "", type: "", minPrice: "", maxPrice: "" });
    onSearch?.({ location: "", type: "", minPrice: "", maxPrice: "" });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        mb: 5,
        p: { xs: 2, md: 0 },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="flex-start"
      >
        {/* Group 1: Location & Type */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} flex={1}>
          <TextField
            name="location"
            label="Location"
            placeholder="City or neighborhood"
            value={searchData.location}
            onChange={handleChange}
            size="small"
            fullWidth
          />

          <TextField
            select
            name="type"
            label="Property Type"
            value={searchData.type}
            onChange={handleChange}
            size="small"
            sx={{ minWidth: 150 }}
          >
            {propertyTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {/* Group 2: Price */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} flex={1}>
          <TextField
            name="minPrice"
            label="Min Price"
            type="number"
            placeholder="Ksh"
            value={searchData.minPrice}
            onChange={handleChange}
            size="small"
            sx={{ minWidth: 120 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">Ksh</InputAdornment>,
            }}
          />

          <TextField
            name="maxPrice"
            label="Max Price"
            type="number"
            placeholder="Ksh"
            value={searchData.maxPrice}
            onChange={handleChange}
            size="small"
            sx={{ minWidth: 120 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">Ksh</InputAdornment>,
            }}
          />
        </Stack>

        {/* Buttons */}
        <Stack direction="row" spacing={1}>
          {/* Search Button */}
          <Button
            type="submit"
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              bgcolor: "#1976d2", // Blue
              color: "#fff",
              py: 1.2,
              minWidth: 120,
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#115293" }, // Darker blue on hover
            }}
          >
            Search
          </Button>

          {/* Reset Button */}
          <Button
            type="button"
            variant="contained"
            startIcon={<ClearIcon />}
            onClick={handleReset}
            sx={{
              bgcolor: "#ff7043", // Coral / reddish-orange
              color: "#fff",
              py: 1.2,
              minWidth: 120,
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#f4511e" }, // Darker coral on hover
            }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
