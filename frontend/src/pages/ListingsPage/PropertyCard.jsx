import React from "react";
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

export default function PropertyCard({ property }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "#fff",
        border: "2px solid #e0e0e0", // more pronounced border
        boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
        transition: "all 0.35s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "#f8b500",
          boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
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
          }}
        >
          <FavoriteBorderIcon fontSize="small" sx={{ color: "#f8b500" }} />
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

      {/* Details */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 0.6,
            fontSize: "0.95rem",
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
            mb: 1,
            gap: 0.5,
          }}
        >
          <PlaceIcon fontSize="small" color="action" />
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={property.location}
          >
            {property.location}
          </Typography>
        </Box>

        {/* Property Info */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            px: 0.3,
            color: "#333",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <BedIcon fontSize="small" color="action" />
            <Typography variant="body2" sx={{ fontSize: "0.78rem" }}>
              {property.beds} Beds
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <BathtubIcon fontSize="small" color="action" />
            <Typography variant="body2" sx={{ fontSize: "0.78rem" }}>
              {property.baths} Baths
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <HomeIcon fontSize="small" color="action" />
            <Typography variant="body2" sx={{ fontSize: "0.78rem" }}>
              {property.type}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Footer Button */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<VisibilityIcon />}
          sx={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(45deg, #f8b500, #ffc62c)",
            color: "#111",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "0.8rem",
            borderRadius: 2,
            py: 1,
            boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
            transition: "all 0.35s ease",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-75%",
              width: "50%",
              height: "100%",
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)",
              transform: "skewX(-25deg)",
              transition: "0.5s",
            },
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
              background: "linear-gradient(45deg, #ffc62c, #f8b500)",
              animation: "pulse 1.5s infinite",
              "&::before": {
                left: "125%",
              },
            },
            "&:active": {
              transform: "scale(0.97)",
            },
            "@keyframes pulse": {
              "0%": { boxShadow: "0 0 0 0 rgba(248,181,0,0.4)" },
              "70%": { boxShadow: "0 0 0 10px rgba(248,181,0,0)" },
              "100%": { boxShadow: "0 0 0 0 rgba(248,181,0,0)" },
            },
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
