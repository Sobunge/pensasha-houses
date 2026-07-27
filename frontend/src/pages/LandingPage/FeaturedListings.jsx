// src/pages/LandingPage/FeaturedListings.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
  Chip,
  IconButton,
  Stack,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";

const listings = [
  { id: 1, name: "Modern Bedsitter", location: "Kisumu CBD", price: "KES 8,000", period: "/mo", beds: 1, baths: 1, image: "/assets/images/house.jpg" },
  { id: 2, name: "1 Bedroom Executive", location: "Milimani, Kisumu", price: "KES 15,000", period: "/mo", beds: 1, baths: 1, image: "/assets/images/house.jpg" },
  { id: 3, name: "2 Bedroom Villa", location: "Nyamasaria", price: "KES 20,000", period: "/mo", beds: 2, baths: 2, image: "/assets/images/house.jpg" },
  { id: 4, name: "Luxury Studio Flat", location: "Tom Mboya Estate", price: "KES 10,000", period: "/mo", beds: 1, baths: 1, image: "/assets/images/house.jpg" },
  { id: 5, name: "Prime Office Suite", location: "Mega Plaza, Kisumu", price: "KES 30,000", period: "/mo", beds: "-", baths: 1, image: "/assets/images/house.jpg" },
  { id: 6, name: "Retail Commercial Shop", location: "Oginga Odinga Street", price: "KES 25,000", period: "/mo", beds: "-", baths: 1, image: "/assets/images/house.jpg" },
  { id: 7, name: "Shared Serviced Flat", location: "Lolwe Estate", price: "KES 12,000", period: "/mo", beds: 1, baths: 1, image: "/assets/images/house.jpg" },
  { id: 8, name: "Commercial Space", location: "Kondele", price: "KES 40,000", period: "/mo", beds: "-", baths: 2, image: "/assets/images/house.jpg" },
];

const FeaturedListings = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    slides: {
      perView: 3,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(max-width: 640px)": {
        slides: { perView: 1, spacing: 12 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 4500);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <Box 
      sx={{ 
        backgroundColor: "#F8FAFC", 
        py: { xs: 8, md: 12 }, 
        position: "relative",
        borderTop: "1px solid #E2E8F0"
      }}
    >
      <Container maxWidth="lg">
        {/* Header with Navigation Controls */}
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          justifyContent="space-between" 
          alignItems={{ xs: "flex-start", sm: "flex-end" }} 
          spacing={2}
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "#B5922B",
                fontWeight: 700,
                letterSpacing: "0.15em",
                fontSize: "0.8rem",
              }}
            >
              CURATED SELECTION
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 600,
                color: "#0F172A",
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                mt: 0.5,
              }}
            >
              Featured Residences
            </Typography>
          </Box>

          {/* Navigation Arrows */}
          {loaded && instanceRef.current && (
            <Stack direction="row" spacing={1.5}>
              <IconButton
                onClick={() => instanceRef.current?.prev()}
                sx={{
                  color: "#0F172A",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  "&:hover": {
                    backgroundColor: "#F1F5F9",
                    borderColor: "#D4AF37",
                    color: "#B5922B",
                  },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={() => instanceRef.current?.next()}
                sx={{
                  color: "#0F172A",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  "&:hover": {
                    backgroundColor: "#F1F5F9",
                    borderColor: "#D4AF37",
                    color: "#B5922B",
                  },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>

        {/* Carousel Container */}
        <Box ref={sliderRef} className="keen-slider" sx={{ overflow: "visible" }}>
          {listings.map((listing) => (
            <Box className="keen-slider__slide" key={listing.id} sx={{ py: 1 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.05)",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: "rgba(212, 175, 55, 0.5)",
                    boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.12)",
                    "& .card-image": {
                      transform: "scale(1.06)",
                    },
                  },
                }}
              >
                {/* Image Box with Price Chip */}
                <Box sx={{ position: "relative", overflow: "hidden", pt: "62%" }}>
                  <CardMedia
                    className="card-image"
                    component="img"
                    image={listing.image}
                    alt={listing.name}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                  />
                  {/* Floating Price Chip */}
                  <Chip
                    label={
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#0F172A" }}>
                        {listing.price}
                        <Box component="span" sx={{ fontSize: "0.75rem", fontWeight: 500, opacity: 0.7 }}>
                          {listing.period}
                        </Box>
                      </Typography>
                    }
                    sx={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      px: 0.5,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                    }}
                  />
                </Box>

                {/* Card Body */}
                <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#0F172A",
                        fontSize: "1.15rem",
                        mb: 1,
                        lineHeight: 1.3,
                      }}
                    >
                      {listing.name}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "#64748B", mb: 2.5 }}>
                      <LocationOnOutlinedIcon sx={{ fontSize: "1.05rem", color: "#B5922B" }} />
                      <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                        {listing.location}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Property Quick Stats & Button */}
                  <Box>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        pt: 2,
                        mb: 2.5,
                        borderTop: "1px solid #F1F5F9",
                        color: "#64748B",
                        fontSize: "0.85rem",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={0.8}>
                        <BedOutlinedIcon sx={{ fontSize: "1.1rem" }} />
                        <Typography variant="caption">{listing.beds} Bed</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.8}>
                        <BathtubOutlinedIcon sx={{ fontSize: "1.1rem" }} />
                        <Typography variant="caption">{listing.baths} Bath</Typography>
                      </Stack>
                    </Stack>

                    <Button
                      component={Link}
                      to={`/listing/${listing.id}`}
                      variant="outlined"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        color: "#0F172A",
                        borderColor: "#E2E8F0",
                        borderRadius: "10px",
                        py: 1,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "#0F172A",
                          backgroundColor: "#0F172A",
                          color: "#FFFFFF",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Carousel Pagination Dots */}
        {loaded && instanceRef.current && (
          <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 4 }}>
            {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
              <Box
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                sx={{
                  width: currentSlide === idx ? 28 : 8,
                  height: 8,
                  borderRadius: "4px",
                  backgroundColor: currentSlide === idx ? "#B5922B" : "#CBD5E1",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default FeaturedListings;