// src/pages/LandingPage/Hero.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import backgroundImage from "../../assets/background.jpg";

const PROPERTY_TYPES = [
  { value: "all", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "Stand-alone House" },
  { value: "studio", label: "Studio / Bedsitter" },
  { value: "commercial", label: "Commercial Space" },
];

const PRICE_RANGES = [
  { value: "all", label: "Any Price" },
  { value: "0-20000", label: "Under KES 20,000" },
  { value: "20000-50000", label: "KES 20,000 - 50,000" },
  { value: "50000-100000", label: "KES 50,000 - 100,000" },
  { value: "100000+", label: "KES 100,000+" },
];

function Hero() {
  const navigate = useNavigate();
  const [locationQuery, setLocationQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const handleSearch = () => {
    // Navigate to listings page with filter query params
    const params = new URLSearchParams();
    if (locationQuery) params.append("location", locationQuery);
    if (propertyType !== "all") params.append("type", propertyType);
    if (priceRange !== "all") params.append("price", priceRange);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        minHeight: { xs: "85vh", md: "93vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundImage: `linear-gradient(to bottom, rgba(11, 15, 23, 0.45) 0%, rgba(11, 15, 23, 0.85) 100%), radial-gradient(circle, rgba(11,15,23,0.2) 0%, rgba(11,15,23,0.8) 100%), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        py: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={4} alignItems="center" textAlign="center">
          
          {/* Subtle Tagline Badge */}
          <Chip
            label="REFINED LIVING & PROPERTY MANAGEMENT"
            sx={{
              backgroundColor: "rgba(212, 175, 55, 0.12)",
              color: "#D4AF37",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              px: 1,
              py: 0.5,
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Main Headline */}
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 600,
              fontSize: { xs: "2.4rem", sm: "3.5rem", md: "4.2rem" },
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: 900,
              textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            Discover Extraordinary Living
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              maxWidth: 680,
              fontSize: { xs: "1rem", md: "1.15rem" },
              color: "#94A3B8",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Pensasha connects clients with exceptional properties, simplifies management 
            for landlords, and delivers an uncompromised experience.
          </Typography>

          {/* Floating Glassmorphic Search Bar Widget */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 1000,
              mt: { xs: 2, md: 3 },
              p: { xs: 2, md: 2.5 },
              backgroundColor: "rgba(15, 23, 42, 0.65)",
              backdropFilter: "blur(20px)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems="center"
            >
              {/* Location Input */}
              <TextField
                fullWidth
                placeholder="Location (e.g. Kisumu, Westlands)"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnOutlinedIcon sx={{ color: "#D4AF37" }} />
                    </InputAdornment>
                  ),
                }}
                sx={fieldStyles}
              />

              {/* Property Type Dropdown */}
              <TextField
                select
                fullWidth
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeOutlinedIcon sx={{ color: "#D4AF37" }} />
                    </InputAdornment>
                  ),
                }}
                sx={fieldStyles}
              >
                {PROPERTY_TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* Price Range Dropdown */}
              <TextField
                select
                fullWidth
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyOutlinedIcon sx={{ color: "#D4AF37" }} />
                    </InputAdornment>
                  ),
                }}
                sx={fieldStyles}
              >
                {PRICE_RANGES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* Search CTA Button */}
              <Button
                variant="contained"
                onClick={handleSearch}
                startIcon={<SearchIcon />}
                sx={{
                  width: { xs: "100%", md: "auto" },
                  minWidth: 160,
                  height: 54,
                  px: 4,
                  backgroundColor: "#D4AF37",
                  color: "#0B0F17",
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderRadius: "10px",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 14px rgba(212, 175, 55, 0.3)",
                  "&:hover": {
                    backgroundColor: "#B5922B",
                    boxShadow: "0 6px 20px rgba(212, 175, 55, 0.4)",
                  },
                }}
              >
                Search
              </Button>
            </Stack>
          </Box>

        </Stack>
      </Container>
    </Box>
  );
}

// Reusable custom styling for Hero input fields inside dark glass background
const fieldStyles = {
  "& .MuiOutlinedInput-root": {
    color: "#F8FAFC",
    height: 54,
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.12)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(212, 175, 55, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D4AF37",
    },
  },
  "& .MuiSelect-icon": {
    color: "#94A3B8",
  },
};

export default Hero;