package com.pensasha.backend.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.pensasha.backend.modules.user.User;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {

    // The User entity that this UserPrincipal represents
    private final User user;

    // Constructor that accepts a User entity
    public UserPrincipal(User user) {
        this.user = user; // Store the user object passed in the constructor
    }

    // Return a list of authorities (roles/permissions) assigned to the user
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // Currently no authorities are assigned; modify if roles/permissions are needed
    }

    // Return the password of the user
    @Override
    public String getPassword() {
        return user.getPassword(); // Return the user's password stored in the User entity
    }

    // Return the username of the user
    @Override
    public String getUsername() {
        return user.getIdNumber(); // Assuming ID number is used as a unique identifier for the user (username)
    }

    // Return whether the user's account has expired
    @Override
    public boolean isAccountNonExpired() {
        return true; // This implementation assumes the account never expires, modify if necessary
    }

    // Return whether the user's account is locked
    @Override
    public boolean isAccountNonLocked() {
        return true; // This implementation assumes the account is never locked, modify if necessary
    }

    // Return whether the user's credentials have expired
    @Override
    public boolean isCredentialsNonExpired() {
        return true; // This implementation assumes the credentials never expire, modify if necessary
    }

    // Return whether the user's account is enabled
    @Override
    public boolean isEnabled() {
        return user.isEnabled(); // Return the `isEnabled` status from the User entity
    }
}
