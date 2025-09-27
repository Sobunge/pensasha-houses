// src/pages/tenant/PropertyPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Chip,
  Tabs,
  Tab,
  Stack,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  Card,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import PaymentIcon from "@mui/icons-material/Payment";
import BuildIcon from "@mui/icons-material/Build";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

import PropertyOverview from "./PropertyOverview";
import PropertyDocuments from "./PropertyDocuments";
import PaymentsCard from "../../components/cards/PaymentsCard";
import MaintenanceCard from "../../components/cards/MaintenanceCard";
import PropertyMedia from "./PropertyMedia";

// Example properties
export const exampleProperties = [
  {
    id: 1,
    name: "Sunrise Apartments",
    unit: "A-203",
    lease: "Jan 2024 – Dec 2024",
    rentStatus: "Pending",
    rentAmount: "Ksh 12,000",
    landlord: { name: "John Doe", email: "john@example.com", phone: "0712345678" },
    caretaker: { name: "James Mwangi", email: "james@example.com", phone: "0711002000" },
    documents: ["Lease.pdf"],
    payments: [{ month: "Jan", amount: "Ksh 12,000", status: "Pending" }],
    maintenance: [{ issue: "Leaky faucet", status: "Resolved" }],
    media: ["/assets/images/house.jpg", "/assets/images/house.jpg"],
  },
  // ...other properties
];

const tabOptions = [
  { label: "Overview", icon: <HomeIcon />, value: 0 },
  { label: "Documents", icon: <DescriptionIcon />, value: 1 },
  { label: "Payments", icon: <PaymentIcon />, value: 2 },
  { label: "Maintenance", icon: <BuildIcon />, value: 3 },
  { label: "Media", icon: <PhotoLibraryIcon />, value: 4 },
];

const PropertyPage = () => {
  const { id } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const property = exampleProperties.find((p) => p.id === Number(id));
  const isMobile = useMediaQuery("(max-width:600px)");

  // Property not found
  if (!property) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
          p: 2,
        }}
      >
        <Card
          sx={{
            p: 4,
            maxWidth: 400,
            textAlign: "center",
            bgcolor: "#ffc62c",
            border: "1px solid #c59000",
            boxShadow: 3,
            borderRadius: 3,
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 6,
            },
          }}
        >
          <Typography variant="h6" sx={{ color: "#111111", fontWeight: 600 }} gutterBottom>
            Property not found!
          </Typography>
          <Typography variant="body2" sx={{ color: "#2a2a2a" }}>
            The property you are looking for does not exist or has been removed.
          </Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      {/* Centered Property Header & Details */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
        {/* Property Header */}
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: "#111111" }}>
          {property.name}
        </Typography>

        {/* Property Details */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <HomeIcon sx={{ color: "#f8b500" }} fontSize="small" />
            <Typography variant="body2" sx={{ color: "#2a2a2a" }}>
              <strong>Unit:</strong> {property.unit}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <EventIcon sx={{ color: "#f8b500" }} fontSize="small" />
            <Typography variant="body2" sx={{ color: "#2a2a2a" }}>
              <strong>Lease:</strong> {property.lease}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <AttachMoneyIcon sx={{ color: "#f8b500" }} fontSize="small" />
            <Typography variant="body2" sx={{ color: "#2a2a2a" }}>
              <strong>Rent:</strong>
            </Typography>
            <Chip
              label={property.rentStatus}
              sx={{
                bgcolor: property.rentStatus === "Paid" ? "#c59000" : "#ffc62c",
                color: "#111111",
                fontWeight: 500,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                },
              }}
              size="small"
            />
          </Stack>
        </Stack>
      </Box>


      {/* Tabs / Dropdown */}
      {isMobile ? (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            value={tabIndex}
            onChange={(e) => setTabIndex(e.target.value)}
            sx={{
              bgcolor: "#fff",
              color: "#111111",
              "& .MuiSelect-select:hover": { bgcolor: "#ffc62c" },
            }}
          >
            {tabOptions.map((tab) => (
              <MenuItem
                key={tab.value}
                value={tab.value}
                sx={{ "&:hover": { bgcolor: "#f8b500", color: "#111111" } }}
              >
                {tab.icon} {tab.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Tabs
          value={tabIndex}
          onChange={(e, val) => setTabIndex(val)}
          sx={{
            mb: 2,
            "& .MuiTab-root": {
              textTransform: "none",
              color: "#2a2a2a",
              transition: "color 0.2s",
              "&:hover": { color: "#f8b500" },
            },
            "& .Mui-selected": { color: "#f8b500" },
            "& .MuiTabs-indicator": { bgcolor: "#f8b500" },
          }}
        >
          {tabOptions.map((tab) => (
            <Tab key={tab.value} icon={tab.icon} iconPosition="start" label={tab.label} />
          ))}
        </Tabs>
      )}

      {/* Tab Panels */}
      {tabIndex === 0 && <PropertyOverview property={property} />}
      {tabIndex === 1 && <PropertyDocuments documents={property.documents} />}
      {tabIndex === 2 && <PaymentsCard payments={property.payments} />}
      {tabIndex === 3 && <MaintenanceCard maintenance={property.maintenance} />}
      {tabIndex === 4 && <PropertyMedia media={property.media} />}
    </Box>
  );
};

export default PropertyPage;
