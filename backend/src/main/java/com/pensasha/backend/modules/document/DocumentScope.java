package com.pensasha.backend.modules.document;

public enum DocumentScope {
    GLOBAL,       // Visible across all profile views (e.g., National ID, KRA PIN, Passport)
    ROLE_SPECIFIC // Visible ONLY when logged into the matching workspace view (e.g., Title Deed for Landlord, Lease for Tenant)
}