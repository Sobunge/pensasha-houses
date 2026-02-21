package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * DTO for detailed user information.
 * Supports multi-role users and includes identity, contact info, and profile.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserDTO {

    /** Primary internal ID */
    private Long id;

    /** User's first name */
    private String firstName;

    /** User's middle name (optional) */
    private String middleName;

    /** User's last name */
    private String lastName;

    /** Optional email address */
    private String email;

    /** Optional official ID number (national ID, passport, etc.) */
    private String idNumber;

    /** Phone number (primary login and contact) */
    private String phoneNumber;

    /** URL to profile picture */
    private String profilePicture;

    /** Roles assigned to the user */
    private Set<Role> roles;
}