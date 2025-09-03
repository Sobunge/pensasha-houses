// src/pages/tenant/PropertyPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import UsersNavbar from "../../components/UsersNavbar";
import TenantSidebar from "../Tenant/TenantSidebar";

// Example properties (move to a shared file if needed)
const exampleProperties = [
  { id: 1, name: "Sunrise Apartments", unit: "A-203", lease: "Jan 2024 – Dec 2024", rentStatus: "Pending", rentAmount: "Ksh 12,000" },
  { id: 2, name: "Pensasha Towers", unit: "B-102", lease: "Feb 2024 – Jan 2025", rentStatus: "Paid", rentAmount: "Ksh 15,000" },
  { id: 3, name: "Lakeview Residences", unit: "C-405", lease: "Mar 2024 – Feb 2025", rentStatus: "Pending", rentAmount: "Ksh 18,000" },
  { id: 4, name: "Garden Court", unit: "D-110", lease: "Apr 2024 – Mar 2025", rentStatus: "Paid", rentAmount: "Ksh 14,000" },
];

function PropertyPage() {
  const { id } = useParams();
  const propertyId = Number(id);

  // Safely get the property from shared data
  const property = exampleProperties.find((p) => p.id === propertyId);

  return (
    <Box sx={{ display: "flex" }}>
      <UsersNavbar />
      <TenantSidebar mobileOpen={false} onClose={() => {}} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 6, minHeight: "81.11vh" }}>
        {!property ? (
          <Typography variant="h6" color="error">
            Property not found!
          </Typography>
        ) : (
          <>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {property.name}
            </Typography>
            <Typography>Unit: {property.unit}</Typography>
            <Typography>Lease: {property.lease}</Typography>
            <Typography>Rent Status: {property.rentStatus}</Typography>
            <Typography>Rent Amount: {property.rentAmount}</Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default PropertyPage;
