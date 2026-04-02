package com.pensasha.backend.modules.user;

public enum Permissions {

    // ===================== PROPERTY =====================
    PROPERTY_CREATE,
    PROPERTY_VIEW,
    PROPERTY_UPDATE,
    PROPERTY_DELETE,

    // ===================== TENANT =====================
    TENANT_VIEW,
    TENANT_APPROVE,
    TENANT_MANAGE_PROFILE, // e.g., update tenant info

    // ===================== RENT =====================
    RENT_PAY,
    RENT_VIEW,
    RENT_CONFIRM_PAYMENT,
    RENT_MANAGE_INVOICES, // optional, for admin/landlord actions

    // ===================== MAINTENANCE =====================
    MAINTENANCE_CREATE,
    MAINTENANCE_VIEW,
    MAINTENANCE_ASSIGN,
    MAINTENANCE_RESOLVE,

    // ===================== CARETAKER =====================
    CARETAKER_CREATE,
    CARETAKER_VIEW,
    CARETAKER_ASSIGN_PROPERTY,
    CARETAKER_DELETE,

    // ===================== DOCUMENTS =====================
    DOCUMENT_VIEW,
    DOCUMENT_UPLOAD,
    DOCUMENT_DELETE, // if needed

    // ===================== MESSAGES =====================
    MESSAGE_SEND,
    MESSAGE_VIEW,
    MESSAGE_MANAGE, // e.g., delete, moderate

    // ===================== ANNOUNCEMENTS =====================
    ANNOUNCEMENT_VIEW,
    ANNOUNCEMENT_CREATE,
    ANNOUNCEMENT_DELETE, // if needed

    // ===================== REPORTS =====================
    REPORT_VIEW,
    REPORT_GENERATE, // if applicable

    // ===================== ADMIN =====================
    USER_VIEW,
    USER_CREATE,
    USER_UPDATE,
    USER_DELETE,
    ROLE_VIEW,
    ROLE_CREATE,
    ROLE_UPDATE,
    ROLE_DELETE,
    SYSTEM_SETTINGS_VIEW,
    SYSTEM_SETTINGS_UPDATE
}