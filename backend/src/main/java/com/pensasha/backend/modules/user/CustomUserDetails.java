package com.pensasha.backend.modules.user;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * Custom UserDetails implementation for Spring Security using entity-based
 * roles and permissions.
 */
public class CustomUserDetails implements UserDetails {

    private final UserCredentials credentials;

    public CustomUserDetails(UserCredentials credentials) {
        this.credentials = credentials;
    }

    public User getUser() {
        return credentials.getUser();
    }

    /**
     * Returns the primary role (first role) for convenience.
     */
    public Role getPrimaryRole() {
        return credentials.getUser().getRoles().stream().findFirst().orElse(null);
    }

    /**
     * Returns all roles and permissions as Spring Security authorities.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        User user = credentials.getUser();

        return user.getRoles().stream()
                .flatMap(role -> {
                    // Single ROLE_<role> authority as a stream
                    var roleAuthorityStream = java.util.stream.Stream.of(
                            new SimpleGrantedAuthority("ROLE_" + role.getName()));

                    // Permissions as a stream
                    var permAuthorityStream = role.getPermissions()
                            .stream()
                            .map(p -> new SimpleGrantedAuthority(p.getName()));

                    // Concatenate role + permissions into a single stream
                    return java.util.stream.Stream.concat(roleAuthorityStream, permAuthorityStream);
                })
                .collect(Collectors.toSet());
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
        LocalDateTime expiration = credentials.getAccountExpirationDate();
        return expiration == null || expiration.isAfter(LocalDateTime.now());
    }

    @Override
    public boolean isAccountNonLocked() {
        return !credentials.isLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        LocalDateTime pwdExpiration = credentials.getPasswordExpirationDate();
        return pwdExpiration == null || pwdExpiration.isAfter(LocalDateTime.now());
    }

    @Override
    public boolean isEnabled() {
        return credentials.isEnabled();
    }
}