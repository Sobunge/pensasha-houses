// src/components/Profile/landlord/AddBankDetailsDialog.jsx
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
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import useUpdateBankDetails from "../../../../components/hooks/landlord/useUpdateBankDetails";

export default function AddBankDetailsDialog({ open, handleClose, profile, bankToEdit }) {
  const theme = useTheme();
  const landlordId = profile?.userId || profile?.id;

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
      const validationMsg = "Please complete all required bank account fields.";
      setErrorMessage(validationMsg);

      window.dispatchEvent(
        new CustomEvent("app-notification", {
          detail: {
            message: validationMsg,
            severity: "warning",
            duration: 4000,
          },
        })
      );
      return;
    }

    const isEditing = Boolean(form.id);

    try {
      await updateBankMutation.mutateAsync(form);

      window.dispatchEvent(
        new CustomEvent("app-notification", {
          detail: {
            message: isEditing
              ? "Bank account updated successfully."
              : "Bank account added successfully.",
            severity: "success",
            duration: 4000,
          },
        })
      );

      handleClose();
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Failed to save bank details. Please try again.";
      setErrorMessage(errorMsg);

      window.dispatchEvent(
        new CustomEvent("app-notification", {
          detail: {
            message: errorMsg,
            severity: "error",
            duration: 5000,
          },
        })
      );
    }
  };

  const isEditing = Boolean(form.id);

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: `${theme.shape.borderRadius}px`,
      backgroundColor: theme.palette.action.hover,
      transition: "all 0.2s ease",
      "& fieldset": {
        borderColor: theme.palette.divider,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.disabled,
      },
      "&.Mui-focused": {
        backgroundColor: theme.palette.background.paper,
        "& fieldset": {
          borderColor: theme.palette.secondary.main,
          borderWidth: "1.5px",
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
      fontWeight: 600,
      fontSize: "0.875rem",
      "&.Mui-focused": {
        color: theme.palette.primary.main,
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
          borderRadius: `${theme.shape.borderRadius * 2}px`,
          border: `1.5px solid ${theme.palette.secondary.main}`,
          boxShadow: `0 20px 40px ${theme.palette.primary.main}33`,
          bgcolor: theme.palette.background.paper,
          overflow: "hidden",
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
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
              borderRadius: `${theme.shape.borderRadius}px`,
              bgcolor: `${theme.palette.secondary.main}26`,
              color: theme.palette.secondary.main,
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
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: "0.75rem" }}>
              Payout destination for rent settlements
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={handleClose}
          sx={{
            color: theme.palette.text.secondary,
            padding: "4px",
            "&:hover": { color: theme.palette.common.white, bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3, bgcolor: theme.palette.background.paper }}>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: `${theme.shape.borderRadius}px`, fontSize: "0.825rem" }}>
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
                    <AccountBalanceOutlinedIcon sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
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
                    <PersonOutlinedIcon sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
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
                    <NumbersOutlinedIcon sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
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
                    <LocationOnOutlinedIcon sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
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
            bgcolor: theme.palette.action.hover,
            borderTop: `1px solid ${theme.palette.divider}`,
            justifyContent: "flex-end",
            gap: 1.5,
          }}
        >
          <Button
            onClick={handleClose}
            disabled={updateBankMutation.isPending}
            startIcon={<CancelOutlinedIcon sx={{ fontSize: "18px !important" }} />}
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: `${theme.shape.borderRadius}px`,
              px: 2,
              transition: "all 0.2s ease",
              "& .MuiButton-startIcon": {
                transition: "color 0.2s ease",
              },
              "&:hover": {
                color: theme.palette.error?.main || "#EF4444",
                bgcolor: `${theme.palette.error?.main || "#EF4444"}14`,
                "& .MuiButton-startIcon": {
                  color: theme.palette.error?.main || "#EF4444",
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
                <CircularProgress size={16} sx={{ color: theme.palette.common.white }} />
              ) : (
                <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
              )
            }
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: `${theme.shape.borderRadius}px`,
              px: 2.5,
              py: 0.8,
              "& .MuiButton-startIcon": { color: theme.palette.secondary.main },
              "&:hover": {
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                "& .MuiButton-startIcon": { color: theme.palette.primary.main },
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