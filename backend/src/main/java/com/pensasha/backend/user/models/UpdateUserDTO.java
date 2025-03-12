package com.pensasha.backend.user.models;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UpdateUserDTO {

    @NotBlank(message = "First name is required")
    @Size(min = 3, max = 20, message = "First name must be between 3 and 20 characters")
    private String firstName;

    private String secondName;

    @NotBlank(message = "Third name is required")
    @Size(min = 3, max = 20, message = "Third name must be between 3 and 20 characters")
    private String thirdName;

    @NotBlank(message = "National ID is required")
    @Pattern(regexp = "^[0-9]{7,8}$", message = "National ID must be 7-8 digits")
    private String idNumber;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number")
    @Column(unique = true, nullable = false)
    private String phoneNumber;

    @NotNull(message = "Role is required")
    @Pattern(regexp = "Admin|LandLord|Tenant|Caretaker", message = "Invalid role. Allowed values: Admin, LandLord, Tenant, Caretaker")
    private String role;

}
