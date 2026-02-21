package com.pensasha.backend.modules.user.helper;

import com.pensasha.backend.modules.user.Role;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Helper for parsing role strings into Role enums.
 * Supports single or multiple roles (comma-separated).
 */
public final class ParseRoleHelper {

    private ParseRoleHelper() {}

    /** Parses a single role string */
    public static Role parseRole(String role) {
        try {
            return Role.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid role provided: " + role);
        }
    }

    /** Parses comma-separated roles into a Set<Role> */
    public static Set<Role> parseRoles(String roles) {
        if (roles == null || roles.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Role parameter cannot be null or empty");
        }

        return Arrays.stream(roles.split(","))
                .map(String::trim)
                .map(ParseRoleHelper::parseRole)
                .collect(Collectors.toSet());
    }
}