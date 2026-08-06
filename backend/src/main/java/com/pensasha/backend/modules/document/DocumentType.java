package com.pensasha.backend.modules.document;

import lombok.Getter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public enum DocumentType {

    // ================= GLOBAL / IDENTITY =================
    NATIONAL_ID(DocumentScope.GLOBAL, null),
    PASSPORT(DocumentScope.GLOBAL, null),
    KRA_PIN_CERTIFICATE(DocumentScope.GLOBAL, null),
    NEXT_OF_KIN_FORM(DocumentScope.GLOBAL, null),

    // ================= LANDLORD SPECIFIC =================
    TITLE_DEED(DocumentScope.ROLE_SPECIFIC, "LANDLORD"),
    PROPERTY_LAND_RATES_RECEIPT(DocumentScope.ROLE_SPECIFIC, "LANDLORD"),
    BANK_ACCOUNT_CONFIRMATION(DocumentScope.ROLE_SPECIFIC, "LANDLORD"),
    POWER_OF_ATTORNEY(DocumentScope.ROLE_SPECIFIC, "LANDLORD"),

    // ================= TENANT SPECIFIC ===================
    TENANCY_AGREEMENT(DocumentScope.ROLE_SPECIFIC, "TENANT"),
    EMPLOYMENT_LETTER(DocumentScope.ROLE_SPECIFIC, "TENANT"),
    RENT_DEPOSIT_RECEIPT(DocumentScope.ROLE_SPECIFIC, "TENANT"),
    MOVE_IN_CHECKLIST(DocumentScope.ROLE_SPECIFIC, "TENANT"),

    // ================= CARETAKER SPECIFIC =================
    WORK_CONTRACT(DocumentScope.ROLE_SPECIFIC, "CARETAKER"),
    POLICE_CLEARANCE_CERTIFICATE(DocumentScope.ROLE_SPECIFIC, "CARETAKER"),
    MAINTENANCE_LOG(DocumentScope.ROLE_SPECIFIC, "CARETAKER");

    private final DocumentScope scope;
    private final String requiredRole; // Null for GLOBAL documents

    DocumentType(DocumentScope scope, String requiredRole) {
        this.scope = scope;
        this.requiredRole = requiredRole;
    }

    /**
     * Returns all DocumentTypes accessible for a specific active workspace role.
     * Includes all GLOBAL documents plus ROLE_SPECIFIC documents matching the role.
     */
    public static List<DocumentType> getForRole(String role) {
        return Arrays.stream(values())
                .filter(type -> type.scope == DocumentScope.GLOBAL || 
                        (type.requiredRole != null && type.requiredRole.equalsIgnoreCase(role)))
                .collect(Collectors.toList());
    }
}