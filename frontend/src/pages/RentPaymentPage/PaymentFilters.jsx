import React from "react";
import { Stack, TextField, MenuItem, Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";

function PaymentFilters({ filters, onChange, onReset }) {
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
        placeholder="Search by month or invoice..."
        size="small"
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: "#c59000" }} />,
        }}
        sx={{ bgcolor: "#fff", borderRadius: 2, flex: 1 }}
      />

      {/* Status */}
      <TextField
        select
        name="status"
        value={filters.status}
        onChange={onChange}
        label="Status"
        size="small"
        sx={{ bgcolor: "#fff", borderRadius: 2, flex: 1 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Paid">Paid</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Overdue">Overdue</MenuItem>
      </TextField>

      {/* Method */}
      <TextField
        select
        name="method"
        value={filters.method}
        onChange={onChange}
        label="Method"
        size="small"
        sx={{ bgcolor: "#fff", borderRadius: 2, flex: 1 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Mpesa">Mpesa</MenuItem>
        <MenuItem value="Bank">Bank</MenuItem>
        <MenuItem value="Cash">Cash</MenuItem>
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
          alignSelf: { xs: "stretch", md: "center" },
          "&:hover": { bgcolor: "#ffc62c" },
        }}
        onClick={onReset}
      >
        Reset
      </Button>
    </Stack>
  );
}

export default PaymentFilters;
