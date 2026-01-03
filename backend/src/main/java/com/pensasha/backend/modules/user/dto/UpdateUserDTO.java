package com.pensasha.backend.modules.user.dto;

import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for updating user profile information.
 * Includes validation rules for each field to ensure data integrity.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Validated
public class UpdateUserDTO {

    /** First name: required, 3-20 characters */
    @NotBlank(message = "First name is required")
    @Size(min = 3, max = 20, message = "First name must be between 3 and 20 characters")
    private String firstName;

    /** Middle name: optional */
    private String middleName;

    /** Last name: required, 3-20 characters */
    @NotBlank(message = "Last name is required")
    @Size(min = 3, max = 20, message = "Last name must be between 3 and 20 characters")
    private String lastName;

    /** National ID: required, 7-8 digits */
    @NotBlank(message = "National ID is required")
    @Pattern(regexp = "^[0-9]{7,8}$", message = "National ID must be 7-8 digits")
    private String idNumber;

    /** Phone number: required, Kenyan format */
    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^(?:\\+254|0)[17][0-9]{8}$",
        message = "Phone number must be valid (e.g., +2547XXXXXXX or 07XXXXXXXX)"
    )
    private String phoneNumber;
}
