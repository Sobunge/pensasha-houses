package com.pensasha.backend.modules.user;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserDetails implements UserDetails {

    private final UserCredentials credentials;

    public CustomUserDetails(UserCredentials credentials) {
        this.credentials = credentials;
    }

    /* ===================== DOMAIN ACCESS ===================== */

    public User getUser() {
        return credentials.getUser();
    }

    /* ===================== AUTHORITIES ===================== */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Role inferred by inheritance, not enums
        String role = credentials.getUser()
                                 .getClass()
                                 .getSimpleName()
                                 .toUpperCase();

        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    /* ===================== AUTH ===================== */

    @Override
    public String getUsername() {
        // Login identifier
        return credentials.getUser().getIdNumber();
    }

    @Override
    public String getPassword() {
        return credentials.getPassword();
    }

    /* ===================== ACCOUNT STATE ===================== */

    @Override
    public boolean isAccountNonExpired() {
        return credentials.getAccountExpirationDate() == null ||
               credentials.getAccountExpirationDate().isAfter(LocalDateTime.now());
    }

    @Override
    public boolean isAccountNonLocked() {
        return !credentials.isLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentials.getPasswordExpirationDate() == null ||
               credentials.getPasswordExpirationDate().isAfter(LocalDateTime.now());
    }

    @Override
    public boolean isEnabled() {
        return credentials.isEnabled();
    }
}
