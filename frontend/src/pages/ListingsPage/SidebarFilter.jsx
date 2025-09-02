import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Divider,
  TextField,
  Chip,
  Stack,
  Collapse,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  FilterAlt as FilterAltIcon,
  ClearAll as ClearAllIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationOnIcon,
  AttachMoney as AttachMoneyIcon,
  SquareFoot as SquareFootIcon,
} from "@mui/icons-material";

const propertyCategories = ["Residential", "Commercial", "Office", "Shop", "Land"];
const propertyTypes = {
  Residential: ["Apartment", "House", "Townhouse", "Studio"],
  Commercial: ["Warehouse", "Retail", "Building"],
  Office: ["Private Office", "Shared Office", "Co-working Space"],
  Shop: ["Retail Shop", "Kiosk", "Storefront"],
  Land: ["Plot", "Agricultural", "Industrial"],
};
const bedOptions = [1, 2, 3, 4, 5];
const bathOptions = [1, 2, 3, 4];

const SidebarFilter = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [priceRange, setPriceRange] = useState([10000, 1000000]);
  const [sizeRange, setSizeRange] = useState([0, 1000]);
  const [open, setOpen] = useState(true);

  const fontStyle = { fontSize: "0.8rem", fontWeight: 500 }; // smaller font for mobile

  const handleApplyFilters = () =>
    onFilter?.({ category, type, location, bedrooms, bathrooms, priceRange, sizeRange });

  const handleClearFilters = () => {
    setCategory("");
    setType("");
    setLocation("");
    setBedrooms("");
    setBathrooms("");
    setPriceRange([10000, 1000000]);
    setSizeRange([0, 1000]);
    onFilter?.({});
  };

  const activeChips = [
    category && { label: category },
    type && { label: type },
    location && { label: location },
    bedrooms && { label: `${bedrooms}+ Beds` },
    bathrooms && { label: `${bathrooms}+ Baths` },
  ].filter(Boolean);

  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 1, sm: 2 }, // smaller padding for mobile drawer
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, ...fontStyle }}>
            <FilterAltIcon fontSize="small" sx={{ mr: 0.5, color: "#f8b500" }} />
            Filters
          </Typography>
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        </Box>

        {activeChips.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mb: 1 }}>
            {activeChips.map((chip, i) => (
              <Chip key={i} label={chip.label} size="small" sx={{ ...fontStyle }} />
            ))}
            <Chip
              icon={<ClearAllIcon fontSize="small" />}
              label="Clear All"
              size="small"
              onClick={handleClearFilters}
              sx={{ ...fontStyle }}
            />
          </Stack>
        )}

        <Collapse in={open}>
          <Divider sx={{ mb: 1 }} />

          {/* Category */}
          <FormControl fullWidth size="small" sx={{ mb: 1 }}>
            <InputLabel sx={fontStyle}>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setType("");
                setBedrooms("");
                setBathrooms("");
              }}
              sx={{ ...fontStyle, width: "100%" }}
            >
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>
              {propertyCategories.map((option) => (
                <MenuItem key={option} value={option} sx={fontStyle}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Property Type */}
          {category && (
            <FormControl fullWidth size="small" sx={{ mb: 1 }}>
              <InputLabel sx={fontStyle}>Property Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                sx={{ ...fontStyle, width: "100%" }}
              >
                <MenuItem value="">
                  <em>Select Type</em>
                </MenuItem>
                {propertyTypes[category].map((option) => (
                  <MenuItem key={option} value={option} sx={fontStyle}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Location */}
          <TextField
            label="Location"
            placeholder="Enter location"
            variant="outlined"
            size="small"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ mb: 1, ...fontStyle }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* Bedrooms & Bathrooms */}
          {category === "Residential" && (
            <>
              <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                <InputLabel sx={fontStyle}>Bedrooms</InputLabel>
                <Select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} sx={{ ...fontStyle, width: "100%" }}>
                  <MenuItem value="">
                    <em>Any</em>
                  </MenuItem>
                  {bedOptions.map((num) => (
                    <MenuItem key={num} value={num} sx={fontStyle}>
                      {num}+
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                <InputLabel sx={fontStyle}>Bathrooms</InputLabel>
                <Select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} sx={{ ...fontStyle, width: "100%" }}>
                  <MenuItem value="">
                    <em>Any</em>
                  </MenuItem>
                  {bathOptions.map((num) => (
                    <MenuItem key={num} value={num} sx={fontStyle}>
                      {num}+
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          {/* Price Range */}
          <Box sx={{ mb: 1 }}>
            <Typography gutterBottom sx={{ fontWeight: 600, ...fontStyle }}>
              Price (Ksh) <AttachMoneyIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Typography>
            <Slider
              value={priceRange}
              onChange={(e, val) => setPriceRange(val)}
              valueLabelDisplay="auto"
              step={10000}
              min={10000}
              max={5000000}
              size="small"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", ...fontStyle }}>
              <span>{priceRange[0].toLocaleString()}</span>
              <span>{priceRange[1].toLocaleString()}</span>
            </Box>
          </Box>

          {/* Size Range */}
          <Box sx={{ mb: 1 }}>
            <Typography gutterBottom sx={{ fontWeight: 600, ...fontStyle }}>
              Size (sqm) <SquareFootIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Typography>
            <Slider
              value={sizeRange}
              onChange={(e, val) => setSizeRange(val)}
              valueLabelDisplay="auto"
              step={10}
              min={0}
              max={5000}
              size="small"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", ...fontStyle }}>
              <span>{sizeRange[0]} sqm</span>
              <span>{sizeRange[1]} sqm</span>
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* Buttons */}
      <Box>
        <Button
          fullWidth
          variant="contained"
          onClick={handleApplyFilters}
          startIcon={<FilterAltIcon />}
          sx={{
            ...fontStyle,
            backgroundColor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            textTransform: "none",
            mb: 1,
            py: 0.7,
            borderRadius: "8px",
          }}
        >
          Apply
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleClearFilters}
          startIcon={<ClearAllIcon />}
          sx={{
            ...fontStyle,
            textTransform: "none",
            py: 0.7,
            borderRadius: "8px",
          }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default SidebarFilter;
