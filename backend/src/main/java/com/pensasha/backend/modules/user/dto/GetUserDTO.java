package com.pensasha.backend.modules.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * DTO for detailed user information.
 * Includes identity, contact info, roles, and derived permissions.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserDTO {

    /** Primary internal ID */
    private Long id;

    private String firstName;
    private String middleName;
    private String lastName;

    /** Optional email address */
    private String email;

    /** Optional official ID number */
    private String idNumber;

    /** Phone number (primary login) */
    private String phoneNumber;

    /** Profile picture URL */
    private String profilePicture;

    /** Roles assigned to the user */
    private Set<String> roles;

    /** Permissions derived from roles (read-only) */
    private Set<String> permissions;
}