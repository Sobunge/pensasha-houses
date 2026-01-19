import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Box,
  Avatar,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";

import api from "../../api/api";
import useProfileForm from "../../components/hooks/useProfileForm";

export default function EditProfileDialog({
  open,
  handleClose,
  profile,
  refreshProfile,
}) {
  const { formData, errors, handleChange, handleSubmit, fields } =
    useProfileForm(profile || {});
  const [loading, setLoading] = useState(false);

  const renderFields = (fields, parentKey = null) =>
    fields.map((field) => {
      if (field.nested) {
        return (
          <Box key={field.key} sx={{ pl: parentKey ? 3 : 0 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, fontWeight: 600, color: "text.secondary" }}
            >
              {field.label}
            </Typography>
            <Stack spacing={2}>{renderFields(field.nested, field.key)}</Stack>
          </Box>
        );
      }

      const value = parentKey
        ? formData[parentKey]?.[field.key] ?? ""
        : formData[field.key] ?? "";
      const error = parentKey ? errors[parentKey]?.[field.key] : errors[field.key];

      return (
        <TextField
          key={field.key}
          label={field.label}
          placeholder={field.placeholder || ""}
          value={value}
          onChange={(e) => handleChange(field.key, e.target.value, parentKey, field)}
          error={Boolean(error)}
          helperText={error}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "rgba(0,0,0,0.02)",
              transition: "all 0.2s ease",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
              "&.Mui-focused": {
                backgroundColor: "#fff",
                boxShadow: "0 0 0 2px rgba(248,181,0,0.25)",
              },
            },
            "& .MuiInputLabel-root": { fontWeight: 500 },
          }}
        />
      );
    });

  const handleSave = async () => {
    if (!profile?.id) return;

    const payload = handleSubmit();
    if (!payload) return;

    setLoading(true);
    try {
      let endpoint;
      switch (profile.role) {
        case "TENANT":
          endpoint = `/tenants/${profile.id}`;
          break;
        case "LANDLORD":
          endpoint = `/landlords/${profile.id}`;
          break;
        case "CARETAKER":
          endpoint = `/caretakers/${profile.id}`;
          break;
        case "ADMIN":
          endpoint = `/admins/${profile.id}`;
          break;
        default:
          throw new Error("Unknown role");
      }

      await api.put(endpoint, payload);
      await refreshProfile();
      handleClose();
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 3, p: 1.5 } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          textAlign: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "#f8b500", width: 40, height: 40 }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography variant="subtitle1" fontWeight={600}>
          Edit Profile
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.5} sx={{ mt: 2 }}>
          {renderFields(fields)}
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          startIcon={<CloseIcon />}
          onClick={handleClose}
          sx={{
            bgcolor: "#f44336",
            color: "#fff",
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#d32f2f" },
          }}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          startIcon={loading ? <CircularProgress size={18} /> : <SaveIcon />}
          variant="contained"
          onClick={handleSave}
          sx={{
            bgcolor: "#f8b500",
            color: "#111",
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#c59000" },
          }}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
