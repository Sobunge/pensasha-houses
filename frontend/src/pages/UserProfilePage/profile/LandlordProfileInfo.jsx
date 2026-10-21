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
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        p: { xs: 1.5, sm: 2 },
        border: "1px solid rgba(226, 232, 240, 0.8)",
        boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.05)",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
      }}
    >
      <Grid container spacing={1.5}>
        {/* PROPERTIES OWNED */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: "12px",
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              height: "100%",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                borderColor: "rgba(212, 175, 55, 0.5)",
                boxShadow: "0 8px 20px rgba(212, 175, 55, 0.12)",
                transform: "translateY(-1px)",
                "& .icon-box": {
                  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                  color: "#D4AF37",
                  transform: "scale(1.05)",
                },
              },
            }}
          >
            {/* Premium Icon Container */}
            <Box
              className="icon-box"
              sx={{
                width: 38,
                height: 38,
                borderRadius: "8px",
                bgcolor: "rgba(212, 175, 55, 0.1)",
                color: "#B48A1D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.25s ease",
              }}
            >
              <HomeWorkOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#475569",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                  fontSize: "0.725rem",
                  display: "block",
                  lineHeight: 1.2,
                  mb: 0.8,
                }}
              >
                Properties Owned ({properties.length})
              </Typography>

              {properties.length > 0 ? (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                  {properties.map((property) => (
                    <Chip
                      key={property.id || property.name}
                      icon={<HomeWorkOutlinedIcon sx={{ fontSize: "0.875rem !important", color: "#D4AF37 !important" }} />}
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
              p: 1.5,
              borderRadius: "12px",
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              height: "100%",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                borderColor: "rgba(212, 175, 55, 0.5)",
                boxShadow: "0 8px 20px rgba(212, 175, 55, 0.12)",
                transform: "translateY(-1px)",
                "& .icon-box": {
                  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                  color: "#D4AF37",
                  transform: "scale(1.05)",
                },
              },
            }}
          >
            {/* Premium Icon Container */}
            <Box
              className="icon-box"
              sx={{
                width: 38,
                height: 38,
                borderRadius: "8px",
                bgcolor: "rgba(212, 175, 55, 0.1)",
                color: "#B48A1D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.25s ease",
              }}
            >
              <AccountBalanceOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#475569",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                  fontSize: "0.725rem",
                  display: "block",
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                Bank Settlement Details
              </Typography>

              {bankDetails ? (
                <Stack spacing={0.5}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "#0F172A",
                      fontSize: "0.875rem",
                      wordBreak: "break-word",
                      lineHeight: 1.3,
                    }}
                  >
                    {bankDetails.bankName || "Bank Name N/A"}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1, mt: 0.3 }}>
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