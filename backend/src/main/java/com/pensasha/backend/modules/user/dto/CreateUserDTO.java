package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserDTO {

    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^\\+?[1-9]\\d{7,14}$",
        message = "Invalid phone number format"
    )
    private String phoneNumber;

    @NotBlank(message = "Password is required")
    @Size(min = 5, message = "Password must be at least 5 characters")
    private String password;

    @NotNull(message = "Role is required")
    private Role role;
}
