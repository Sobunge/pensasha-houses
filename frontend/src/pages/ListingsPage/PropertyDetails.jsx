// src/pages/ListingsPage/PropertyDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Button,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Container,
  Breadcrumbs,
  Link,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Home as HomeIcon,
  Place as PlaceIcon,
  Bed as BedIcon,
  Bathtub as BathtubIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  ChevronRight as ChevronRightIcon,
  LocalOffer as PriceTagIcon,
} from "@mui/icons-material";

import PropertyGallery from "./PropertyGallery";
import PropertyNotFound from "./PropertyNotFound";
import RequestToRentDialog from "./RequestToRentDialog";
import AuthModal from "../Auth/AuthModal";
import { useAuth } from "../Auth/AuthContext";

// Sample properties
const sampleProperties = [
  {
    id: "1",
    title: "Modern Apartment in Kisumu",
    image: "../../assets/images/external.jpg",
    price: 25000,
    location: "Milimani, Kisumu",
    beds: 2,
    baths: 1,
    type: "Apartment",
    description:
      "This stylish 2-bedroom apartment offers scenic lake views, modern finishes, and convenient access to the city center. Ideal for both professionals and small families.",
    amenities: ["Wi-Fi", "Parking", "24/7 Security", "Balcony", "Water Heater"],
    gallery: [
      "../../assets/images/Living_room.webp",
      "../../assets/images/bathroom.webp",
      "../../assets/images/hallway.webp",
      "../../assets/images/kitchen.webp",
      "../../assets/images/sink.webp",
    ],
  },
];

export default function PropertyDetails() {
  const { id } = useParams();
  const property = sampleProperties.find((p) => p.id === id);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Auth context
  const { user, redirectAfterAuth, setRedirectAfterAuth } = useAuth();

  // Local state
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  // Open request dialog automatically if user logged in after redirect
  useEffect(() => {
    if (user && redirectAfterAuth === "rent-request") {
      setOpenRequestDialog(true);
      setOpenAuthModal(false);

      // Clear redirect intent
      setTimeout(() => setRedirectAfterAuth(null), 100);
    }
  }, [user, redirectAfterAuth, setRedirectAfterAuth]);

  const handleRequestClick = () => {
    if (!user) {
      // User not logged in → show login modal and set redirect
      setRedirectAfterAuth("rent-request");
      setOpenAuthModal(true);
    } else {
      // Already logged in → open request dialog
      setOpenRequestDialog(true);
    }
  };

  if (!property) return <PropertyNotFound />;

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 5 }, py: { xs: 3, md: 6 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<ChevronRightIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />}
        sx={{ mb: 3, fontSize: { xs: "0.85rem", md: "0.95rem" } }}
      >
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          sx={{ display: "flex", alignItems: "center", color: theme.palette.text.secondary, fontWeight: 500 }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} /> Home
        </Link>
        <Link
          component={RouterLink}
          to="/properties"
          underline="hover"
          sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}
        >
          Properties
        </Link>
        <Typography color="text.primary" sx={{ fontWeight: 700 }}>
          {property.title}
        </Typography>
      </Breadcrumbs>

      {/* Property Main Card */}
      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          bgcolor: "#FFFFFF",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.06)",
        }}
      >
        <CardMedia
          component="img"
          image={property.image}
          alt={property.title}
          sx={{
            height: { xs: 260, sm: 360, md: 440 },
            objectFit: "cover",
            borderBottom: "3px solid #FDE68A",
          }}
        />

        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          {/* Header & Location */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { sm: "flex-start" }, gap: 2, mb: 2 }}>
            <Box>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{ fontWeight: 800, color: theme.palette.text.primary, letterSpacing: "-0.02em", mb: 0.5 }}
              >
                {property.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", color: theme.palette.text.secondary }}>
                <PlaceIcon sx={{ mr: 0.5, fontSize: 20, color: "#D97706" }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {property.location}
                </Typography>
              </Box>
            </Box>

            {/* Price Tag */}
            <Chip
              icon={<PriceTagIcon sx={{ color: "#D97706 !important" }} />}
              label={`Ksh ${property.price.toLocaleString()} / mo`}
              sx={{
                fontWeight: 800,
                fontSize: "1.05rem",
                px: 1.5,
                py: 2.5,
                bgcolor: "#FEF3C7",
                color: "#D97706",
                border: "1.5px solid #FDE68A",
                borderRadius: "12px",
                alignSelf: { xs: "flex-start", sm: "auto" },
              }}
            />
          </Box>

          {/* Quick Specs Pill Grid */}
          <Grid container spacing={1.5} sx={{ my: 2 }}>
            <Grid item xs={4} sm="auto">
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: "10px",
                  bgcolor: "#F8FAFC",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <BedIcon sx={{ color: "#0F172A", fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  {property.beds} Beds
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={4} sm="auto">
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: "10px",
                  bgcolor: "#F8FAFC",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <BathtubIcon sx={{ color: "#0F172A", fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  {property.baths} Baths
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={4} sm="auto">
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: "10px",
                  bgcolor: "#F8FAFC",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <HomeIcon sx={{ color: "#0F172A", fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  {property.type}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: { xs: 3, md: 4 } }} />

          {/* Gallery Component */}
          <PropertyGallery gallery={property.gallery} />

          {/* Description */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: theme.palette.text.primary, mt: { xs: 3, md: 4 }, mb: 1 }}
          >
            About this property
          </Typography>
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.7,
              fontSize: "1rem",
              mb: 4,
            }}
          >
            {property.description}
          </Typography>

          {/* Amenities Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 2 }}>
              Amenities & Features
            </Typography>
            <Grid container spacing={1.5}>
              {property.amenities.map((amenity, i) => (
                <Grid item key={i} xs={6} sm="auto">
                  <Chip
                    icon={<CheckCircleIcon sx={{ color: "#D97706 !important" }} />}
                    label={amenity}
                    sx={{
                      bgcolor: "#F8FAFC",
                      borderColor: "#FDE68A",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderRadius: "8px",
                      color: theme.palette.text.primary,
                      fontWeight: 600,
                      px: 0.5,
                      py: 2,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Primary Action */}
          <Box sx={{ textAlign: isMobile ? "center" : "left", pt: 1 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleRequestClick}
              startIcon={<SendIcon />}
              sx={{
                bgcolor: "#D97706",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: "10px",
                px: 4.5,
                py: 1.5,
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(217, 119, 6, 0.3)",
                "&:hover": {
                  bgcolor: "#B45309",
                  boxShadow: "0 6px 18px rgba(217, 119, 6, 0.4)",
                },
              }}
            >
              Request to Rent
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Modals */}
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
      <RequestToRentDialog
        open={openRequestDialog}
        onClose={() => setOpenRequestDialog(false)}
        property={property}
      />
    </Container>
  );
}