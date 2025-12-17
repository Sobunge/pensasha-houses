package com.pensasha.backend.modules.user.dto;

import jakarta.validation.constraints.NotBlank;  // Importing validation annotations from Jakarta API
import jakarta.validation.constraints.Pattern;  // Importing Pattern annotation from Jakarta API
import lombok.Getter;  // Lombok annotation for automatic getter generation
import lombok.Setter;  // Lombok annotation for automatic setter generation

// DTO class used for user login request
@Getter  // Lombok annotation to generate getter methods for all fields
@Setter  // Lombok annotation to generate setter methods for all fields
public class LoginRequestDTO {

    // ID Number of the user, must not be blank (validated by @NotBlank)
    
    @NotBlank // Ensures the idNumber is not blank
    @Pattern(regexp = "\\d+", message = "ID number must contain digits only")
    private String idNumber;

    // Password of the user, must not be blank (validated by @NotBlank)
    @NotBlank(message = "Password is required")  // Ensures the password is not blank
    private String password;
}
