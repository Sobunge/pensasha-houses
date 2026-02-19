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

    public User getUser() {
        return credentials.getUser();
    }

    public Role getPrimaryRole() {
        return credentials.getUser().getRole();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role = credentials.getUser().getRole().name();
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public String getUsername() {
        return credentials.getUser().getPhoneNumber();
    }

    @Override
    public String getPassword() {
        return credentials.getPassword();
    }

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
