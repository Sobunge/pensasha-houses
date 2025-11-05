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
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

export default function PropertyCard({ property }) {
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleFavoriteClick = () => {
    setFavorited((prev) => !prev);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500); // reset animation after 0.5s
    // Optional: send favorite state to backend here
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "all 0.35s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "#ffc62c",
          boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: "relative", height: 180 }}>
        <img
          src={property.image}
          alt={property.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Favorite Button */}
        <IconButton
          size="small"
          onClick={handleFavoriteClick}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            },
            transform: animate ? "scale(1.4)" : "scale(1)",
            transition: animate ? "transform 0.3s ease" : "transform 0.2s ease",
          }}
        >
          {favorited ? (
            <FavoriteIcon
              fontSize="small"
              sx={{
                color: "#f50057",
                animation: animate ? "heartbeat 0.5s ease" : "none",
              }}
            />
          ) : (
            <FavoriteBorderIcon fontSize="small" sx={{ color: "#f8b500" }} />
          )}
        </IconButton>

        {/* Price Tag */}
        <Chip
          label={`Ksh ${property.price.toLocaleString()}`}
          icon={<AttachMoneyIcon />}
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            backgroundColor: "#f8b500",
            color: "#111",
            fontWeight: 700,
            borderRadius: 1.5,
            fontSize: "0.8rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />
      </Box>

      {/* Details Section */}
      <CardContent sx={{ flexGrow: 1, p: 2.2, bgcolor: "#fafafa" }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 0.8,
            fontSize: "1rem",
            color: "#222",
            display: "flex",
            alignItems: "center",
            gap: 0.6,
          }}
        >
          <HomeIcon fontSize="small" color="primary" />
          {property.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#666",
            mb: 1.5,
            gap: 0.6,
          }}
        >
          <PlaceIcon fontSize="small" sx={{ color: "#777" }} />
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.85rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={property.location}
          >
            {property.location}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#333",
            mt: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BedIcon fontSize="small" sx={{ color: "#777" }} />
            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
              {property.beds} Beds
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BathtubIcon fontSize="small" sx={{ color: "#777" }} />
            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
              {property.baths} Baths
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <HomeIcon fontSize="small" sx={{ color: "#777" }} />
            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
              {property.type}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, bgcolor: "#fff" }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={() => navigate(`/property/${property.id}`)}
          sx={{
            background: "linear-gradient(45deg, #f8b500, #ffc62c)",
            color: "#111",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "0.9rem",
            borderRadius: 2,
            py: 1,
            boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
            transition: "all 0.35s ease",
            "&:hover": {
              background: "linear-gradient(45deg, #ffc62c, #f8b500)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
            },
            "&:active": {
              transform: "scale(0.97)",
            },
          }}
        >
          View Details
        </Button>
      </CardActions>

      {/* Keyframes for heartbeat animation */}
      <style>
        {`
          @keyframes heartbeat {
            0% { transform: scale(1); }
            25% { transform: scale(1.3); }
            50% { transform: scale(1); }
            75% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Card>
  );
}
