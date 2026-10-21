// src/components/Profile/AddBankDetailsDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import useUpdateBankDetails from "../../../../components/hooks/landlord/useUpdateBankDetails";

export default function AddBankDetailsDialog({ open, handleClose, profile }) {
  const landlordId = profile?.id;
  const existingBank = profile?.bankDetails;

  const [form, setForm] = useState({
    bankName: existingBank?.bankName || "",
    accountName: existingBank?.accountName || "",
    accountNumber: existingBank?.accountNumber || "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const updateBankMutation = useUpdateBankDetails(landlordId);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!form.bankName || !form.accountName || !form.accountNumber) {
      setErrorMessage("Please complete all bank detail fields.");
      return;
    }

    try {
      await updateBankMutation.mutateAsync(form);
      handleClose();
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Failed to update bank details.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)",
          bgcolor: "#FFFFFF",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 800,
          textAlign: "center",
          px: 3,
          py: 2,
          color: "#0F172A",
          borderBottom: "1px solid #F1F5F9",
          position: "relative",
          fontSize: "1.05rem",
        }}
      >
        {existingBank ? "Edit Bank Details" : "Add Settlement Bank"}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 10,
            color: "#64748B",
            "&:hover": { color: "#EF4444" },
          }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            {errorMessage && (
              <Alert severity="error" sx={{ borderRadius: "8px", fontSize: "0.8rem" }}>
                {errorMessage}
              </Alert>
            )}

            <TextField
              label="Bank Name"
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              placeholder="e.g., KCB Bank, Equity Bank"
              fullWidth
              size="small"
              required
            />

            <TextField
              label="Account Name"
              name="accountName"
              value={form.accountName}
              onChange={handleChange}
              placeholder="e.g., John Doe Properties"
              fullWidth
              size="small"
              required
            />

            <TextField
              label="Account Number"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              placeholder="e.g., 1234567890"
              fullWidth
              size="small"
              required
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 2.5, pb: 2, pt: 1, gap: 1 }}>
          <Button
            onClick={handleClose}
            startIcon={<CancelOutlinedIcon sx={{ fontSize: 18 }} />}
            sx={{
              bgcolor: "rgba(239, 68, 68, 0.08)",
              color: "#EF4444",
              borderRadius: "8px",
              px: 2,
              fontWeight: 700,
              fontSize: "0.8rem",
              textTransform: "none",
              "&:hover": { bgcolor: "#EF4444", color: "#FFFFFF" },
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
                <CircularProgress size={16} color="inherit" />
              ) : (
                <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
              )
            }
            sx={{
              bgcolor: "#0F172A",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.8rem",
              textTransform: "none",
              borderRadius: "8px",
              px: 2.5,
              "&:hover": { bgcolor: "#D4AF37", color: "#0F172A" },
            }}
          >
            {updateBankMutation.isPending ? "Saving..." : "Save Details"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}