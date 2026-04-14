import { useState, useEffect, useCallback } from "react";
import api from "../../api/api";

// 1. Move this OUTSIDE the hook so it is a stable reference 
// that doesn't change on re-renders.
const INITIAL_FORM_STATE = {
  name: "",
  description: "",
  location: "",
  isHighRise: false,
  floors: 1,
  unitsPerFloor: 1,
  numOfUnits: 1,
  landLordId: "",
  amenities: [],
  units: []
};

export const usePropertyForm = (userId, initialProperty = null, onSuccess, onClose) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bulkRent, setBulkRent] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const isEditMode = !!initialProperty;

  // 2. Hydration Logic
  useEffect(() => {
    if (initialProperty) {
      setFormData({
        ...INITIAL_FORM_STATE, // Fallback defaults
        ...initialProperty,
        landLordId: userId || initialProperty.landLordId,
        units: initialProperty.units || [],
        amenities: initialProperty.amenities || []
      });
      
      if (initialProperty.units?.length > 0) {
        setBulkRent(initialProperty.units[0].rentAmount || "");
      }
    } else {
      // If no initialProperty, reset to defaults but keep current userId
      setFormData({ ...INITIAL_FORM_STATE, landLordId: userId || "" });
    }
  }, [initialProperty, userId]); // INITIAL_FORM_STATE is now stable outside the hook

  const handleReset = useCallback(() => {
    setActiveStep(0);
    setBulkRent("");
    setFormData({ ...INITIAL_FORM_STATE, landLordId: userId || "" });
    onClose();
  }, [onClose, userId]);

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const generateUnits = () => {
    // Logic: Don't overwrite if editing and units already exist
    if (isEditMode && formData.units.length > 0) return;

    let generatedUnits = [];
    const rent = parseFloat(bulkRent) || 0;

    if (formData.isHighRise) {
      for (let f = 1; f <= formData.floors; f++) {
        for (let u = 1; u <= formData.unitsPerFloor; u++) {
          const unitNum = `${f}${u < 10 ? "0" + u : u}`;
          generatedUnits.push({ unitNumber: unitNum, rentAmount: rent, status: "VACANT" });
        }
      }
    } else {
      generatedUnits = Array.from({ length: formData.numOfUnits }, (_, i) => ({
        unitNumber: `Unit ${i + 1}`,
        rentAmount: rent,
        status: "VACANT"
      }));
    }
    setFormData((prev) => ({ ...prev, units: generatedUnits }));
  };

  const handleNext = () => {
    if (activeStep === 2) generateUnits();
    setActiveStep((prev) => prev + 1);
  };

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleUnitChange = (index, field, value) => {
    const updatedUnits = [...formData.units];
    updatedUnits[index][field] = field === "rentAmount" ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({ ...prev, units: updatedUnits }));
  };

  const applyBulkRent = () => {
    const rent = parseFloat(bulkRent) || 0;
    setFormData((prev) => ({
      ...prev,
      units: prev.units.map((u) => ({ ...u, rentAmount: rent }))
    }));
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      if (isEditMode) {
        await api.put(`/properties/${initialProperty.id}`, formData);
      } else {
        await api.post("/properties", formData);
      }
      onSuccess();
      handleReset();
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.response?.data?.message || "Failed to save property");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};