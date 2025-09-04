import React from "react";
import { Stack, TextField, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function MessageFilters({ filters, onFilterChange }) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
      {/* Search */}
      <TextField
        placeholder="Search messages..."
        size="small"
        value={filters.search}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: "#c59000" }} /> }}
        sx={{ bgcolor: "#fff", borderRadius: 2, flex: 1 }}
      />

      {/* Status filter */}
      <TextField
        select
        size="small"
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        label="Status"
        sx={{ bgcolor: "#fff", borderRadius: 2, width: 180 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Unread">Unread</MenuItem>
        <MenuItem value="Read">Read</MenuItem>
      </TextField>
    </Stack>
  );
}

export default MessageFilters;
