package com.pensasha.backend.security;

import com.pensasha.backend.modules.user.CustomUserDetails;
import com.pensasha.backend.modules.user.User;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class AuthUtils {

    public User getUser(Authentication authentication) {
        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();
        return userDetails.getUser();
    }

    public Long getUserId(Authentication authentication) {
        return getUser(authentication).getId();
    }

    public String getRole(Authentication authentication) {
        return getUser(authentication).getRole().name();
    }
}