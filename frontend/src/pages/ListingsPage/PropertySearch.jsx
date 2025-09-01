import React, { useState } from "react";
import { Box, TextField, Button, Stack, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{mt: 6, mb: 4, p: { xs: 2, md: 0 } }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        <TextField
          name="location"
          label="Location"
          placeholder="Enter city or neighborhood"
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
          fullWidth
        >
          {propertyTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="minPrice"
          label="Min Price"
          type="number"
          placeholder="Ksh"
          value={searchData.minPrice}
          onChange={handleChange}
          size="small"
          sx={{ maxWidth: 120 }}
        />

        <TextField
          name="maxPrice"
          label="Max Price"
          type="number"
          placeholder="Ksh"
          value={searchData.maxPrice}
          onChange={handleChange}
          size="small"
          sx={{ maxWidth: 120 }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#f8b500",
            color: "#111",
            py: 1.2,
            minWidth: 120,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#c59000" },
          }}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
}
