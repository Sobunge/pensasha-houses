// src/components/PropertyGallery.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Dialog,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CollectionsIcon from "@mui/icons-material/Collections";

export default function PropertyGallery({ gallery }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openIndex, setOpenIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);

  const visibleImages = gallery.slice(0, 3); // Show only first 3

  const handleNext = () =>
    setOpenIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));

  const handlePrev = () =>
    setOpenIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));

  // Swipe detection for mobile
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) handlePrev(); // Swipe right
    if (diff < -50) handleNext(); // Swipe left
  };

  return (
    <Box
      sx={{
        mt: 4,
        px: { xs: 2, md: 6 },
        textAlign: "center",
      }}
    >
      {/* Section Title */}
      <Typography
        variant={isMobile ? "h6" : "h5"}
        fontWeight={600}
        mb={3}
        color="text.primary"
      >
        More Photos
      </Typography>

      {/* Responsive Image Grid */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        {visibleImages.map((img, i) => (
          <Grid item xs={12} sm={4} md={3.5} key={i}>
            <Card
              onClick={() => setOpenIndex(i)}
              sx={{
                cursor: "pointer",
                borderRadius: 2,
                overflow: "hidden",
                transition: "all 0.3s ease",
                border: "1px solid #eee",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                "&:hover": {
                  transform: "translateY(-5px) scale(1.03)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={img}
                alt={`Property photo ${i + 1}`}
                sx={{
                  height: isMobile ? 180 : 220,
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* "See All Photos" Button */}
      {gallery.length > 3 && (
        <Button
          variant="contained"
          startIcon={<CollectionsIcon />}
          onClick={() => setOpenIndex(0)}
          sx={{
            mt: 1,
            mb: 3,
            background: "linear-gradient(45deg, #f8b500, #ffc62c)",
            color: "#111",
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            py: 1,
            fontSize: { xs: "0.9rem", md: "1rem" },
            textTransform: "none",
            boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
            "&:hover": {
              background: "linear-gradient(45deg, #ffc62c, #f8b500)",
              transform: "scale(1.05)",
            },
          }}
        >
          See all {gallery.length} photos
        </Button>
      )}

      {/* Fullscreen Viewer */}
      <Dialog
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        fullScreen={isMobile}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: "rgba(0,0,0,0.95)" },
        }}
      >
        <Box
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={() => setOpenIndex(null)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
              zIndex: 2,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Previous Button */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: { xs: 8, sm: 16 },
              color: "white",
              backgroundColor: "rgba(0,0,0,0.4)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
              zIndex: 2,
            }}
          >
            <ArrowBackIosNewIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>

          {/* Main Image */}
          {openIndex !== null && (
            <img
              src={gallery[openIndex]}
              alt={`Property view ${openIndex + 1}`}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: isMobile ? "85vh" : "90vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          )}

          {/* Next Button */}
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: { xs: 8, sm: 16 },
              color: "white",
              backgroundColor: "rgba(0,0,0,0.4)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
              zIndex: 2,
            }}
          >
            <ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>

          {/* Bottom Indicator */}
          {openIndex !== null && (
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                color: "#fff",
                fontWeight: 600,
                fontSize: isMobile ? "0.9rem" : "1rem",
                backgroundColor: "rgba(0,0,0,0.4)",
                px: 2,
                py: 0.5,
                borderRadius: "16px",
              }}
            >
              {openIndex + 1} / {gallery.length}
            </Box>
          )}
        </Box>
      </Dialog>

    </Box>
  );
}
