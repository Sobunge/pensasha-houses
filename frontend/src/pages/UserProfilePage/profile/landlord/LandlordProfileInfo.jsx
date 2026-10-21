// src/components/Profile/LandlordProfileInfo.jsx
import React, { useState } from "react";
import { Box, Typography, Grid, Chip, Stack, Button } from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddBankDetailsDialog from "../../profile/landlord/AddBankDetailsDialog";

export default function LandlordProfileInfo({ profile }) {
  const [openBankDialog, setOpenBankDialog] = useState(false);
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
        {/* PROPERTIES OWNED CARD */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 1.75,
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
                boxShadow: "0 8px 20px rgba(212, 175, 55, 0.08)",
                transform: "translateY(-1px)",
                "& .icon-box": {
                  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                  color: "#D4AF37",
                  transform: "scale(1.03)",
                },
              },
            }}
          >
            <Box
              className="icon-box"
              sx={{
                width: 36,
                height: 36,
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
                  color: "#64748B",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                  fontSize: "0.7rem",
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
                      icon={
                        <HomeWorkOutlinedIcon
                          sx={{ fontSize: "0.8rem !important", color: "#D4AF37 !important" }}
                        />
                      }
                      label={property.name || "Property"}
                      size="small"
                      sx={{
                        bgcolor: "#0F172A",
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: "0.725rem",
                        borderRadius: "6px",
                        border: "1px solid rgba(212, 175, 55, 0.3)",
                      }}
                    />
                  ))}
                </Stack>
              ) : (
                <Chip
                  label="No Properties Registered"
                  size="small"
                  sx={{
                    bgcolor: "rgba(100, 116, 139, 0.08)",
                    color: "#64748B",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    borderRadius: "6px",
                  }}
                />
              )}
            </Box>
          </Box>
        </Grid>

        {/* BANK SETTLEMENT DETAILS CARD */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 1.75,
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
                boxShadow: "0 8px 20px rgba(212, 175, 55, 0.08)",
                transform: "translateY(-1px)",
                "& .icon-box": {
                  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                  color: "#D4AF37",
                  transform: "scale(1.03)",
                },
              },
            }}
          >
            <Box
              className="icon-box"
              sx={{
                width: 36,
                height: 36,
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
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#64748B",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                    fontSize: "0.7rem",
                    display: "block",
                    lineHeight: 1.2,
                  }}
                >
                  Bank Settlement Details
                </Typography>

                {/* Edit Button when details already exist */}
                {bankDetails && (
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setOpenBankDialog(true)}
                    startIcon={<EditOutlinedIcon sx={{ fontSize: "13px !important" }} />}
                    sx={{
                      color: "#B48A1D",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "none",
                      p: 0,
                      minWidth: 0,
                      "&:hover": { color: "#0F172A", bgcolor: "transparent" },
                    }}
                  >
                    Edit
                  </Button>
                )}
              </Stack>

              {bankDetails ? (
                <Stack spacing={0.5}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "#0F172A",
                      fontSize: "0.85rem",
                      wordBreak: "break-word",
                      lineHeight: 1.3,
                    }}
                  >
                    {bankDetails.bankName || "Bank Name N/A"}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1, mt: 0.2 }}>
                    {bankDetails.accountName && (
                      <Chip
                        label={`Acc: ${bankDetails.accountName}`}
                        size="small"
                        sx={{
                          bgcolor: "rgba(212, 175, 55, 0.08)",
                          color: "#0F172A",
                          fontWeight: 700,
                          fontSize: "0.68rem",
                          borderRadius: "5px",
                          border: "1px solid rgba(212, 175, 55, 0.25)",
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
                          fontSize: "0.68rem",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  </Stack>
                </Stack>
              ) : (
                /* Premium Soft Yellow Button with Explicit Citing Text */
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setOpenBankDialog(true)}
                  startIcon={
                    <AddCardOutlinedIcon
                      sx={{ color: "#B45309", fontSize: "16px !important", transition: "transform 0.2s" }}
                    />
                  }
                  sx={{
                    mt: 0.2,
                    bgcolor: "#FEF9C3",
                    color: "#854D0E",
                    fontWeight: 700,
                    fontSize: "0.725rem",
                    textTransform: "none",
                    py: 0.7,
                    px: 1.5,
                    borderRadius: "8px",
                    border: "1.5px solid #FDE047",
                    boxShadow: "0 2px 6px rgba(250, 204, 21, 0.15)",
                    "&:hover": {
                      bgcolor: "#FEF08A",
                      borderColor: "#EAB308",
                      color: "#713F12",
                      boxShadow: "0 4px 12px rgba(234, 179, 8, 0.25)",
                      transform: "translateY(-1px)",
                      "& .MuiButton-startIcon .MuiSvgIcon-root": {
                        transform: "scale(1.1)",
                      },
                    },
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Click to add bank details
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Add / Edit Dialog */}
      {openBankDialog && (
        <AddBankDetailsDialog
          open={openBankDialog}
          handleClose={() => setOpenBankDialog(false)}
          profile={profile}
        />
      )}
    </Box>
  );
}