package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO representing the authenticated user's principal details.
 * Uses internal ID as primary identifier; exposes publicId and username for frontend.
 */
@Data
@AllArgsConstructor
public class AuthPrincipalDTO {

    /** Internal database ID (primary internal identifier) */
    private Long id;

    /** Optional external identifier (UUID or similar) for public URLs */
    private String publicId;

    /** Display username (phone number or email), not used as internal key */
    private String username;

    /** Role of the user */
    private Role role;

    /** Default route for frontend redirection based on role */
    private String defaultRoute;
}