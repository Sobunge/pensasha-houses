// src/components/PropertyCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Chip,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PropertyCard({ property = {} }) {
  const theme = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setFavorited((prev) => !prev);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };

  const handleViewDetails = () => {
    if (user?.role === "tenant") {
      navigate(`/tenant/browse-properties/${property.id}`);
    } else {
      navigate(`/properties/${property.id}`);
    }
  };

  const formattedPrice = property.price
    ? `Ksh ${property.price.toLocaleString()}`
    : "Price on Request";

  const imageSrc =
    property.image ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80";

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 4px 20px rgba(15, 23, 42, 0.06)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "#F8B500", // Warm mustard hover accent
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
          "& .property-card-img": {
            transform: "scale(1.05)",
          },
        },
      }}
    >
      {/* Image Container */}
      <Box sx={{ position: "relative", height: 200, overflow: "hidden" }}>
        <Box
          className="property-card-img"
          component="img"
          src={imageSrc}
          alt={property.title || "Property"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s ease",
          }}
        />

        {/* Gradient Overlay for Image Depth */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15, 23, 42, 0.35) 0%, rgba(15, 23, 42, 0) 40%, rgba(15, 23, 42, 0.6) 100%)",
          }}
        />

        {/* Favorite Button (Bright Glass) */}
        <IconButton
          size="small"
          onClick={handleFavoriteClick}
          aria-label="favorite property"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            transform: animate ? "scale(1.2)" : "scale(1)",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#FFFFFF",
              transform: "scale(1.1)",
            },
          }}
        >
          {favorited ? (
            <FavoriteIcon
              fontSize="small"
              sx={{
                color: "#EF4444",
                animation: animate ? "heartbeat 0.5s ease" : "none",
                "@keyframes heartbeat": {
                  "0%": { transform: "scale(1)" },
                  "25%": { transform: "scale(1.3)" },
                  "50%": { transform: "scale(1)" },
                  "75%": { transform: "scale(1.3)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            />
          ) : (
            <FavoriteBorderIcon
              fontSize="small"
              sx={{ color: theme.palette.text.primary }}
            />
          )}
        </IconButton>

        {/* Glassmorphic Price Chip (Light Theme Adaption) */}
        <Chip
          label={formattedPrice}
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            backgroundColor: "rgba(15, 23, 42, 0.75)", // Dark glass sits cleanly on top of the image
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#F8B500", // Warm mustard yellow text
            fontWeight: 700,
            fontSize: "0.85rem",
            borderRadius: "8px",
            overflow: "hidden",
            borderLeft: "5px solid #F8B500", // Mustard accent bar on left
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            borderRight: "1px solid rgba(255, 255, 255, 0.15)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
            height: "auto",
            py: 0.6,
            px: 1,
            "& .MuiChip-label": {
              px: 1,
              py: 0,
            },
          }}
        />
      </Box>

      {/* Details Section */}
      <CardContent
        sx={{
          flexGrow: 1,
          p: 2.5,
          bgcolor: "#FFFFFF",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 0.5,
            fontSize: "1.05rem",
            color: theme.palette.text.primary,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={property.title}
        >
          {property.title || "Untitled Property"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: theme.palette.text.secondary,
            mb: 2,
            gap: 0.5,
          }}
        >
          <PlaceIcon
            fontSize="small"
            sx={{ color: "#F8B500", fontSize: "1rem" }}
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.85rem",
              color: theme.palette.text.secondary,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={property.location}
          >
            {property.location || "Location unavailable"}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: theme.palette.divider, mb: 2 }} />

        {/* Property Features */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: theme.palette.text.primary,
          }}
        >
          {property.beds !== undefined && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
              <BedOutlinedIcon
                fontSize="small"
                sx={{ color: theme.palette.text.secondary }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: "0.82rem", fontWeight: 600 }}
              >
                {property.beds} Beds
              </Typography>
            </Box>
          )}

          {property.baths !== undefined && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
              <BathtubOutlinedIcon
                fontSize="small"
                sx={{ color: theme.palette.text.secondary }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: "0.82rem", fontWeight: 600 }}
              >
                {property.baths} Baths
              </Typography>
            </Box>
          )}

          {property.type && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
              <HomeOutlinedIcon
                fontSize="small"
                sx={{ color: theme.palette.text.secondary }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: "0.82rem", fontWeight: 600 }}
              >
                {property.type}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>

      {/* Action Footer */}
      <CardActions
        sx={{
          p: 2.5,
          pt: 0,
          bgcolor: "#FFFFFF",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={handleViewDetails}
          sx={{
            bgcolor: theme.palette.primary.main, // Deep slate button
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: "0.9rem",
            borderRadius: "10px",
            py: 1.1,
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#F8B500", // Swaps to mustard on hover
              color: "#0F172A", // Dark text on hover
              boxShadow: "0 6px 16px rgba(248, 181, 0, 0.35)",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}