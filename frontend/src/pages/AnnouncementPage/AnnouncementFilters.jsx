import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";

function AnnouncementFilters({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (field, value) => {
    if (field === "search") {
      setSearch(value);
      onFilterChange({ search: value, category });
    } else if (field === "category") {
      setCategory(value);
      onFilterChange({ search, category: value });
    }
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      {/* Search box with icon */}
      <TextField
        label="Search announcements"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => handleChange("search", e.target.value)}
        sx={{
          flex: 1,
          bgcolor: "#fff",
          borderRadius: 2,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "action.active" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Category filter with icon */}
      <FormControl
        size="small"
        sx={{ minWidth: 180, bgcolor: "#fff", borderRadius: 2 }}
      >
        <InputLabel>
          <CategoryIcon sx={{ fontSize: 18, mr: 1, verticalAlign: "middle" }} />
          Category
        </InputLabel>
        <Select
          value={category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
          <MenuItem value="Rent">Rent</MenuItem>
          <MenuItem value="Events">Events</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

export default AnnouncementFilters;
