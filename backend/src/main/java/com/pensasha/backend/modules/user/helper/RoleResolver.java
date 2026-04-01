package com.pensasha.backend.modules.user.helper;

import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.RoleRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RoleResolver {

    private final RoleRepository roleRepository;

    /**
     * Resolve a single role
     */
    public Role resolveRole(String roleName) {
        if (roleName == null || roleName.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Role cannot be null or empty");
        }

        return roleRepository.findByName(roleName.toUpperCase())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Invalid role: " + roleName));
    }

    /**
     * Resolve multiple roles
     */
    public Set<Role> resolveRoles(Set<String> roleNames) {
        if (roleNames == null || roleNames.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Roles cannot be empty");
        }

        return roleNames.stream()
                .map(this::resolveRole) // ✅ reuse single method (cleaner)
                .collect(Collectors.toSet());
    }
}