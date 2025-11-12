// src/pages/ListingsPage/BrowserPropertyPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  Breadcrumbs,
  Link,
  Container,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Home as HomeIcon,
  Place as PlaceIcon,
  Bed as BedIcon,
  Bathtub as BathtubIcon,
  AttachMoney as AttachMoneyIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

import PropertyGallery from "../../pages/ListingsPage/PropertyGallery";
import PropertyNotFound from "../../pages/ListingsPage/PropertyNotFound";
import RequestToRentDialog from "../../pages/ListingsPage/RequestToRentDialog";
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

export default function BrowserPropertyPage() {
  const { id } = useParams();
  const property = sampleProperties.find((p) => p.id === id);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { user, redirectAfterAuth, setRedirectAfterAuth } = useAuth();
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  useEffect(() => {
    if (user && redirectAfterAuth === "rent-request") {
      setOpenRequestDialog(true);
      setOpenAuthModal(false);
      setTimeout(() => setRedirectAfterAuth(null), 100);
    }
  }, [user, redirectAfterAuth, setRedirectAfterAuth]);

  const handleRequestClick = () => {
    if (!user) {
      setRedirectAfterAuth("rent-request");
      setOpenAuthModal(true);
    } else {
      setOpenRequestDialog(true);
    }
  };

  if (!property) return <PropertyNotFound />;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 1 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<ChevronRightIcon fontSize="small" />}
        sx={{ mb: 3, fontSize: { xs: "0.85rem", md: "1rem" }, color: "text.secondary" }}
      >
        <Link href="/" underline="hover" sx={{ display: "flex", alignItems: "center", color: "#555" }}>
          <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} /> Home
        </Link>
        <Link href="/properties" underline="hover" sx={{ color: "#555" }}>
          Listings
        </Link>
        <Typography color="text.primary" sx={{ fontWeight: 500 }}>
          {property.title}
        </Typography>
      </Breadcrumbs>

      {/* Property Card */}
      <Card
        elevation={4}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          transition: "0.3s ease",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          "&:hover": {
            boxShadow: "0 8px 28px rgba(0,0,0,0.15)",
            transform: "translateY(-3px)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={property.image}
          alt={property.title}
          sx={{ height: { xs: 240, sm: 340, md: 420 }, objectFit: "cover", borderBottom: "4px solid #f8b500" }}
        />

        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight={700} gutterBottom>
            {property.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1, color: "text.secondary" }}>
            <PlaceIcon sx={{ mr: 0.5, fontSize: 20 }} />
            <Typography variant="body1">{property.location}</Typography>
          </Box>

          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={12} sm="auto">
              <Typography>
                <BedIcon sx={{ mr: 0.5 }} /> {property.beds} Beds
              </Typography>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Typography>
                <BathtubIcon sx={{ mr: 0.5 }} /> {property.baths} Baths
              </Typography>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Typography>
                <HomeIcon sx={{ mr: 0.5 }} /> {property.type}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: { xs: "center", sm: "left" }, mb: 2 }}>
            <Chip
              icon={<AttachMoneyIcon />}
              label={`Ksh ${property.price.toLocaleString()} / month`}
              color="warning"
              sx={{ fontWeight: 700, fontSize: "1rem", px: 1.5, py: 1, boxShadow: "0 3px 8px rgba(248,181,0,0.4)" }}
            />
          </Box>

          <Divider sx={{ my: { xs: 2, md: 3 } }} />
          <PropertyGallery gallery={property.gallery} />

          <Typography sx={{ mt: { xs: 3, md: 4 }, mb: { xs: 2, md: 3 }, color: "text.secondary", lineHeight: 1.7 }}>
            {property.description}
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600} mb={1.5}>
              Amenities
            </Typography>
            <Grid container spacing={1.5}>
              {property.amenities.map((a, i) => (
                <Grid item key={i} xs={6} sm="auto">
                  <Chip
                    icon={<CheckCircleIcon sx={{ color: "#f8b500" }} />}
                    label={a}
                    variant="outlined"
                    sx={{
                      borderColor: "#f8b500",
                      borderRadius: "8px",
                      color: "#333",
                      fontWeight: 500,
                      boxShadow: "0 2px 6px rgba(248,181,0,0.2)",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Request Button */}
          <Box sx={{ textAlign: isMobile ? "center" : "left", py: 1 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleRequestClick}
              startIcon={<SendIcon />}
              sx={{
                background: "linear-gradient(45deg, #f8b500, #ffc62c)",
                color: "#111",
                fontWeight: 700,
                borderRadius: 2,
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                transition: "0.3s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                "&:hover": {
                  background: "linear-gradient(45deg, #ffc62c, #f8b500)",
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
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
      <RequestToRentDialog open={openRequestDialog} onClose={() => setOpenRequestDialog(false)} property={property} />
    </Container>
  );
}
