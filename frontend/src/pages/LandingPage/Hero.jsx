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
      sx={(theme) => ({
        minHeight: { xs: "85vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.dark}73 0%, ${theme.palette.primary.dark}D9 100%), radial-gradient(circle, ${theme.palette.primary.dark}33 0%, ${theme.palette.primary.dark}CC 100%), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: theme.palette.common.white,
        py: { xs: 8, md: 10 },
      })}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={4} alignItems="center" textAlign="center">
          
          {/* Subtle Tagline Badge */}
          <Chip
            label="REFINED LIVING & PROPERTY MANAGEMENT"
            sx={(theme) => ({
              backgroundColor: `${theme.palette.secondary.main}1F`, // ~12% opacity gold
              color: theme.palette.secondary.main,
              border: `1px solid ${theme.palette.secondary.main}4D`, // ~30% opacity gold border
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              px: 1,
              py: 0.5,
              backdropFilter: "blur(8px)",
            })}
          />

          {/* Main Headline */}
          <Typography
            variant="h1"
            sx={{
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
            sx={(theme) => ({
              maxWidth: 680,
              fontSize: { xs: "1rem", md: "1.15rem" },
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
              fontWeight: 400,
            })}
          >
            Pensasha connects clients with exceptional properties, simplifies management 
            for landlords, and delivers an uncompromised experience.
          </Typography>

          {/* Floating Glassmorphic Search Bar Widget */}
          <Box
            sx={(theme) => ({
              width: "100%",
              maxWidth: 1000,
              mt: { xs: 2, md: 3 },
              p: { xs: 2, md: 2.5 },
              backgroundColor: `${theme.palette.primary.main}A6`, // ~65% opacity obsidian
              backdropFilter: "blur(20px)",
              borderRadius: `${theme.shape.borderRadius * 1.33}px`,
              border: `1px solid ${theme.palette.common.white}1F`, // ~12% white border
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
            })}
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
                      <LocationOnOutlinedIcon sx={(theme) => ({ color: theme.palette.secondary.main })} />
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
                      <HomeOutlinedIcon sx={(theme) => ({ color: theme.palette.secondary.main })} />
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
                      <AttachMoneyOutlinedIcon sx={(theme) => ({ color: theme.palette.secondary.main })} />
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
                sx={(theme) => ({
                  width: { xs: "100%", md: "auto" },
                  minWidth: 160,
                  height: 54,
                  px: 4,
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.dark,
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderRadius: "10px",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  boxShadow: `0 4px 14px ${theme.palette.secondary.main}4D`,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.dark,
                    boxShadow: `0 6px 20px ${theme.palette.secondary.main}66`,
                  },
                })}
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