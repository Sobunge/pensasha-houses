// src/modules/document/DocumentGlobal.js

export const DOCUMENT_TYPES = {
  // ================= GLOBAL / IDENTITY =================
  NATIONAL_ID: { value: "NATIONAL_ID", label: "National ID", scope: "GLOBAL" },
  PASSPORT: { value: "PASSPORT", label: "Passport", scope: "GLOBAL" },
  KRA_PIN_CERTIFICATE: { value: "KRA_PIN_CERTIFICATE", label: "KRA PIN Certificate", scope: "GLOBAL" },
  NEXT_OF_KIN_FORM: { value: "NEXT_OF_KIN_FORM", label: "Next of Kin Form", scope: "GLOBAL" },

  // ================= LANDLORD SPECIFIC =================
  TITLE_DEED: { value: "TITLE_DEED", label: "Title Deed", scope: "ROLE_SPECIFIC", role: "LANDLORD" },
  PROPERTY_LAND_RATES_RECEIPT: { value: "PROPERTY_LAND_RATES_RECEIPT", label: "Property Land Rates Receipt", scope: "ROLE_SPECIFIC", role: "LANDLORD" },
  BANK_ACCOUNT_CONFIRMATION: { value: "BANK_ACCOUNT_CONFIRMATION", label: "Bank Account Confirmation", scope: "ROLE_SPECIFIC", role: "LANDLORD" },
  POWER_OF_ATTORNEY: { value: "POWER_OF_ATTORNEY", label: "Power of Attorney", scope: "ROLE_SPECIFIC", role: "LANDLORD" },

  // ================= TENANT SPECIFIC ===================
  TENANCY_AGREEMENT: { value: "TENANCY_AGREEMENT", label: "Tenancy Agreement", scope: "ROLE_SPECIFIC", role: "TENANT" },
  EMPLOYMENT_LETTER: { value: "EMPLOYMENT_LETTER", label: "Employment Letter", scope: "ROLE_SPECIFIC", role: "TENANT" },
  RENT_DEPOSIT_RECEIPT: { value: "RENT_DEPOSIT_RECEIPT", label: "Rent Deposit Receipt", scope: "ROLE_SPECIFIC", role: "TENANT" },
  MOVE_IN_CHECKLIST: { value: "MOVE_IN_CHECKLIST", label: "Move-In Checklist", scope: "ROLE_SPECIFIC", role: "TENANT" },

  // ================= CARETAKER SPECIFIC =================
  WORK_CONTRACT: { value: "WORK_CONTRACT", label: "Work Contract", scope: "ROLE_SPECIFIC", role: "CARETAKER" },
  POLICE_CLEARANCE_CERTIFICATE: { value: "POLICE_CLEARANCE_CERTIFICATE", label: "Police Clearance Certificate", scope: "ROLE_SPECIFIC", role: "CARETAKER" },
  MAINTENANCE_LOG: { value: "MAINTENANCE_LOG", label: "Maintenance Log", scope: "ROLE_SPECIFIC", role: "CARETAKER" },
};

export class DocumentGlobal {
  /**
   * Retrieves all document types allowed for a given active workspace role.
   * Always includes GLOBAL documents.
   * @param {string} role - e.g., "TENANT", "LANDLORD", "CARETAKER"
   */
  static getDocumentTypesByRole(role) {
    const activeRole = (role || "").toUpperCase();

    return Object.values(DOCUMENT_TYPES).filter((doc) => {
      if (doc.scope === "GLOBAL") return true;
      return doc.role === activeRole;
    });
  }

  /**
   * Helper to format an enum value or object into a human-readable string.
   * Handles string values returned from the backend (e.g. "TENANCY_AGREEMENT" -> "Tenancy Agreement").
   */
  static getLabel(typeValue) {
    if (DOCUMENT_TYPES[typeValue]) {
      return DOCUMENT_TYPES[typeValue].label;
    }
    // Fallback formatting if unknown string is received
    return typeValue ? typeValue.replace(/_/g, " ") : "Document";
  }
}

export default DocumentGlobal;