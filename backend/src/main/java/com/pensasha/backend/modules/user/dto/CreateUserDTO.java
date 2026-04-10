package com.pensasha.backend.modules.user.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Set;

/**
 * DTO for creating a new user.
 * Supports multi-role assignment and identity verification.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserDTO {

    /** User's official first name */
    @NotBlank(message = "First name is required")
    private String firstName;

    /** User's official last name */
    @NotBlank(message = "Last name is required")
    private String lastName;

    /** Primary login identity in E.164 format */
    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^\\+?[1-9]\\d{7,14}$",
        message = "Invalid phone number format"
    )
    private String phoneNumber;

    /** Email for notifications and password recovery */
    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    /** User password (minimum 8 characters for security) */
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    /** Roles assigned to the user (e.g., TENANT, LANDLORD) */
    @NotEmpty(message = "At least one role is required")
    private Set<String> roles;
}