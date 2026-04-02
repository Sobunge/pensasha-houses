package com.pensasha.backend.modules.user;

public enum Permissions {


    // ===================== PROPERTY =====================
    PROPERTY_CREATE,
    PROPERTY_VIEW,
    PROPERTY_UPDATE,
    PROPERTY_DELETE,

    // ===================== TENANT =====================
    TENANT_VIEW,
    TENANT_CREATE,
    TENANT_UPDATE,
    TENANT_DELETE,
    TENANT_APPROVE,

    // ===================== RENT / PAYMENT =====================
    RENT_PAY,
    RENT_VIEW,
    RENT_UPDATE, // replaces confirm payment (more flexible)

    // ===================== INVOICE =====================
    INVOICE_CREATE,
    INVOICE_VIEW,
    INVOICE_UPDATE,
    INVOICE_DELETE,
    INVOICE_GENERATE,

    // ===================== MAINTENANCE =====================
    MAINTENANCE_CREATE,
    MAINTENANCE_VIEW,
    MAINTENANCE_UPDATE,
    MAINTENANCE_ASSIGN,
    MAINTENANCE_DELETE,

    // ===================== CARETAKER =====================
    CARETAKER_CREATE,
    CARETAKER_VIEW,
    CARETAKER_UPDATE,
    CARETAKER_DELETE,

    // ===================== LANDLORD =====================
    LANDLORD_VIEW,
    LANDLORD_CREATE,
    LANDLORD_UPDATE,
    LANDLORD_DELETE,

    // ===================== DOCUMENT =====================
    DOCUMENT_CREATE,
    DOCUMENT_VIEW,
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

    // ===================== ADMIN =====================
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