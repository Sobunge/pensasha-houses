// src/pages/tenant/PropertiesPage.jsx
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PropertyInfoCard from "../../components/cards/PropertyInfoCard";
import UsersNavbar from "../../components/UsersNavbar";
import TenantSidebar from "../Tenant/TenantSidebar";

function PropertiesPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Example properties (replace with API data)
  const properties = [
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
    media: [
      "/assets/images/house.jpg",
      "/assets/images/house.jpg",
      "/assets/images/house.jpg",
      "/assets/images/house.jpg"
    ],
  },
  {
    id: 2,
    name: "Pensasha Towers",
    unit: "B-102",
    lease: "Feb 2024 – Jan 2025",
    rentStatus: "Paid",
    rentAmount: "Ksh 15,000",
    landlord: { name: "Jane Smith", email: "jane@example.com", phone: "0723456789" },
    caretaker: { name: "Mary Otieno", email: "mary@example.com", phone: "0722003000" },
    documents: ["Lease.pdf"],
    payments: [{ month: "Feb", amount: "Ksh 15,000", status: "Paid" }],
    maintenance: [{ issue: "Broken window", status: "Pending" }],
    media: [
      "/assets/images/house.jpg",
      "/assets/images/house.jpg",
      "/assets/images/house.jpg",
      "/assets/images/house.jpg"
    ],
  },
  {
    id: 3,
    name: "Lakeview Residences",
    unit: "C-405",
    lease: "Mar 2024 – Feb 2025",
    rentStatus: "Pending",
    rentAmount: "Ksh 18,000",
    landlord: { name: "Mike Johnson", email: "mike@example.com", phone: "0734567890" },
    caretaker: { name: "Peter Njoroge", email: "peter@example.com", phone: "0733004000" },
    documents: ["Lease.pdf"],
    payments: [{ month: "Mar", amount: "Ksh 18,000", status: "Pending" }],
    maintenance: [{ issue: "Clogged drain", status: "Resolved" }],
    media: [
      "/assets/images/house.jpg",
      "/assets/images/house.jpg",
      "/assets/images/house.jpg",
      "/assets/images/house.jpg"
    ],
  },
  {
    id: 4,
    name: "Garden Court",
    unit: "D-110",
    lease: "Apr 2024 – Mar 2025",
    rentStatus: "Paid",
    rentAmount: "Ksh 14,000",
    landlord: { name: "Sarah Lee", email: "sarah@example.com", phone: "0745678901" },
    caretaker: { name: "Lucy Wambui", email: "lucy@example.com", phone: "0744005000" },
    documents: ["Lease.pdf"],
    payments: [{ month: "Apr", amount: "Ksh 14,000", status: "Paid" }],
    maintenance: [{ issue: "Broken door", status: "Pending" }],
    media: [
      "/assets/images/house.jpg",
      "/assets/images/house.jpg",
      "/assets/images/house.jpg",
      "/assets/images/house.jpg"
    ],
  },
];


  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar */}
      <UsersNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />

      {/* Sidebar */}
      <TenantSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          mt: 6,
          bgcolor: "#f7f7f7",
          minHeight: "81.11vh",
        }}
      >
        {/* Page Title */}
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Your Properties
        </Typography>

        {/* Property Cards */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2}}>
          {properties.map((property) => (
            <Box
              key={property.id}
              sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%", md: "1 1 30%" } }}
            >
              {/* Property card with navigation handled inside the card */}
              <PropertyInfoCard property={property} />
            </Box>
          ))}
        </Box>

        {/* Optional: Load More / Pagination */}
        {properties.length > 6 && (
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 3,
                "&:hover": { backgroundColor: "#fef2b2", borderColor: "#f8b500" },
              }}
            >
              Load More Properties
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PropertiesPage;
