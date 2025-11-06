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
  useMediaQuery,
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

const SidebarFilter = ({ onFilter, onCloseDrawer }) => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [priceRange, setPriceRange] = useState([10000, 1000000]);
  const [sizeRange, setSizeRange] = useState([0, 1000]);
  const [open, setOpen] = useState(true);

  const isMobile = useMediaQuery("(max-width:599px)");
  const fontStyle = { fontSize: isMobile ? "0.75rem" : "0.85rem", fontWeight: 500 };

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
        maxWidth: 270,
        pl: { xs: 1, sm: 2 },
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
        borderRadius: 3,
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        p: 2,
      }}
    >
      {/* Header */}
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, ...fontStyle, display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <FilterAltIcon fontSize="small" sx={{ color: "#f8b500" }} />
            Filters
          </Typography>
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        {/* Active Chips */}
        {activeChips.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mb: 1 }}>
            {activeChips.map((chip, i) => (
              <Chip
                key={i}
                label={chip.label}
                size="small"
                sx={{ ...fontStyle, borderRadius: 1.5, bgcolor: "#f0f0f0", "&:hover": { bgcolor: "#e0e0e0" } }}
              />
            ))}
            <Chip
              icon={<ClearAllIcon fontSize="small" />}
              label="Clear All"
              size="small"
              onClick={handleClear}
              sx={{ ...fontStyle, borderRadius: 1.5, bgcolor: "#ffe5e5", "&:hover": { bgcolor: "#ffc2c2" } }}
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
              label="Category"
              sx={fontStyle}
            >
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat} sx={fontStyle}>
                  {cat}
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
                label="Property Type"
                sx={fontStyle}
              >
                <MenuItem value="">
                  <em>Select Type</em>
                </MenuItem>
                {types[category].map((t) => (
                  <MenuItem key={t} value={t} sx={fontStyle}>
                    {t}
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
              startAdornment: <InputAdornment position="start"><LocationOnIcon fontSize="small" /></InputAdornment>,
            }}
          />

          {/* Bedrooms & Bathrooms */}
          {category === "Residential" && (
            <>
              <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                <InputLabel sx={fontStyle}>Bedrooms</InputLabel>
                <Select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} label="Bedrooms" sx={fontStyle}>
                  <MenuItem value="">
                    <em>Any</em>
                  </MenuItem>
                  {bedOptions.map((b) => (
                    <MenuItem key={b} value={b} sx={fontStyle}>
                      {b}+
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                <InputLabel sx={fontStyle}>Bathrooms</InputLabel>
                <Select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} label="Bathrooms" sx={fontStyle}>
                  <MenuItem value="">
                    <em>Any</em>
                  </MenuItem>
                  {bathOptions.map((b) => (
                    <MenuItem key={b} value={b} sx={fontStyle}>
                      {b}+
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          {/* Price */}
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
              sx={{ "& .MuiSlider-thumb": { bgcolor: "#f8b500" }, "& .MuiSlider-track": { bgcolor: "#ffc62c" } }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", ...fontStyle }}>
              <span>{priceRange[0].toLocaleString()}</span>
              <span>{priceRange[1].toLocaleString()}</span>
            </Box>
          </Box>

          {/* Size */}
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
              sx={{ "& .MuiSlider-thumb": { bgcolor: "#f8b500" }, "& .MuiSlider-track": { bgcolor: "#ffc62c" } }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", ...fontStyle }}>
              <span>{sizeRange[0]} sqm</span>
              <span>{sizeRange[1]} sqm</span>
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* Buttons */}
      <Box sx={{ mt: 1 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleApply}
          startIcon={<FilterAltIcon />}
          sx={{
            ...fontStyle,
            background: "linear-gradient(45deg, #f8b500, #ffc62c)",
            color: "#111",
            fontWeight: 600,
            textTransform: "none",
            mb: 1,
            py: 1,
            borderRadius: "8px",
            "&:hover": { background: "linear-gradient(45deg, #ffc62c, #f8b500)" },
          }}
        >
          Apply
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleClear}
          startIcon={<ClearAllIcon />}
          sx={{
            ...fontStyle,
            textTransform: "none",
            py: 1,
            borderRadius: "8px",
            borderColor: "#f8b500",
            color: "#f8b500",
            "&:hover": { backgroundColor: "#fff0c2", borderColor: "#ffc62c" },
          }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default SidebarFilter;
