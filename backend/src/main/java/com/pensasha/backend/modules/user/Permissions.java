package com.pensasha.backend.modules.user;

public enum Permissions {

    // ===================== PROPERTY & UNITS =====================
    PROPERTY_CREATE,
    PROPERTY_VIEW,
    PROPERTY_UPDATE,
    PROPERTY_DELETE,
    UNIT_CREATE,
    UNIT_VIEW,
    UNIT_UPDATE,
    UNIT_DELETE,

    // ===================== TENANT =====================
    TENANT_VIEW,
    TENANT_CREATE,
    TENANT_UPDATE,
    TENANT_DELETE,
    TENANT_APPROVE,

    // ===================== CARETAKER =====================
    CARETAKER_CREATE,
    CARETAKER_VIEW,
    CARETAKER_UPDATE,
    CARETAKER_DELETE,
    CARETAKER_ASSIGN, // Assign caretaker to specific property/unit

    // ===================== LANDLORD =====================
    LANDLORD_VIEW,
    LANDLORD_CREATE,
    LANDLORD_UPDATE,
    LANDLORD_DELETE,

    // ===================== RENT / PAYMENT / INVOICE =====================
    RENT_PAY,
    RENT_VIEW,
    RENT_UPDATE,
    INVOICE_CREATE,
    INVOICE_VIEW,
    INVOICE_UPDATE,
    INVOICE_DELETE,
    INVOICE_GENERATE,
    RECEIPT_VIEW,      // Download/view rent payment receipts
    RECEIPT_GENERATE,  // Generate payment receipts

    // ===================== LEASE & AGREEMENTS =====================
    LEASE_CREATE,
    LEASE_VIEW,
    LEASE_UPDATE,
    LEASE_TERMINATE,

    // ===================== MAINTENANCE =====================
    MAINTENANCE_CREATE,
    MAINTENANCE_VIEW,
    MAINTENANCE_UPDATE,
    MAINTENANCE_ASSIGN,
    MAINTENANCE_CANCEL, // Tenant/Landlord cancels pending request
    MAINTENANCE_DELETE,

    // ===================== DOCUMENT =====================
    DOCUMENT_CREATE,
    DOCUMENT_VIEW,
    DOCUMENT_UPDATE, // Replace existing files/leases
    DOCUMENT_DELETE,

    // ===================== MESSAGE =====================
    MESSAGE_SEND,
    MESSAGE_VIEW,
    MESSAGE_DELETE,

    // ===================== ANNOUNCEMENT =====================
    ANNOUNCEMENT_CREATE,
    ANNOUNCEMENT_VIEW,
    ANNOUNCEMENT_UPDATE,
    ANNOUNCEMENT_DELETE,

    // ===================== REPORT =====================
    REPORT_VIEW,
    REPORT_GENERATE,

    // ===================== USER & ROLE MANAGEMENT =====================
    USER_CREATE,
    USER_VIEW,
    USER_UPDATE,
    USER_DELETE,

    ROLE_CREATE,
    ROLE_VIEW,
    ROLE_UPDATE,
    ROLE_DELETE,

    SYSTEM_CONFIG_VIEW,
    SYSTEM_CONFIG_UPDATE
}