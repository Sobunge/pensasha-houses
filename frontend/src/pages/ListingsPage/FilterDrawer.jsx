// src/components/FilterDrawer.jsx
import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Slider,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function FilterDrawer({
  open,
  onClose,
  priceRange,
  setPriceRange,
  bedrooms,
  setBedrooms,
  amenities,
  setAmenities,
  onApply,
  onReset,
}) {
  const handleAmenityChange = (event) => {
    setAmenities({
      ...amenities,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "100vw", sm: 380 },
          p: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Filter Vacancies
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Scrollable Content */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
          {/* Price Range */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Price Range (Ksh)
            </Typography>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={5000}
              max={200000}
              step={5000}
              sx={{ color: "#0F172A" }}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Ksh {priceRange[0].toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Ksh {priceRange[1].toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {/* Bedrooms Selector */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
              Bedrooms
            </Typography>
            <ToggleButtonGroup
              value={bedrooms}
              exclusive
              onChange={(e, val) => val && setBedrooms(val)}
              size="small"
              fullWidth
            >
              {["Any", "1", "2", "3", "4+"].map((val) => (
                <ToggleButton key={val} value={val}>
                  {val}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* Key Amenities */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Amenities & Utilities
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={amenities.waterSupply}
                    onChange={handleAmenityChange}
                    name="waterSupply"
                    sx={{
                      "&.Mui-checked": { color: "#0F172A" },
                    }}
                  />
                }
                label="Borehole / 24-7 Water"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={amenities.parking}
                    onChange={handleAmenityChange}
                    name="parking"
                    sx={{
                      "&.Mui-checked": { color: "#0F172A" },
                    }}
                  />
                }
                label="Dedicated Parking"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={amenities.security}
                    onChange={handleAmenityChange}
                    name="security"
                    sx={{
                      "&.Mui-checked": { color: "#0F172A" },
                    }}
                  />
                }
                label="24/7 Security & CCTV"
              />
            </FormGroup>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} sx={{ pt: 2, borderTop: "1px solid #E2E8F0" }}>
          <Button fullWidth variant="outlined" onClick={onReset} color="inherit">
            Reset
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={onApply}
            sx={{ bgcolor: "#0F172A", color: "#FFF" }}
          >
            Apply Filters
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}