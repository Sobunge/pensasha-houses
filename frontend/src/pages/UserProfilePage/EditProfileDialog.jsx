import React from "react";
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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import api from "../../api/api";
import useProfileForm from "../../components/hooks/useProfileForm";

export default function EditProfileDialog({ open, handleClose, profile, refreshProfile }) {
  const { formData, errors, handleChange, handleSubmit, fields } = useProfileForm(profile || {});

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

      return (
        <TextField
          key={field.key}
          label={field.label}
          placeholder={field.placeholder || ""}
          value={parentKey ? formData[parentKey]?.[field.key] ?? "" : formData[field.key] ?? ""}
          onChange={(e) => handleChange(field.key, e.target.value, parentKey, field)}
          fullWidth
          error={Boolean(parentKey ? errors[parentKey]?.[field.key] : errors[field.key])}
          helperText={parentKey ? errors[parentKey]?.[field.key] : errors[field.key]}
        />
      );
    });

  const handleSave = async () => {
    if (!profile?.id) return; // make sure we have an ID

    const payload = handleSubmit();
    if (!payload) return;

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
      await refreshProfile(); // update parent profile
      handleClose();
    } catch (err) {
      console.error("Failed to update profile:", err);
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
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: "#f8b500", width: 40, height: 40 }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography variant="subtitle1" fontWeight={600} component="span">
          Edit Profile
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1.5 }}>
          {renderFields(fields)}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
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
        >
          Cancel
        </Button>
        <Button
          startIcon={<SaveIcon />}
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
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
