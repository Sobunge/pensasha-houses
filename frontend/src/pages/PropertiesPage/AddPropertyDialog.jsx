import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stepper, Step, 
  StepLabel, Button, Stack, Box, Typography, Chip, Autocomplete, Table, 
  TableBody, TableCell, TableHead, TableRow, InputAdornment, Switch, 
  FormControlLabel, Paper, Divider, Tooltip, IconButton
} from "@mui/material";

// Icons
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LayersIcon from '@mui/icons-material/Layers';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PoolIcon from '@mui/icons-material/Pool';
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';

// Import the hook
import { usePropertyForm } from "../../components/hooks/usePropertyForm";

const STEPS = ["Identity", "Configuration", "Amenities", "Unit Matrix"];
const COMMON_AMENITIES = ["WiFi", "Parking", "Security", "Pool", "Gym", "Borehole", "Backup Generator"];

const AddPropertyDialog = ({ open, onClose, onSuccess, userId, initialProperty = null }) => {
  // Use the hook to handle all the logic previously defined locally
  const {
    activeStep,
    formData,
    loading,
    isEditMode,
    bulkRent,
    setBulkRent,
    handleNext,
    handleBack,
    handleReset,
    updateFormData,
    handleUnitChange,
    applyBulkRent,
    submitForm
  } = usePropertyForm(userId, initialProperty, onSuccess, onClose);

  return (
    <Dialog 
      open={open} 
      onClose={handleReset} 
      fullWidth 
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <IconButton
        aria-label="close"
        onClick={handleReset}
        sx={{
          position: 'absolute',
          right: 16,
          top: 16,
          color: (theme) => theme.palette.grey[500],
          '&:hover': { color: '#d32f2f', bgcolor: 'rgba(211, 47, 47, 0.04)' }
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <Box sx={{ 
          bgcolor: isEditMode ? 'secondary.main' : 'primary.main', 
          color: 'white', p: 1, borderRadius: 2, display: 'flex' 
        }}>
          {isEditMode ? <EditNoteIcon /> : <BusinessIcon />}
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={800}>
            {isEditMode ? "Edit Property" : "Register Property"}
          </Typography>
          <Typography variant="caption" color="text.secondary">Step {activeStep + 1}: {STEPS[activeStep]}</Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ py: 3, '& .MuiStepLabel-label': { fontSize: '0.75rem', fontWeight: 600 } }}>
          {STEPS.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 1, minHeight: "340px" }}>
          {/* STEP 0: IDENTITY */}
          {activeStep === 0 && (
            <Stack spacing={3}>
              <Typography variant="subtitle2" fontWeight={700} color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MapsHomeWorkIcon fontSize="small"/> Basic Identification
              </Typography>
              <TextField 
                label="Property Name" fullWidth required 
                value={formData.name} onChange={(e) => updateFormData({ name: e.target.value })}
                InputProps={{ startAdornment: <InputAdornment position="start"><BusinessIcon fontSize="small" color="action"/></InputAdornment> }}
                placeholder="e.g., Riverside Apartments"
              />
              <TextField 
                label="Physical Location" fullWidth required 
                value={formData.location} onChange={(e) => updateFormData({ location: e.target.value })}
                InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon fontSize="small" color="action"/></InputAdornment> }}
                placeholder="e.g., Westlands, Nairobi"
              />
            </Stack>
          )}

          {/* STEP 1: CONFIGURATION */}
          {activeStep === 1 && (
            <Stack spacing={3}>
              <TextField 
                label="Property Description" multiline rows={3} fullWidth 
                value={formData.description} onChange={(e) => updateFormData({ description: e.target.value })}
                placeholder="Briefly describe the property..."
              />
              
              <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
                <FormControlLabel
                  control={<Switch checked={formData.isHighRise} onChange={(e) => updateFormData({ isHighRise: e.target.checked })} />}
                  label={<Typography fontWeight={700}>High-Rise Layout</Typography>}
                />
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                  Enable this for buildings with multiple floors to auto-generate unit numbers.
                </Typography>

                {formData.isHighRise ? (
                  <Stack direction="row" spacing={2}>
                    <TextField 
                        label="Floors" type="number" fullWidth size="small" value={formData.floors} 
                        onChange={(e) => updateFormData({ floors: parseInt(e.target.value) || 1 })}
                        InputProps={{ startAdornment: <InputAdornment position="start"><LayersIcon fontSize="small"/></InputAdornment> }}
                    />
                    <TextField 
                        label="Units Per Floor" type="number" fullWidth size="small" value={formData.unitsPerFloor} 
                        onChange={(e) => updateFormData({ unitsPerFloor: parseInt(e.target.value) || 1 })}
                        InputProps={{ startAdornment: <InputAdornment position="start"><ApartmentIcon fontSize="small"/></InputAdornment> }}
                    />
                  </Stack>
                ) : (
                  <TextField 
                    label="Total Number of Units" type="number" fullWidth size="small" value={formData.numOfUnits} 
                    onChange={(e) => updateFormData({ numOfUnits: parseInt(e.target.value) || 1 })} 
                  />
                )}
              </Paper>
            </Stack>
          )}

          {/* STEP 2: AMENITIES */}
          {activeStep === 2 && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PoolIcon fontSize="small" color="primary"/> Features & Amenities
                </Typography>
                <Autocomplete
                  multiple options={COMMON_AMENITIES} freeSolo value={formData.amenities}
                  onChange={(e, val) => updateFormData({ amenities: val })}
                  renderTags={(value, getTagProps) => value.map((option, index) => (
                    <Chip variant="soft" color="primary" label={option} {...getTagProps({ index })} />
                  ))}
                  renderInput={(params) => <TextField {...params} placeholder="Type or select..." label="Select Amenities" />}
                />
              </Box>
              
              <Divider sx={{ my: 1 }}>
                <Chip label="FINANCIALS" size="small" sx={{ fontSize: '0.65rem', fontWeight: 900 }} />
              </Divider>

              <TextField 
                label="Standard Monthly Rent" type="number"
                helperText="This will pre-fill all units in the next step"
                value={bulkRent} onChange={(e) => setBulkRent(e.target.value)}
                InputProps={{ 
                  startAdornment: <InputAdornment position="start"><PaidIcon color="success"/></InputAdornment>,
                  endAdornment: <InputAdornment position="end">KES</InputAdornment> 
                }}
              />
            </Stack>
          )}

          {/* STEP 3: UNIT MATRIX */}
          {activeStep === 3 && (
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                    <Typography variant="h6" fontWeight={800}>{formData.units.length} Units</Typography>
                    <Typography variant="caption" color="text.secondary">Review individual unit pricing</Typography>
                </Box>
                <Tooltip title="Reset all to base rent">
                    <Button size="small" startIcon={<ReplayIcon />} onClick={applyBulkRent}>Sync Prices</Button>
                </Tooltip>
              </Stack>

              <Paper variant="outlined" sx={{ maxHeight: '380px', overflowY: 'auto', borderRadius: 2 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f4f4f4' }}>Unit Number</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f4f4f4' }}>Monthly Rent</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f4f4f4' }} align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formData.units.map((unit, index) => (
                      <TableRow key={index} hover>
                        <TableCell sx={{ width: '30%' }}>
                          <TextField 
                            variant="standard" fullWidth size="small" value={unit.unitNumber} 
                            onChange={(e) => handleUnitChange(index, "unitNumber", e.target.value)} 
                          />
                        </TableCell>
                        <TableCell>
                          <TextField 
                            variant="standard" fullWidth size="small" type="number" value={unit.rentAmount} 
                            onChange={(e) => handleUnitChange(index, "rentAmount", e.target.value)}
                            InputProps={{ startAdornment: <Typography variant="caption" sx={{ mr: 1 }}>KES</Typography> }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Chip label={unit.status || "Vacant"} size="small" variant="outlined" color="success" icon={<CheckCircleIcon sx={{ fontSize: '1rem !important' }} />} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
        <Button 
            onClick={handleReset} 
            color="error" 
            startIcon={<DeleteSweepIcon />}
            sx={{ fontWeight: 800, textTransform: 'none', '&:hover': { bgcolor: '#fff5f5' } }}
        >
          {isEditMode ? "Cancel Changes" : "Discard Listing"}
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        
        {activeStep !== 0 && (
          <Button 
            disabled={loading} onClick={handleBack} 
            startIcon={<ArrowBackIcon />} sx={{ fontWeight: 700, mr: 1 }}
          >
            Back
          </Button>
        )}

        <Button 
          onClick={activeStep === STEPS.length - 1 ? submitForm : handleNext} 
          variant="contained" 
          disabled={loading} 
          endIcon={activeStep === STEPS.length - 1 ? (loading ? null : <CheckCircleIcon />) : <ArrowForwardIcon />}
          sx={{ 
            borderRadius: 2, 
            px: 4, 
            fontWeight: 800,
            textTransform: 'none',
            boxShadow: isEditMode ? '0 4px 14px 0 rgba(156, 39, 176, 0.39)' : '0 4px 14px 0 rgba(0,118,255,0.39)'
          }}
        >
          {loading ? "Processing..." : activeStep === STEPS.length - 1 ? (isEditMode ? "Save Changes" : "Finish & Create") : "Continue"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPropertyDialog;