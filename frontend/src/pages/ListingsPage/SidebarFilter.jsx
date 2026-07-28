// src/components/SidebarFilter.jsx
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
  Close as CloseIcon,
} from "@mui/icons-material";

const SidebarFilter = ({ onFilter, onCloseDrawer }) => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [priceRange, setPriceRange] = useState([20000, 500000]);
  const [sizeRange, setSizeRange] = useState([0, 2000]);
  const [open, setOpen] = useState(true);

  // Theme Constants
  const clrDark = "#0F172A"; // Dark Navy
  const clrGold = "#D4AF37"; // Primary Gold
  const clrGoldHover = "#B5922B"; // Darker Gold
  const clrBg = "#F8FAFC"; // Light Gray/Blue Bg
  const clrTextSec = "#64748B"; // Slate Secondary Text

  const labelStyle = {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: clrDark,
    mb: 1,
    display: "flex",
    alignItems: "center",
    gap: 0.75,
  };

  const inputStyle = {
    fontSize: "0.9rem",
    color: clrDark,
    bgcolor: "#FFFFFF",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E2E8F0",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: clrGold,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: clrGoldHover,
    },
  };

  const categories = ["Residential", "Commercial", "Office", "Shop", "Land"];
  const types = {
    Residential: ["Apartment", "House", "Townhouse", "Studio"],
    Commercial: ["Warehouse", "Retail", "Building"],
    Office: ["Private Office", "Shared Office", "Co-working Space"],
    Shop: ["Retail Shop", "Kiosk", "Storefront"],
    Land: ["Plot", "Agricultural", "Industrial"],
  };
  const bedOptions = [1, 2, 3, 4, 5];
  const bathOptions = [1, 2, 3, 4];

  const handleApply = () => {
    onFilter?.({ category, type, location, bedrooms, bathrooms, priceRange, sizeRange });
    onCloseDrawer?.(); // closes drawer if present
  };

  const handleClear = () => {
    setCategory("");
    setType("");
    setLocation("");
    setBedrooms("");
    setBathrooms("");
    setPriceRange([20000, 500000]);
    setSizeRange([0, 2000]);
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
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        border: `1px solid ${clrGold}`,
        boxShadow: "0 10px 30px -5px rgba(212, 175, 55, 0.1)",
        p: { xs: 2, sm: 2.5 },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: activeChips.length > 0 ? 1.5 : 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: activeChips.length > 0 ? 1 : 0 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              color: clrDark,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            <FilterAltIcon fontSize="small" sx={{ color: clrGold }} />
            Advanced Filters
          </Typography>
          <IconButton onClick={() => setOpen(!open)} size="small" sx={{ color: clrTextSec }}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        {/* Active Chips */}
        {activeChips.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
            {activeChips.map((chip, i) => (
              <Chip
                key={i}
                label={chip.label}
                size="small"
                onDelete={() => {
                  // Simplified delete logic - could be expanded to clear specific filter state
                  if (i === 0) setCategory(""); 
                  // ...etc
                }}
                deleteIcon={<CloseIcon sx={{ fontSize: '0.8rem !important', color: clrDark }} />}
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  borderRadius: "6px",
                  bgcolor: clrBg,
                  color: clrDark,
                  border: `1px solid #E2E8F0`,
                  "&:hover": { bgcolor: "#E2E8F0" },
                }}
              />
            ))}
            <Chip
              icon={<ClearAllIcon fontSize="small" style={{ color: '#FFFFFF' }} />}
              label="Clear"
              size="small"
              onClick={handleClear}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                borderRadius: "6px",
                bgcolor: clrDark,
                color: "#FFFFFF",
                "&:hover": { bgcolor: "#1E293B" },
                "& .MuiChip-icon": { color: '#FFFFFF' }
              }}
            />
          </Stack>
        )}
      </Box>

      <Collapse in={open}>
        <Divider sx={{ borderColor: "#F1F5F9", mb: 2.5 }} />
        <Stack spacing={2.5}>
          {/* Category */}
          <FormControl fullWidth size="small">
            <Typography variant="caption" sx={labelStyle}>Category</Typography>
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setType("");
                setBedrooms("");
                setBathrooms("");
              }}
              displayEmpty
              sx={inputStyle}
            >
              <MenuItem value="" sx={{ color: clrTextSec }}>
                <em>All Categories</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat} sx={{ fontSize: "0.9rem" }}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Property Type */}
          {category && (
            <FormControl fullWidth size="small">
              <Typography variant="caption" sx={labelStyle}>Property Type</Typography>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                displayEmpty
                sx={inputStyle}
              >
                <MenuItem value="" sx={{ color: clrTextSec }}>
                  <em>All Types</em>
                </MenuItem>
                {types[category].map((t) => (
                  <MenuItem key={t} value={t} sx={{ fontSize: "0.9rem" }}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Location */}
          <Box>
            <Typography variant="caption" sx={labelStyle}>Location</Typography>
            <TextField
              placeholder="Enter City or Estate"
              variant="outlined"
              size="small"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={inputStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon fontSize="small" sx={{ color: clrGold }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Bedrooms & Bathrooms */}
          {category === "Residential" && (
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth size="small">
                <Typography variant="caption" sx={labelStyle}>Beds</Typography>
                <Select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  displayEmpty
                  sx={inputStyle}
                >
                  <MenuItem value="" sx={{ color: clrTextSec }}><em>Any</em></MenuItem>
                  {bedOptions.map((b) => (
                    <MenuItem key={b} value={b} sx={{ fontSize: "0.9rem" }}>{b}+</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <Typography variant="caption" sx={labelStyle}>Baths</Typography>
                <Select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  displayEmpty
                  sx={inputStyle}
                >
                  <MenuItem value="" sx={{ color: clrTextSec }}><em>Any</em></MenuItem>
                  {bathOptions.map((b) => (
                    <MenuItem key={b} value={b} sx={{ fontSize: "0.9rem" }}>{b}+</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          )}

          {/* Price */}
          <Box>
            <Typography sx={labelStyle}>
              Price Range (Ksh) <AttachMoneyIcon fontSize="small" sx={{ color: clrGold }} />
            </Typography>
            <Slider
              value={priceRange}
              onChange={(e, val) => setPriceRange(val)}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => v.toLocaleString()}
              step={10000}
              min={10000}
              max={2000000}
              size="small"
              sx={{
                color: clrGold,
                "& .MuiSlider-thumb": {
                  bgcolor: "#FFFFFF",
                  border: `2px solid ${clrGold}`,
                  "&:hover": { boxShadow: `0 0 0 8px rgba(212, 175, 55, 0.16)` },
                },
                "& .MuiSlider-track": { bgcolor: clrGold, border: "none" },
                "& .MuiSlider-rail": { bgcolor: "#E2E8F0" },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: clrTextSec, fontWeight: 500 }}>
              <span>{priceRange[0].toLocaleString()}</span>
              <span>{priceRange[1].toLocaleString()}+</span>
            </Box>
          </Box>

          {/* Size */}
          <Box>
            <Typography sx={labelStyle}>
              Size (sqm) <SquareFootIcon fontSize="small" sx={{ color: clrGold }} />
            </Typography>
            <Slider
              value={sizeRange}
              onChange={(e, val) => setSizeRange(val)}
              valueLabelDisplay="auto"
              step={50}
              min={0}
              max={10000}
              size="small"
              sx={{
                color: clrGold,
                "& .MuiSlider-thumb": {
                  bgcolor: "#FFFFFF",
                  border: `2px solid ${clrGold}`,
                  "&:hover": { boxShadow: `0 0 0 8px rgba(212, 175, 55, 0.16)` },
                },
                "& .MuiSlider-track": { bgcolor: clrGold, border: "none" },
                "& .MuiSlider-rail": { bgcolor: "#E2E8F0" },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: clrTextSec, fontWeight: 500 }}>
              <span>{sizeRange[0]} sqm</span>
              <span>{sizeRange[1]} sqm+</span>
            </Box>
          </Box>
        </Stack>
        <Divider sx={{ borderColor: "#F1F5F9", mt: 3, mb: 2.5 }} />
      </Collapse>

      {/* Buttons */}
      <Stack spacing={1.5} sx={{ mt: open ? 0 : 1 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleApply}
          startIcon={<FilterAltIcon />}
          sx={{
            bgcolor: clrDark,
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: "0.9rem",
            textTransform: "none",
            py: 1.2,
            borderRadius: "10px",
            border: `1px solid ${clrDark}`,
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            "&:hover": {
              bgcolor: clrGoldHover,
              borderColor: clrGoldHover,
              color: "#FFFFFF",
            },
          }}
        >
          Apply Filters
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleClear}
          startIcon={<ClearAllIcon />}
          sx={{
            bgcolor: "#FFFFFF",
            color: clrTextSec,
            borderColor: "#E2E8F0",
            fontWeight: 600,
            fontSize: "0.9rem",
            textTransform: "none",
            py: 1.2,
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: clrBg,
              borderColor: clrGold,
              color: clrGoldHover,
            },
          }}
        >
          Reset All
        </Button>
      </Stack>
    </Box>
  );
};

export default SidebarFilter;