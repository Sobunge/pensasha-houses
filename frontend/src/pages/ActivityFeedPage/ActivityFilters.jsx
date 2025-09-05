// src/pages/ActivityFeed/ActivityFilters.jsx
import React from "react";
import {
  Stack,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";

function ActivityFilters({ filters, onChange, onReset }) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ mb: 2 }}
    >
      {/* Search */}
      <TextField
        name="search"
        value={filters.search}
        onChange={onChange}
        placeholder="Search activities..."
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#c59000" }} />
            </InputAdornment>
          ),
        }}
        sx={{ bgcolor: "#fff", borderRadius: 2, flex: 1 }}
      />

      {/* Type */}
      <TextField
        select
        name="type"
        value={filters.type}
        onChange={onChange}
        label="Type"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CategoryIcon sx={{ color: "#c59000" }} />
            </InputAdornment>
          ),
        }}
        sx={{ bgcolor: "#fff", borderRadius: 2, flex: 1 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Payment">Payment</MenuItem>
        <MenuItem value="Maintenance">Maintenance</MenuItem>
      </TextField>

      {/* Status */}
      <TextField
        select
        name="status"
        value={filters.status}
        onChange={onChange}
        label="Status"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MarkEmailUnreadIcon sx={{ color: "#c59000" }} />
            </InputAdornment>
          ),
        }}
        sx={{ bgcolor: "#fff", borderRadius: 2, flex: 1 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Unread">Unread</MenuItem>
        <MenuItem value="Read">Read</MenuItem>
      </TextField>

      {/* Reset */}
      <Button
        variant="contained"
        size="small"
        startIcon={<RestartAltIcon fontSize="small" />}
        sx={{
          bgcolor: "#f8b500",
          color: "#111111",
          fontWeight: 600,
          px: 2,
          py: 0.8,
          borderRadius: 2,
          width: { xs: "100%", md: "auto" }, // ✅ full width on mobile
          "&:hover": { bgcolor: "#ffc62c" },
        }}
        onClick={onReset}
      >
        Reset
      </Button>
    </Stack>
  );
}

export default ActivityFilters;
