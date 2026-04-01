package com.pensasha.backend.modules.user.helper;

import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.RoleRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Helper for parsing role strings into Role enums.
 * Supports single or multiple roles (comma-separated).
 */
@Component
@RequiredArgsConstructor
public class RoleResolver {

    private final RoleRepository roleRepository;

    public Set<Role> resolveRoles(Set<String> roleNames) {
        if (roleNames == null || roleNames.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Roles cannot be empty");
        }

        return roleNames.stream()
                .map(name -> roleRepository.findByName(name.toUpperCase())
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.BAD_REQUEST, "Invalid role: " + name)))
                .collect(Collectors.toSet());
    }
}