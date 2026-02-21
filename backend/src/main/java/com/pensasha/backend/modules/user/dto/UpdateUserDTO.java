package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.util.Set;

/**
 * DTO for updating user profile information.
 * Supports optional multi-role updates.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Validated
public class UpdateUserDTO {

    /** First name: required, 3–20 characters */
    @NotBlank(message = "First name is required")
    @Size(min = 3, max = 20, message = "First name must be between 3 and 20 characters")
    private String firstName;

    /** Middle name: optional */
    private String middleName;

    /** Last name: required, 3–20 characters */
    @NotBlank(message = "Last name is required")
    @Size(min = 3, max = 20, message = "Last name must be between 3 and 20 characters")
    private String lastName;

    /** Phone number: required, Kenyan format */
    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^(?:\\+254|0)[17][0-9]{8}$",
        message = "Phone number must be valid (e.g., +2547XXXXXXX or 07XXXXXXXX)"
    )
    private String phoneNumber;

    /** Email address: required, RFC-compliant */
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid email address")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    private String email;

    /** Optional roles update for multi-role support */
    private Set<Role> roles;
}