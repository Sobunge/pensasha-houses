// src/pages/LandlordPage/LandlordCaretakerDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Dummy caretaker data (replace with API)
const caretakers = Array.from({ length: 45 }).map((_, i) => ({
  id: String(i + 1),
  name: `Caretaker ${i + 1}`,
  property: i % 2 === 0 ? "Greenwood Apartments" : "Lakeview Villas",
  email: `caretaker${i + 1}@example.com`,
  phone: `+25471234${(100 + i).toString().slice(-3)}`,
  status: i % 3 === 0 ? "Inactive" : "Active",
}));

const LandlordCaretakerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const caretaker = caretakers.find((c) => c.id === id);

  if (!caretaker) {
    return <Typography variant="h6">Caretaker not found</Typography>;
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar sx={{ bgcolor: "#f8b500", width: 64, height: 64 }}>
            <SupervisorAccountIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {caretaker.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {caretaker.property}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography>{caretaker.email}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Phone
            </Typography>
            <Typography>{caretaker.phone}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Status
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: caretaker.status === "Active" ? "green" : "red",
              }}
            >
              {caretaker.status}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default LandlordCaretakerDetails;
