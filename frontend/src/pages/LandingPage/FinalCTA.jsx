// src/pages/LandingPage/FinalCTA.jsx
import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import { Link } from "react-router-dom";

const FinalCTA = ({ handleAuthOpen }) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        py: { xs: 8, md: 12 },
      })}
    >
      <Container maxWidth="lg">
        <Box
          sx={(theme) => ({
            position: "relative",
            overflow: "hidden",
            borderRadius: `${theme.shape.borderRadius * 1.6}px`,
            textAlign: "center",
            px: { xs: 4, md: 8 },
            py: { xs: 7, md: 9 },

            border: `1px solid ${theme.palette.secondary.main}2E`, // ~18% gold border
            boxShadow: `0 24px 60px ${theme.palette.primary.main}14`, // ~8% dark shadow

            "&::before": {
              content: '""',
              position: "absolute",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: `${theme.palette.secondary.main}0F`, // ~6% gold glow
              top: -120,
              right: -120,
            },

            "&::after": {
              content: '""',
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: `${theme.palette.secondary.main}0D`, // ~5% gold glow
              bottom: -100,
              left: -100,
            },
          })}
        >
          <Typography
            variant="overline"
            sx={(theme) => ({
              color: theme.palette.secondary.dark,
              fontWeight: 700,
              letterSpacing: "0.15em",
              fontSize: "0.8rem",
              position: "relative",
              zIndex: 1,
            })}
          >
            GET STARTED TODAY
          </Typography>

          <Typography
            variant="h3"
            sx={(theme) => ({
              mt: 1,
              mb: 2,
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
              position: "relative",
              zIndex: 1,
            })}
          >
            Ready to Find or List a Property?
          </Typography>

          <Typography
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              maxWidth: 650,
              mx: "auto",
              mb: 5,
              fontSize: {
                xs: "1rem",
                md: "1.1rem",
              },
              lineHeight: 1.8,
              position: "relative",
              zIndex: 1,
            })}
          >
            Join hundreds of tenants and property owners using{" "}
            <Box
              component="span"
              sx={(theme) => ({
                color: theme.palette.secondary.main,
                fontWeight: 700,
              })}
            >
              Pensasha
            </Box>{" "}
            to discover quality homes, market properties faster, and simplify
            rental management.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2.5}
            justifyContent="center"
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Button
              component={Link}
              to="/properties"
              variant="contained"
              startIcon={<SearchIcon />}
              sx={(theme) => ({
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                px: 4.5,
                py: 1.5,
                borderRadius: "999px",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: `0 10px 30px ${theme.palette.secondary.main}4D`, // ~30% gold glow

                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                  transform: "translateY(-2px)",
                },
              })}
            >
              Browse Properties
            </Button>

            <Button
              onClick={handleAuthOpen}
              variant="outlined"
              startIcon={<HouseOutlinedIcon />}
              sx={(theme) => ({
                px: 4.5,
                py: 1.5,
                borderRadius: "999px",
                borderWidth: 2,
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.dark,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",

                "&:hover": {
                  borderWidth: 2,
                  borderColor: theme.palette.secondary.dark,
                  backgroundColor: `${theme.palette.secondary.main}12`, // ~7% soft gold fill
                  transform: "translateY(-2px)",
                },
              })}
            >
              List Your Property
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default FinalCTA;