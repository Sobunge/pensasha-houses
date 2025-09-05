// src/pages/RentPayments/PaymentModal.jsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Divider,
  Button,
  TextField,
  Stack,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
};

function PaymentModal({ payment, open, onClose, onPay }) {
  const [formData, setFormData] = useState({
    method: "",
    ref: "",
  });

  useEffect(() => {
    if (payment?.mode === "pay") {
      setFormData({ method: "", ref: "" });
    }
  }, [payment]);

  if (!payment) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.method || !formData.ref) {
      alert("Please select a payment method and enter the transaction reference.");
      return;
    }
    onPay({ ...payment, status: "Paid", ...formData });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            {payment.mode === "pay" ? "Pay Invoice" : "Payment Details"}
          </Typography>
          <Button onClick={onClose} size="small" color="error">
            <CloseIcon />
          </Button>
        </Stack>
        <Divider sx={{ mb: 2 }} />

        {/* Invoice Details */}
        <Typography variant="body1" gutterBottom>
          <ReceiptIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
          <strong>Invoice:</strong> {payment.invoiceNo}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <CreditCardIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
          <strong>Period:</strong> {payment.period}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#4caf50", mt: 1 }}
        >
          <PaymentIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
          Ksh {payment.amount.toLocaleString()}
        </Typography>
        <Typography variant="body2" gutterBottom color="text.secondary">
          Due: {payment.dueDate}
        </Typography>

        {/* Pay Now Form */}
        {payment.mode === "pay" && (
          <Box sx={{ mt: 2 }}>
            <TextField
              select
              label="Payment Method"
              name="method"
              value={formData.method}
              onChange={handleChange}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PaymentIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">Select Method</MenuItem>
              <MenuItem value="Mpesa">Mpesa</MenuItem>
              <MenuItem value="Bank">Bank</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
            </TextField>

            <TextField
              label="Transaction Ref"
              name="ref"
              value={formData.ref}
              onChange={handleChange}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ReceiptIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#4caf50",
                color: "#fff",
                fontWeight: 600,
                "&:hover": { bgcolor: "#388e3c" },
              }}
              startIcon={<CheckCircleIcon />}
              onClick={handleSubmit}
            >
              Confirm Payment
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default PaymentModal;
