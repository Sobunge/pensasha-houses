// src/components/cards/TenantSummaryCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const tenants = [
  {
    name: "John Doe",
    unit: "A-203",
    property: "Sunrise Apartments",
    rentStatus: "Paid",
  },
  {
    name: "Jane Wanjiku",
    unit: "B-102",
    property: "Pensasha Towers",
    rentStatus: "Pending",
  },
  {
    name: "Ali Mwinyi",
    unit: "C-405",
    property: "Lakeview Residences",
    rentStatus: "Paid",
  },
];

function TenantSummaryCard() {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        background: "linear-gradient(135deg, #ffffff, #fafafa)",
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: "#111",
            letterSpacing: 0.5,
          }}
        >
          Tenant Summary
        </Typography>

        {/* Tenant List */}
        <Stack spacing={3}>
          {tenants.map((tenant, index) => (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                {/* Left: Avatar + Tenant Info */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#f8b500",
                      color: "#111",
                      width: 40,
                      height: 40,
                    }}
                  >
                    <PersonIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, color: "#2a2a2a" }}
                    >
                      {tenant.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#555", fontSize: "0.85rem" }}
                    >
                      {tenant.unit} · {tenant.property}
                    </Typography>
                  </Box>
                </Box>

                {/* Right: Rent Status */}
                <Chip
                  label={tenant.rentStatus}
                  color={tenant.rentStatus === "Paid" ? "success" : "error"}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    px: 1,
                    textTransform: "capitalize",
                  }}
                />
              </Box>

              {/* Divider (not after last tenant) */}
              {index < tenants.length - 1 && (
                <Divider sx={{ borderColor: "#eee" }} />
              )}
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TenantSummaryCard;
