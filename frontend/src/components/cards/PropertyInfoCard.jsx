// src/components/PropertyInfoCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/Auth/AuthContext";

const PropertyInfoCard = ({ property = {} }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    id,
    name,
    location,
    description,
    units = [],
  } = property;

  const baseRent = units.length > 0 ? units[0].rentAmount : 0;
  const unitCount = units.length;

  const handleNavigation = () => {
    if (!user || !id) return;
    const roleBase = user.role?.toLowerCase() || "tenant";
    navigate(`/${roleBase}/properties/${id}`);
  };

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        width: "100%",
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: `0px 12px 32px ${theme.palette.primary.main}14`,
          transform: "translateY(-4px)",
          borderColor: `${theme.palette.secondary.main}66`,
        },
      })}
    >
      {/* --- Header --- */}
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          bgcolor: `${theme.palette.secondary.main}0A`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: `${theme.shape.borderRadius}px`,
              bgcolor: `${theme.palette.secondary.main}1F`,
              color: theme.palette.secondary.main,
            })}
          >
            <HomeWorkOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography
            variant="subtitle2"
            sx={(theme) => ({
              fontWeight: 800,
              color: theme.palette.text.secondary,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontSize: "0.75rem",
            })}
          >
            Property
          </Typography>
        </Box>

        <Chip
          label={`${unitCount} ${unitCount === 1 ? "Unit" : "Units"}`}
          size="small"
          sx={(theme) => ({
            fontWeight: 700,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontSize: "0.75rem",
            borderRadius: `${theme.shape.borderRadius / 1.5}px`,
            height: "24px",
          })}
        />
      </Box>

      {/* --- Main Content --- */}
      <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
        <Stack spacing={2}>
          {/* Property Name & Location */}
          <Box>
            <Typography
              variant="h6"
              sx={(theme) => ({
                fontWeight: 800,
                color: theme.palette.text.primary,
                mb: 0.5,
                fontSize: "1.125rem",
                letterSpacing: "-0.2px",
              })}
            >
              {name || "Unnamed Property"}
            </Typography>
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: theme.palette.text.secondary,
              })}
            >
              <LocationOnOutlinedIcon sx={(theme) => ({ fontSize: 16, color: theme.palette.text.secondary })} />
              <Typography variant="body2" sx={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                {location || "Location unavailable"}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              fontSize: "0.8125rem",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.6em",
            })}
          >
            {description || "No description provided for this property."}
          </Typography>

          <Divider sx={(theme) => ({ borderStyle: "dashed", borderColor: theme.palette.divider })} />

          {/* Price Display */}
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: `${theme.palette.primary.main}0A`,
              p: 2,
              borderRadius: `${theme.shape.borderRadius * 1.5}px`,
              border: `1px solid ${theme.palette.divider}`,
            })}
          >
            <Typography
              variant="caption"
              sx={(theme) => ({
                fontWeight: 800,
                color: theme.palette.text.secondary,
                letterSpacing: "0.5px",
              })}
            >
              STARTING RENT
            </Typography>
            <Typography
              variant="subtitle1"
              sx={(theme) => ({
                fontWeight: 800,
                color: theme.palette.text.primary,
                fontSize: "1rem",
              })}
            >
              KES {Number(baseRent).toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      {/* --- Action Footer --- */}
      <Box sx={{ p: 2.5, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardOutlinedIcon />}
          onClick={handleNavigation}
          sx={(theme) => ({
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.875rem",
            py: 1.2,
            borderRadius: `${theme.shape.borderRadius}px`,
            boxShadow: `0 4px 12px ${theme.palette.primary.main}26`,
            "& .MuiButton-endIcon": {
              color: theme.palette.secondary.main,
            },
            "&:hover": {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              boxShadow: `0 6px 16px ${theme.palette.secondary.main}4D`,
              "& .MuiButton-endIcon": {
                color: theme.palette.primary.main,
              },
            },
            transition: "all 0.2s ease-in-out",
          })}
        >
          Manage Property
        </Button>
      </Box>
    </Card>
  );
};

export default PropertyInfoCard;