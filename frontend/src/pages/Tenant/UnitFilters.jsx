// src/components/PropertyFilters.jsx
import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  InputAdornment,
  Slider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const categories = ["Apartment", "Single Room", "Bedsitter", "Bungalow"];

export default function PropertyFilters({ filters, onChange, onApply, onReset }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const inputStyles = {
    bgcolor: "#f9f9f9",
    borderRadius: 2,
    "& fieldset": { borderColor: "#ddd" },
    "&:hover fieldset": { borderColor: "#c59000" },
    "& .MuiInputBase-input": { padding: "10px 12px" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: isMobile ? 2 : 3,
        mb: 4,
        bgcolor: "#fff",
        borderRadius: 3,
        border: "1px solid #eee",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Title */}
      <Typography variant="h6" sx={{ fontWeight: 600, color: "#111" }}>
        Filter Units
      </Typography>

      {/* Search */}
      <TextField
        variant="outlined"
        size="small"
        value={filters.search}
        onChange={(e) => onChange("search", e.target.value)}
        placeholder="Search by location or name"
        fullWidth
        sx={inputStyles}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "action.active" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Category Chips */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={filters.category === cat ? "contained" : "outlined"}
            onClick={() =>
              onChange("category", filters.category === cat ? "" : cat)
            }
            sx={{
              textTransform: "none",
              fontWeight: 500,
              borderColor: "#f8b500",
              color: filters.category === cat ? "#fff" : "#111",
              bgcolor: filters.category === cat ? "#f8b500" : "transparent",
              "&:hover": {
                bgcolor: "#ffc62c",
                color: "#111",
              },
            }}
          >
            {cat}
          </Button>
        ))}
      </Box>

      {/* Price Slider */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Price Range
        </Typography>

        {/* Display selected min and max */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="caption">
            Ksh {filters.price ? filters.price[0].toLocaleString() : 0}
          </Typography>
          <Typography variant="caption">
            Ksh {filters.price ? filters.price[1].toLocaleString() : 100000}
          </Typography>
        </Box>

        <Slider
          value={filters.price || [0, 50000]}
          onChange={(e, newValue) => onChange("price", newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={100000}
          step={5000}
          sx={{ color: "#f8b500" }}
        />
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          flexWrap: isMobile ? "wrap" : "nowrap",
          justifyContent: "flex-end",
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          fullWidth={isMobile}
          startIcon={<FilterAltIcon />}
          sx={{
            bgcolor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            textTransform: "none",
            px: 3,
            boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#ffc62c",
              boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
            },
          }}
          onClick={onApply}
        >
          Apply Filters
        </Button>

        <Button
          variant="outlined"
          fullWidth={isMobile}
          startIcon={<RestartAltIcon />}
          sx={{
            color: "#111",
            borderColor: "#f8b500",
            fontWeight: 600,
            textTransform: "none",
            px: 3,
            borderRadius: 2,
            "&:hover": {
              borderColor: "#c59000",
              color: "#c59000",
              backgroundColor: "rgba(255,198,44,0.05)",
            },
          }}
          onClick={onReset}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}
