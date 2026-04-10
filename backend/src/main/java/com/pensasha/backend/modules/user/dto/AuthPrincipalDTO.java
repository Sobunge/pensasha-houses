package com.pensasha.backend.modules.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

/**
 * DTO representing the authenticated user's principal details.
 * Supports multi-role users.
 */
@Data
@AllArgsConstructor
public class AuthPrincipalDTO {

    /** Internal database ID (primary internal identifier) */
    private Long id;

    /** Optional external identifier (UUID or similar) for public URLs */
    private String publicId;

    /** Display username , not used as internal key */
    private String firstname;

    /** Roles of the user (multi-role support) */
    private Set<String> roles;

    /* Permissions derived from roles, if needed for frontend authorization */
    private Set<String> permissions;

    /** Default route for frontend redirection based on primary role */
    private String defaultRoute;

}