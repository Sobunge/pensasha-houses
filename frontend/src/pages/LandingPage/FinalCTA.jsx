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
      sx={{
        backgroundColor: "#FFFFFF",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 5,
            textAlign: "center",
            px: { xs: 4, md: 8 },
            py: { xs: 7, md: 9 },

            background:
              "linear-gradient(180deg, #FFFFFF 0%, #FCFAF5 100%)",

            border: "1px solid rgba(212,175,55,0.18)",

            boxShadow: "0 24px 60px rgba(15,23,42,0.08)",

            "&::before": {
              content: '""',
              position: "absolute",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.06)",
              top: -120,
              right: -120,
            },

            "&::after": {
              content: '""',
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.05)",
              bottom: -100,
              left: -100,
            },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#B5922B",
              fontWeight: 700,
              letterSpacing: "0.15em",
              fontSize: "0.8rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            GET STARTED TODAY
          </Typography>

          <Typography
            variant="h3"
            sx={{
              mt: 1,
              mb: 2,
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 600,
              color: "#0F172A",
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
              position: "relative",
              zIndex: 1,
            }}
          >
            Ready to Find or List a Property?
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
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
            }}
          >
            Join hundreds of tenants and property owners using{" "}
            <Box
              component="span"
              sx={{
                color: "#D4AF37",
                fontWeight: 700,
              }}
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
              sx={{
                backgroundColor: "#D4AF37",
                color: "#0F172A",
                px: 4.5,
                py: 1.5,
                borderRadius: "999px",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: "0 10px 30px rgba(212,175,55,0.30)",

                "&:hover": {
                  backgroundColor: "#B5922B",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Browse Properties
            </Button>

            <Button
              onClick={handleAuthOpen}
              variant="outlined"
              startIcon={<HouseOutlinedIcon />}
              sx={{
                px: 4.5,
                py: 1.5,
                borderRadius: "999px",
                borderWidth: 2,
                borderColor: "#D4AF37",
                color: "#B5922B",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",

                "&:hover": {
                  borderWidth: 2,
                  borderColor: "#B5922B",
                  backgroundColor: "#FCF7EB",
                  transform: "translateY(-2px)",
                },
              }}
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