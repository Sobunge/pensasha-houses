package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for listing users in summary views.
 * Includes ID, full name, phone number, profile picture, and role.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetAllUsersDTO {

    /** Primary internal ID */
    private Long id;

    /** Full name of the user */
    private String fullName;

    /** Optional official ID number (e.g., national ID) */
    private String idNumber;

    /** Phone number (used as login/primary contact) */
    private String phoneNumber;

    /** URL to profile picture */
    private String profilePicture;

    /** User role */
    private Role role;
}