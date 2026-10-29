// src/components/Profile/AddBankDetailsDialog.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import useUpdateBankDetails from "../../../../components/hooks/landlord/useUpdateBankDetails";

const DESIGN_SYSTEM = {
  colors: {
    primary: "#0F172A",
    gold: "#D4AF37",
    goldLight: "rgba(212, 175, 55, 0.15)",
    border: "#E2E8F0",
    textMuted: "#64748B",
    textDark: "#334155",
    bgAction: "#FAFAFA",
  },
};

export default function AddBankDetailsDialog({ open, handleClose, profile, bankToEdit }) {
  const landlordId = profile?.userId || profile?.id;
  const { colors } = DESIGN_SYSTEM;

  const [form, setForm] = useState({
    id: null,
    bankName: "",
    accountName: "",
    accountNumber: "",
    branchName: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const updateBankMutation = useUpdateBankDetails(landlordId);

  useEffect(() => {
    if (bankToEdit) {
      setForm({
        id: bankToEdit.id || null,
        bankName: bankToEdit.bankName || "",
        accountName: bankToEdit.accountName || "",
        accountNumber: bankToEdit.accountNumber || "",
        branchName: bankToEdit.branchName || "",
      });
    } else {
      setForm({
        id: null,
        bankName: "",
        accountName: "",
        accountNumber: "",
        branchName: "",
      });
    }
    setErrorMessage("");
  }, [bankToEdit, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!form.bankName || !form.accountName || !form.accountNumber) {
      setErrorMessage("Please complete all required bank account fields.");
      return;
    }

    try {
      await updateBankMutation.mutateAsync(form);
      handleClose();
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.message || "Failed to save bank details. Please try again."
      );
    }
  };

  const isEditing = Boolean(form.id);

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#FAFAFA",
      transition: "all 0.2s ease",
      "& fieldset": {
        borderColor: colors.border,
      },
      "&:hover fieldset": {
        borderColor: "#94A3B8",
      },
      "&.Mui-focused": {
        backgroundColor: "#FFFFFF",
        "& fieldset": {
          borderColor: colors.gold,
          borderWidth: "1.5px",
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: colors.textMuted,
      fontWeight: 600,
      fontSize: "0.875rem",
      "&.Mui-focused": {
        color: colors.primary,
        fontWeight: 700,
      },
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "18px",
          border: `1.5px solid ${colors.gold}`,
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)",
          bgcolor: "#FFFFFF",
          overflow: "hidden",
        },
      }}
    >
      {/* HEADER */}
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
              bgcolor: colors.goldLight,
              color: colors.gold,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AccountBalanceOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800} fontSize="1.05rem" lineHeight={1.2}>
              {isEditing ? "Edit Bank Account" : "Add Settlement Bank"}
            </Typography>
            <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "0.75rem" }}>
              Payout destination for rent settlements
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={handleClose}
          sx={{
            color: "#94A3B8",
            padding: "4px",
            "&:hover": { color: "#FFFFFF", bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3, bgcolor: "#FFFFFF" }}>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: "10px", fontSize: "0.825rem" }}>
              {errorMessage}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.2 }}>
            {/* BANK NAME */}
            <TextField
              label="Bank Name"
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              placeholder="e.g. KCB Bank, Equity Bank, NCBA"
              fullWidth
              size="small"
              required
              sx={inputStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBalanceOutlinedIcon sx={{ fontSize: 18, color: colors.textMuted }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* ACCOUNT NAME */}
            <TextField
              label="Account Holder Name"
              name="accountName"
              value={form.accountName}
              onChange={handleChange}
              placeholder="e.g. Samuel Obunge Real Estate"
              fullWidth
              size="small"
              required
              sx={inputStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlinedIcon sx={{ fontSize: 18, color: colors.textMuted }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* ACCOUNT NUMBER */}
            <TextField
              label="Account Number"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              placeholder="e.g. 1234567890"
              fullWidth
              size="small"
              required
              sx={inputStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersOutlinedIcon sx={{ fontSize: 18, color: colors.textMuted }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* BRANCH NAME */}
            <TextField
              label="Branch Name (Optional)"
              name="branchName"
              value={form.branchName}
              onChange={handleChange}
              placeholder="e.g. Kisumu Main Branch"
              fullWidth
              size="small"
              sx={inputStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnOutlinedIcon sx={{ fontSize: 18, color: colors.textMuted }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>

        {/* ACTIONS */}
        <DialogActions
          sx={{
            px: 3,
            pb: 2.5,
            pt: 1.5,
            bgcolor: colors.bgAction,
            borderTop: `1px solid ${colors.border}`,
            justifyContent: "flex-end",
            gap: 1.5,
          }}
        >
          <Button
            onClick={handleClose}
            disabled={updateBankMutation.isPending}
            startIcon={<CancelOutlinedIcon sx={{ fontSize: "18px !important" }} />}
            sx={{
              color: colors.textMuted,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "8px",
              px: 2,
              transition: "all 0.2s ease",
              "& .MuiButton-startIcon": {
                transition: "color 0.2s ease",
              },
              "&:hover": {
                color: "#DC2626",
                bgcolor: "rgba(220, 38, 38, 0.08)",
                "& .MuiButton-startIcon": {
                  color: "#DC2626",
                },
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={updateBankMutation.isPending}
            startIcon={
              updateBankMutation.isPending ? (
                <CircularProgress size={16} sx={{ color: "#FFFFFF" }} />
              ) : (
                <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
              )
            }
            sx={{
              bgcolor: colors.primary,
              color: "#FFFFFF",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "10px",
              px: 2.5,
              py: 0.8,
              "& .MuiButton-startIcon": { color: colors.gold },
              "&:hover": {
                bgcolor: colors.gold,
                color: colors.primary,
                "& .MuiButton-startIcon": { color: colors.primary },
              },
              transition: "all 0.2s ease",
            }}
          >
            {updateBankMutation.isPending
              ? "Saving..."
              : isEditing
              ? "Update Account"
              : "Save Account"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

AddBankDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  profile: PropTypes.object,
  bankToEdit: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bankName: PropTypes.string,
    accountName: PropTypes.string,
    accountNumber: PropTypes.string,
    branchName: PropTypes.string,
  }),
};