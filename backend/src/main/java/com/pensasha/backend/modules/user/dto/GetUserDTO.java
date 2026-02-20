package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for detailed user information.
 * Includes internal ID, full identity, contact info, profile, and role.
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

    /** User role */
    private Role role;
}