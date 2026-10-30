// src/components/Profile/landlord/EditPaymentPreferencesDialog.jsx
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Box,
    Typography,
    Divider,
    Grid,
    CircularProgress,
    Alert,
    useTheme,
} from "@mui/material";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../../../api/api";
import useProfile from "../../../../components/hooks/profile/useProfile";

const AVAILABLE_PAYMENT_METHODS = [
    { id: "MPESA_C2B_PAYBILL", label: "M-Pesa C2B Paybill" },
    { id: "MPESA_STK_PUSH", label: "M-Pesa STK Push" },
    { id: "BANK_TRANSFER", label: "Bank Transfer (Pesalink / EFT)" },
    { id: "BANK_DEPOSIT", label: "Bank Deposit Slip" },
    { id: "CASH", label: "Cash Payment to Caretaker" },
];

export default function EditPaymentPreferencesDialog({ open, handleClose, profile }) {
    const theme = useTheme();
    const { refreshProfile } = useProfile();

    const [selectedMethods, setSelectedMethods] = useState([]);
    const [paybillNumber, setPaybillNumber] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [tillNumber, setTillNumber] = useState("");
    const [mpesaPhone, setMpesaPhone] = useState("");
    const [cashInstructions, setCashInstructions] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Sync initial state when dialog opens or profile changes
    useEffect(() => {
        if (profile) {
            setSelectedMethods(profile.acceptedPaymentMethods || []);
            setPaybillNumber(profile.mpesaPaybillNumber || "");
            setAccountNumber(profile.mpesaAccountNumber || "");
            setTillNumber(profile.mpesaTillNumber || "");
            setMpesaPhone(profile.mpesaPhoneNumber || "");
            setCashInstructions(profile.cashPaymentInstructions || "");
        }
    }, [profile, open]);

    const handleToggleMethod = useCallback((methodId) => {
        setSelectedMethods((prev) =>
            prev.includes(methodId)
                ? prev.filter((m) => m !== methodId)
                : [...prev, methodId]
        );
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const payload = {
            acceptedPaymentMethods: selectedMethods,
            mpesaPaybillNumber: paybillNumber,
            mpesaAccountNumber: accountNumber,
            mpesaTillNumber: tillNumber,
            mpesaPhoneNumber: mpesaPhone,
            cashPaymentInstructions: cashInstructions,
        };

        try {
            const userId = profile?.userId || profile?.id;
            await api.put(`/landlords/${userId}/payment-preferences`, payload);
            if (refreshProfile) {
                await refreshProfile();
            }
            handleClose();
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Failed to update payment preferences. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const primaryBtnStyle = {
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
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: `${theme.shape.borderRadius * 2}px`,
                    border: `1.5px solid ${theme.palette.secondary.main}`,
                    boxShadow: `0 20px 40px ${theme.palette.primary.main}33`,
                    width: "100%",
                    maxWidth: "520px",
                    mx: "auto",
                    bgcolor: theme.palette.background.paper,
                },
            }}
        >
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
                        <PaymentsOutlinedIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={800} fontSize="1.1rem">
                        Payment Preferences
                    </Typography>
                </Box>

                <Button
                    onClick={handleClose}
                    sx={{
                        minWidth: 0,
                        p: 0.5,
                        color: theme.palette.text.secondary,
                        "&:hover": { color: theme.palette.common.white },
                    }}
                >
                    <CloseIcon fontSize="small" />
                </Button>
            </DialogTitle>

            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent sx={{ p: 3, bgcolor: theme.palette.background.paper }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2.5, borderRadius: `${theme.shape.borderRadius}px` }}>
                            {error}
                        </Alert>
                    )}

                    {/* ACCEPTED PAYMENT CHANNELS */}
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 800,
                                mb: 0.5,
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Accepted Tenant Payment Channels
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: theme.palette.text.secondary, display: "block" }}
                        >
                            Select all payment options tenants are permitted to use when paying rent.
                        </Typography>
                    </Box>

                    <FormGroup sx={{ mb: 3, display: "flex", alignItems: "center" }}>
                        <Grid container spacing={1} justifyContent="center" sx={{ width: "100%" }}>
                            {AVAILABLE_PAYMENT_METHODS.map((method) => (
                                <Grid item xs={12} sm={6} key={method.id} sx={{ display: "flex", justifyContent: { xs: "flex-start", sm: "center" } }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedMethods.includes(method.id)}
                                                onChange={() => handleToggleMethod(method.id)}
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    "&.Mui-checked": { color: theme.palette.secondary.main },
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                                color={theme.palette.text.primary}
                                            >
                                                {method.label}
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </FormGroup>

                    <Divider sx={{ mb: 3, borderColor: theme.palette.divider }} />

                    {/* ROUTING & COLLECTION DETAILS */}
                    <Box sx={{ textAlign: "left", mb: 2 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 800,
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Collection Shortcodes & Instructions
                        </Typography>
                    </Box>

                    {/* FLEXBOX LAYOUT FOR 100% FULL-WIDTH INPUT FIELDS */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
                        {/* ROW 1 */}
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, width: "100%" }}>
                            <Box sx={{ flex: 1, width: "100%" }}>
                                <TextField
                                    fullWidth
                                    label="M-Pesa Paybill Number"
                                    placeholder="e.g. 400200"
                                    value={paybillNumber}
                                    onChange={(e) => setPaybillNumber(e.target.value)}
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: `${theme.shape.borderRadius}px`,
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1, width: "100%" }}>
                                <TextField
                                    fullWidth
                                    label="Account Prefix / Format"
                                    placeholder="e.g. PEN-101"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: `${theme.shape.borderRadius}px`,
                                        },
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* ROW 2 */}
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, width: "100%" }}>
                            <Box sx={{ flex: 1, width: "100%" }}>
                                <TextField
                                    fullWidth
                                    label="Buy Goods Till Number"
                                    placeholder="e.g. 9876543"
                                    value={tillNumber}
                                    onChange={(e) => setTillNumber(e.target.value)}
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: `${theme.shape.borderRadius}px`,
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1, width: "100%" }}>
                                <TextField
                                    fullWidth
                                    label="M-Pesa Phone Number"
                                    placeholder="e.g. 254712345678"
                                    value={mpesaPhone}
                                    onChange={(e) => setMpesaPhone(e.target.value)}
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: `${theme.shape.borderRadius}px`,
                                        },
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* ROW 3 (TEXTAREA) */}
                        <Box sx={{ width: "100%" }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Cash Payment Instructions"
                                placeholder="e.g. Cash is accepted strictly at the estate management office against an official receipt."
                                value={cashInstructions}
                                onChange={(e) => setCashInstructions(e.target.value)}
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: `${theme.shape.borderRadius}px`,
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </DialogContent>

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
                        disabled={submitting}
                        startIcon={<CloseOutlinedIcon sx={{ fontSize: "18px !important" }} />}
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
                        disabled={submitting}
                        startIcon={
                            submitting ? (
                                <CircularProgress size={16} sx={{ color: theme.palette.common.white }} />
                            ) : (
                                <SaveOutlinedIcon />
                            )
                        }
                        sx={primaryBtnStyle}
                    >
                        {submitting ? "Saving..." : "Save Preferences"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

EditPaymentPreferencesDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        acceptedPaymentMethods: PropTypes.arrayOf(PropTypes.string),
        mpesaPaybillNumber: PropTypes.string,
        mpesaAccountNumber: PropTypes.string,
        mpesaTillNumber: PropTypes.string,
        mpesaPhoneNumber: PropTypes.string,
        cashPaymentInstructions: PropTypes.string,
    }),
};