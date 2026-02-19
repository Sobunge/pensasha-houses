package com.pensasha.backend.modules.user;

public enum ProfileCompletionStatus {
    BASIC,        // minimal registration
    VERIFIED,     // identity & contact verified
    COMPLETE      // role-specific onboarding done
}