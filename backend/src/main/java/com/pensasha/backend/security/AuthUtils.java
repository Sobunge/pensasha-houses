package com.pensasha.backend.security;

import com.pensasha.backend.modules.user.CustomUserDetails;
import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthUtils {

    /* ========================
       INTERNAL HELPERS
       ======================== */

    private Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    private CustomUserDetails getUserDetails() {

        Authentication authentication = getAuthentication();

        if (authentication == null ||
                !(authentication.getPrincipal() instanceof CustomUserDetails userDetails)) {
            throw new IllegalStateException("No authenticated user found");
        }

        return userDetails;
    }

    /* ========================
       PUBLIC METHODS
       ======================== */

    public User getCurrentUser() {
        return getUserDetails().getUser();
    }

    public Long getCurrentUserId() {
        return getCurrentUser().getId();
    }

    public Role getCurrentUserRole() {
        return getCurrentUser().getRole();
    }

    public boolean hasRole(Role role) {
        return getCurrentUserRole() == role;
    }
}