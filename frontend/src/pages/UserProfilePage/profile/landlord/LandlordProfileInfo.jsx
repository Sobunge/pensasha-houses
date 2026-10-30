// src/components/Profile/landlord/LandlordProfileInfo.jsx
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { 
  Box, 
  Typography, 
  Chip, 
  Stack, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  IconButton,
  CircularProgress 
} from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CloseIcon from "@mui/icons-material/Close";

import AddBankDetailsDialog from "./AddBankDetailsDialog";
import EditPaymentPreferencesDialog from "./EditPaymentPreferencesDialog";
import { useDeleteBankDetail } from "../../../../components/hooks/landlord/useDeleteBankDetail";

// Clean Design System Constants
const DESIGN_SYSTEM = {
  colors: {
    primary: "#0F172A",
    primaryLight: "#1E293B",
    gold: "#D4AF37",
    goldDark: "#B48A1D",
    goldLight: "rgba(212, 175, 55, 0.12)",
    goldBorder: "rgba(212, 175, 55, 0.35)",
    border: "#E2E8F0",
    textMuted: "#64748B",
    textHeader: "#0F172A",
    bgSubtle: "#F8FAFC",
    error: "#EF4444",
    errorLight: "rgba(239, 68, 68, 0.08)",
  },
};

const PAYMENT_METHOD_MAP = {
  MPESA_C2B_PAYBILL: "M-Pesa Paybill",
  MPESA_STK_PUSH: "M-Pesa STK Push",
  BANK_TRANSFER: "Bank Transfer",
  BANK_DEPOSIT: "Bank Deposit",
  CASH: "Cash",
};

const formatPaymentMethod = (method) =>
  PAYMENT_METHOD_MAP[method] || method.replace(/_/g, " ");

// Shared Card Wrapper Component
function ProfileInfoCard({ icon: Icon, title, action, children }) {
  const { colors } = DESIGN_SYSTEM;

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: "14px",
        bgcolor: "#FFFFFF",
        border: `1px solid ${colors.border}`,
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        width: "100%",
        boxSizing: "border-box",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)",
        "&:hover": {
          borderColor: "rgba(212, 175, 55, 0.6)",
          boxShadow: "0 10px 25px rgba(212, 175, 55, 0.12)",
          transform: "translateY(-2px)",
          "& .icon-box": {
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
            color: colors.gold,
            transform: "scale(1.05)",
          },
        },
      }}
    >
      <Box
        className="icon-box"
        sx={{
          width: 42,
          height: 42,
          borderRadius: "10px",
          bgcolor: colors.goldLight,
          color: colors.goldDark,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.3s ease",
          mt: 0.25,
        }}
      >
        <Icon sx={{ fontSize: 22 }} />
      </Box>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1.25 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 4,
                height: 14,
                bgcolor: colors.gold,
                borderRadius: "2px",
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                color: colors.textHeader,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 0.9,
                fontSize: "0.8rem",
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
          </Box>
          {action}
        </Stack>
        {children}
      </Box>
    </Box>
  );
}

ProfileInfoCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default function LandlordProfileInfo({ profile }) {
  const [openBankDialog, setOpenBankDialog] = useState(false);
  const [selectedBankToEdit, setSelectedBankToEdit] = useState(null);
  const [openPaymentPrefsDialog, setOpenPaymentPrefsDialog] = useState(false);

  // Custom Delete Confirmation Dialog State
  const [bankToDelete, setBankToDelete] = useState(null);

  // Initialize TanStack Query mutation hook
  const deleteBankMutation = useDeleteBankDetail();

  const { colors } = DESIGN_SYSTEM;

  const userId = profile?.id || profile?.userId;
  const properties = useMemo(() => profile?.properties || [], [profile]);

  const bankDetailsList = useMemo(() => {
    if (!profile?.bankDetails) return [];
    return Array.isArray(profile.bankDetails)
      ? profile.bankDetails
      : Array.from(profile.bankDetails);
  }, [profile]);

  const acceptedMethods = useMemo(
    () => profile?.acceptedPaymentMethods || [],
    [profile]
  );

  const handleOpenAddBank = () => {
    setSelectedBankToEdit(null);
    setOpenBankDialog(true);
  };

  const handleOpenEditBank = (bank) => {
    setSelectedBankToEdit(bank);
    setOpenBankDialog(true);
  };

  // Open confirmation modal
  const handlePromptDeleteBank = (bank) => {
    setBankToDelete(bank);
  };

  // Execute deletion
  const handleConfirmDelete = () => {
    if (!bankToDelete || !userId) return;
    deleteBankMutation.mutate(
      { userId, bankId: bankToDelete.id },
      {
        onSuccess: () => {
          setBankToDelete(null);
        },
      }
    );
  };

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "18px",
        p: { xs: 2, sm: 2.5 },
        border: `1px solid ${colors.border}`,
        boxShadow: "0 12px 35px -10px rgba(15, 23, 42, 0.06)",
        background: `linear-gradient(180deg, #FFFFFF 0%, ${colors.bgSubtle} 100%)`,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxSizing: "border-box",
      }}
    >
      {/* SECTION 1: PROPERTIES OWNED */}
      <Box sx={{ width: "100%" }}>
        <ProfileInfoCard
          icon={HomeWorkOutlinedIcon}
          title={`Properties Owned (${properties.length})`}
        >
          {properties.length > 0 ? (
            <Stack direction="row" flexWrap="wrap" useFlexGap sx={{ gap: 1, width: "100%" }}>
              {properties.map((property) => (
                <Chip
                  key={property.id || property.name}
                  icon={
                    <HomeWorkOutlinedIcon
                      sx={{
                        fontSize: "0.85rem !important",
                        color: `${colors.gold} !important`,
                      }}
                    />
                  }
                  label={property.name || "Property"}
                  size="small"
                  sx={{
                    bgcolor: colors.primary,
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    borderRadius: "8px",
                    border: `1px solid ${colors.goldBorder}`,
                    px: 0.5,
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
                color: colors.textMuted,
                fontWeight: 700,
                fontSize: "0.725rem",
                borderRadius: "8px",
              }}
            />
          )}
        </ProfileInfoCard>
      </Box>

      {/* SECTION 2: BANK SETTLEMENT DETAILS */}
      <Box sx={{ width: "100%" }}>
        <ProfileInfoCard
          icon={AccountBalanceOutlinedIcon}
          title={`Bank Accounts (${bankDetailsList.length})`}
          action={
            <Button
              size="small"
              variant="contained"
              onClick={handleOpenAddBank}
              startIcon={<AddCardOutlinedIcon sx={{ fontSize: "14px !important" }} />}
              sx={{
                bgcolor: colors.goldLight,
                color: colors.goldDark,
                fontSize: "0.725rem",
                fontWeight: 800,
                textTransform: "none",
                py: 0.4,
                px: 1.2,
                borderRadius: "8px",
                border: `1px solid ${colors.goldBorder}`,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: colors.gold,
                  color: colors.primary,
                },
              }}
            >
              Add Bank
            </Button>
          }
        >
          {bankDetailsList.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 1.25,
                mt: 1,
                maxHeight: "280px",
                overflowY: "auto",
                pr: 0.5,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {bankDetailsList.map((bank, index) => (
                <Box
                  key={bank.id || index}
                  sx={{
                    p: 1.5,
                    borderRadius: "10px",
                    bgcolor: colors.bgSubtle,
                    border: `1px solid ${colors.border}`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 1.25,
                    width: "100%",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: colors.goldBorder,
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 800,
                        color: colors.primary,
                        fontSize: "0.825rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {bank.bankName || "Bank N/A"}
                      {bank.branchName && (
                        <Box
                          component="span"
                          sx={{
                            fontWeight: 500,
                            color: colors.textMuted,
                            fontSize: "0.7rem",
                            ml: 0.5,
                          }}
                        >
                          ({bank.branchName})
                        </Box>
                      )}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: colors.textMuted,
                        display: "block",
                        mt: 0.5,
                        fontSize: "0.725rem",
                        fontWeight: 600,
                      }}
                    >
                      {bank.accountName ? `${bank.accountName} - ` : ""}
                      <Box component="span" sx={{ color: colors.primary, fontWeight: 700 }}>
                        {bank.accountNumber}
                      </Box>
                    </Typography>
                  </Box>

                  {/* Action Buttons: Edit & Delete */}
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleOpenEditBank(bank)}
                      startIcon={<EditOutlinedIcon sx={{ fontSize: "11px !important" }} />}
                      sx={{
                        borderColor: colors.border,
                        color: colors.goldDark,
                        fontSize: "0.685rem",
                        fontWeight: 700,
                        textTransform: "none",
                        py: 0.15,
                        px: 1,
                        minWidth: 0,
                        borderRadius: "6px",
                        "&:hover": {
                          borderColor: colors.gold,
                          color: colors.primary,
                          bgcolor: colors.goldLight,
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={deleteBankMutation.isPending && bankToDelete?.id === bank.id}
                      onClick={() => handlePromptDeleteBank(bank)}
                      startIcon={<DeleteOutlineOutlinedIcon sx={{ fontSize: "11px !important" }} />}
                      sx={{
                        borderColor: colors.border,
                        color: colors.error,
                        fontSize: "0.685rem",
                        fontWeight: 700,
                        textTransform: "none",
                        py: 0.15,
                        px: 1,
                        minWidth: 0,
                        borderRadius: "6px",
                        "&:hover": {
                          borderColor: colors.error,
                          bgcolor: colors.errorLight,
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                p: 2,
                borderRadius: "10px",
                bgcolor: colors.bgSubtle,
                border: `1px dashed ${colors.border}`,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                mt: 0.5,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: colors.textMuted, fontSize: "0.8rem", fontWeight: 600 }}
              >
                No bank accounts configured for settlement.
              </Typography>
            </Box>
          )}
        </ProfileInfoCard>
      </Box>

      {/* SECTION 3: ACCEPTED PAYMENT METHODS */}
      <Box sx={{ width: "100%" }}>
        <ProfileInfoCard
          icon={PaymentsOutlinedIcon}
          title="Accepted Tenant Payment Methods & Routing"
          action={
            <Button
              size="small"
              variant="text"
              onClick={() => setOpenPaymentPrefsDialog(true)}
              startIcon={<EditOutlinedIcon sx={{ fontSize: "14px !important" }} />}
              sx={{
                color: colors.goldDark,
                fontSize: "0.75rem",
                fontWeight: 800,
                textTransform: "none",
                p: 0,
                minWidth: 0,
                "&:hover": { color: colors.primary, bgcolor: "transparent" },
              }}
            >
              {acceptedMethods.length > 0 ? "Edit Preferences" : "Configure"}
            </Button>
          }
        >
          {acceptedMethods.length > 0 ? (
            <Stack spacing={1.5} sx={{ mt: 0.5, width: "100%" }}>
              <Stack direction="row" flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                {acceptedMethods.map((method) => (
                  <Chip
                    key={method}
                    label={formatPaymentMethod(method)}
                    size="small"
                    sx={{
                      bgcolor: colors.primary,
                      color: colors.gold,
                      fontWeight: 700,
                      fontSize: "0.725rem",
                      borderRadius: "8px",
                      border: `1px solid ${colors.goldBorder}`,
                      px: 0.5,
                    }}
                  />
                ))}
              </Stack>

              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "10px",
                  bgcolor: colors.bgSubtle,
                  border: `1px solid ${colors.border}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Stack
                  direction="row"
                  spacing={3}
                  flexWrap="wrap"
                  sx={{ gap: 2, justifyContent: "center" }}
                >
                  {profile?.mpesaPaybillNumber && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.85rem",
                        color: colors.primaryLight,
                        textAlign: "center",
                      }}
                    >
                      <Box component="span" sx={{ fontWeight: 800, color: colors.primary }}>
                        Paybill:
                      </Box>{" "}
                      {profile.mpesaPaybillNumber}{" "}
                      {profile?.mpesaAccountNumber ? `(Acc: ${profile.mpesaAccountNumber})` : ""}
                    </Typography>
                  )}
                  {profile?.mpesaTillNumber && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.85rem",
                        color: colors.primaryLight,
                        textAlign: "center",
                      }}
                    >
                      <Box component="span" sx={{ fontWeight: 800, color: colors.primary }}>
                        Till Number:
                      </Box>{" "}
                      {profile.mpesaTillNumber}
                    </Typography>
                  )}
                  {profile?.mpesaPhoneNumber && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.85rem",
                        color: colors.primaryLight,
                        textAlign: "center",
                      }}
                    >
                      <Box component="span" sx={{ fontWeight: 800, color: colors.primary }}>
                        M-Pesa Phone:
                      </Box>{" "}
                      {profile.mpesaPhoneNumber}
                    </Typography>
                  )}
                </Stack>

                {profile?.cashPaymentInstructions && (
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      color: colors.textMuted,
                      fontStyle: "italic",
                      borderTop: `1px dashed ${colors.border}`,
                      pt: 1,
                      mt: 0.5,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{ fontStyle: "normal", fontWeight: 800, color: colors.primary }}
                    >
                      Cash Note:
                    </Box>{" "}
                    {profile.cashPaymentInstructions}
                  </Typography>
                )}
              </Box>
            </Stack>
          ) : (
            <Box
              sx={{
                p: 2,
                borderRadius: "10px",
                bgcolor: "rgba(241, 245, 249, 0.6)",
                border: "1px dashed #CBD5E1",
                textAlign: "center",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: colors.textMuted, fontSize: "0.825rem", fontWeight: 600 }}
              >
                No payment collection preferences configured yet.
              </Typography>
            </Box>
          )}
        </ProfileInfoCard>
      </Box>

      {/* THEME-ALIGNED DELETE CONFIRMATION DIALOG */}
      <Dialog
        open={Boolean(bankToDelete)}
        onClose={() => !deleteBankMutation.isPending && setBankToDelete(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "18px",
            border: `1.5px solid ${colors.error}`,
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)",
            bgcolor: "#FFFFFF",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: colors.primary,
            color: "#FFFFFF",
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "8px",
                bgcolor: colors.errorLight,
                color: colors.error,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WarningAmberRoundedIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={800} fontSize="1.05rem" lineHeight={1.2}>
                Confirm Deletion
              </Typography>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "0.75rem" }}>
                Action cannot be undone
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={() => setBankToDelete(null)}
            disabled={deleteBankMutation.isPending}
            sx={{
              color: "#94A3B8",
              padding: "4px",
              "&:hover": { color: "#FFFFFF", bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, bgcolor: "#FFFFFF", textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: colors.textHeader, fontWeight: 600, fontSize: "0.925rem" }}>
            Are you sure you want to delete <Box component="span" sx={{ fontWeight: 800, color: colors.primary }}>{bankToDelete?.bankName || "this bank account"}</Box>?
          </Typography>
          <Typography variant="caption" sx={{ display: "block", color: colors.textMuted, mt: 1 }}>
            Account Number: {bankToDelete?.accountNumber}
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2.5,
            pt: 1.5,
            bgcolor: colors.bgSubtle,
            borderTop: `1px solid ${colors.border}`,
            justifyContent: "flex-end",
            gap: 1.5,
          }}
        >
          <Button
            onClick={() => setBankToDelete(null)}
            disabled={deleteBankMutation.isPending}
            sx={{
              color: colors.textMuted,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "8px",
              px: 2,
              "&:hover": { bgcolor: "rgba(100, 116, 139, 0.08)" },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={deleteBankMutation.isPending}
            onClick={handleConfirmDelete}
            startIcon={
              deleteBankMutation.isPending ? (
                <CircularProgress size={16} sx={{ color: "#FFFFFF" }} />
              ) : (
                <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
              )
            }
            sx={{
              bgcolor: colors.error,
              color: "#FFFFFF",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "10px",
              px: 2.5,
              py: 0.8,
              "&:hover": {
                bgcolor: "#DC2626",
              },
            }}
          >
            {deleteBankMutation.isPending ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add / Edit Bank Dialog */}
      {openBankDialog && (
        <AddBankDetailsDialog
          open={openBankDialog}
          handleClose={() => setOpenBankDialog(false)}
          profile={profile}
          bankToEdit={selectedBankToEdit}
        />
      )}

      {/* Edit Payment Preferences Dialog */}
      {openPaymentPrefsDialog && (
        <EditPaymentPreferencesDialog
          open={openPaymentPrefsDialog}
          handleClose={() => setOpenPaymentPrefsDialog(false)}
          profile={profile}
        />
      )}
    </Box>
  );
}

LandlordProfileInfo.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
      })
    ),
    bankDetails: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    acceptedPaymentMethods: PropTypes.arrayOf(PropTypes.string),
    mpesaPaybillNumber: PropTypes.string,
    mpesaAccountNumber: PropTypes.string,
    mpesaTillNumber: PropTypes.string,
    mpesaPhoneNumber: PropTypes.string,
    cashPaymentInstructions: PropTypes.string,
  }),
};