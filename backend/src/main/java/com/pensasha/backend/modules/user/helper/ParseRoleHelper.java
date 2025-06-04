package com.pensasha.backend.modules.user.helper;

import org.apache.coyote.BadRequestException;

import com.pensasha.backend.modules.user.Role;

public final class ParseRoleHelper {

    // Private constructor to prevent instantiation
    private ParseRoleHelper() {
    }

    /**
     * Parses a string role to a Role enum, throwing BadRequestException if invalid.
     *
     * @param role Role as string.
     * @return Role enum.
     */
    public static Role parseRole(String role) throws BadRequestException {
        try {
            return Role.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid role provided: " + role);
        }
    }
}
