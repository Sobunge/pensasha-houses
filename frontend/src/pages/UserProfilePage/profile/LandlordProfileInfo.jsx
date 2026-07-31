// src/components/Profile/LandlordProfileInfo.jsx
import React from "react";
import { Box, Typography, Grid, Chip, Stack } from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

export default function LandlordProfileInfo({ profile }) {
  const properties = profile?.properties || [];
  const bankDetails = profile?.bankDetails;

  return (
    <Box
      sx={{
        bgcolor: "#F8FAFC",
        borderRadius: "14px",
        p: { xs: 2.5, sm: 3 },
        border: "1px solid #E2E8F0",
      }}
    >
      <Grid container spacing={2.5}>
        {/* PROPERTIES OWNED */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              height: "100%",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#D4AF37",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.12)",
              },
            }}
          >
            {/* Gold Icon Container */}
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "10px",
                bgcolor: "rgba(212, 175, 55, 0.12)",
                color: "#D4AF37",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <HomeWorkOutlinedIcon fontSize="small" />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#64748B",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  fontSize: "0.68rem",
                  display: "block",
                  mb: 1,
                }}
              >
                Properties Owned ({properties.length})
              </Typography>

              {properties.length > 0 ? (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                  {properties.map((property) => (
                    <Chip
                      key={property.id || property.name}
                      icon={<HomeWorkOutlinedIcon sx={{ fontSize: "1rem !important", color: "#D4AF37 !important" }} />}
                      label={property.name || "Property"}
                      size="small"
                      sx={{
                        bgcolor: "#0F172A",
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(212, 175, 55, 0.4)",
                      }}
                    />
                  ))}
                </Stack>
              ) : (
                <Chip
                  label="No Properties Registered"
                  size="small"
                  sx={{
                    bgcolor: "rgba(100, 116, 139, 0.1)",
                    color: "#64748B",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    borderRadius: "6px",
                  }}
                />
              )}
            </Box>
          </Box>
        </Grid>

        {/* BANK DETAILS */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              height: "100%",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#D4AF37",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.12)",
              },
            }}
          >
            {/* Gold Icon Container */}
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "10px",
                bgcolor: "rgba(212, 175, 55, 0.12)",
                color: "#D4AF37",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <AccountBalanceOutlinedIcon fontSize="small" />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#64748B",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  fontSize: "0.68rem",
                  display: "block",
                  mb: 0.8,
                }}
              >
                Bank Settlement Details
              </Typography>

              {bankDetails ? (
                <Stack spacing={0.5}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: "#0F172A", wordBreak: "break-word" }}
                  >
                    {bankDetails.bankName || "Bank Name N/A"}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1, mt: 0.5 }}>
                    {bankDetails.accountName && (
                      <Chip
                        label={`Acc: ${bankDetails.accountName}`}
                        size="small"
                        sx={{
                          bgcolor: "rgba(212, 175, 55, 0.1)",
                          color: "#0F172A",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          borderRadius: "6px",
                          border: "1px solid rgba(212, 175, 55, 0.3)",
                        }}
                      />
                    )}
                    {bankDetails.accountNumber && (
                      <Chip
                        label={`No: ${bankDetails.accountNumber}`}
                        size="small"
                        sx={{
                          bgcolor: "#F1F5F9",
                          color: "#475569",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                  </Stack>
                </Stack>
              ) : (
                <Chip
                  label="No Bank Details Provided"
                  size="small"
                  sx={{
                    bgcolor: "rgba(100, 116, 139, 0.1)",
                    color: "#64748B",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    borderRadius: "6px",
                  }}
                />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}