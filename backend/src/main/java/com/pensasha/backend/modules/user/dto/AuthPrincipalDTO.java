package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO representing authenticated user principal details.
 * Uses user ID as primary identifier instead of phone number.
 */
@Data
@AllArgsConstructor
public class AuthPrincipalDTO {

    /** Internal database ID of the user */
    private Long id;

    /** Optional public identifier (could be UUID or other) */
    private String publicId;

    /** Username for display purposes (could be phone number or email) */
    private String username;

    /** Role of the user */
    private Role role;

    /** Default route to redirect after login based on role */
    private String defaultRoute;
}