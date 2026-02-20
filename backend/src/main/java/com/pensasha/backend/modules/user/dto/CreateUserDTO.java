package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * DTO for creating a new user.
 * Includes phone, password, and role. Optional fields for name can be added later.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserDTO {

    /** Primary login identity in E.164 format */
    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^\\+?[1-9]\\d{7,14}$",
        message = "Invalid phone number format"
    )
    private String phoneNumber;

    /** User password (minimum 5 characters) */
    @NotBlank(message = "Password is required")
    @Size(min = 5, message = "Password must be at least 5 characters")
    private String password;

    /** Role of the user */
    @NotNull(message = "Role is required")
    private Role role;

    /** Optional: first name */
    private String firstName;

    /** Optional: last name */
    private String lastName;
}