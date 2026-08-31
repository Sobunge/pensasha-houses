package com.pensasha.backend.auth;

import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.dto.AuthPrincipalDTO;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class AuthPrincipalFactory {

    public AuthPrincipalDTO create(User user) {

        Set<String> roles = mapRoles(user);
        Set<String> permissions = (user.getPermissions() != null) 
                ? user.getPermissions() 
                : Collections.emptySet();

        return new AuthPrincipalDTO(
                user.getId(),
                user.getPublicId(),
                user.getFirstName(),
                roles,
                permissions,
                resolveDefaultRoute(roles)
        );
    }

    private Set<String> mapRoles(User user) {
        if (user.getRoles() == null) {
            return Collections.emptySet();
        }
        return user.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toUnmodifiableSet());
    }

    private String resolveDefaultRoute(Set<String> roles) {

        if (roles.contains("ADMIN")) {
            return "/admin/dashboard";
        }

        if (roles.contains("LANDLORD")) {
            return "/landlord/dashboard";
        }

        return "/dashboard";
    }
}