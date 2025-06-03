package com.pensasha.backend.modules.user.dto;

import jakarta.validation.constraints.*; // Importing validation annotations from Jakarta API
import lombok.*; // Importing Lombok annotations for generating boilerplate code

// DTO class for updating the password, with validation constraints
@Data // Lombok annotation to generate getters, setters, toString, equals, and
      // hashCode methods
@NoArgsConstructor // Lombok annotation to generate a no-argument constructor
@AllArgsConstructor // Lombok annotation to generate an all-arguments constructor
public class UpdatePasswordDTO {

    // The current password, required to be non-blank and at least 8 characters
    @NotBlank(message = "Password is required") // Ensures that the current password is not blank
    @Size(min = 8, message = "Password must be at least 8 characters") // Ensures the current password is at least 8
                                                                       // characters long
    private String currentPassword;

    // The new password, required to be non-blank and at least 8 characters
    @NotBlank(message = "Password is required") // Ensures that the new password is not blank
    @Size(min = 8, message = "Password must be at least 8 characters") // Ensures the new password is at least 8
                                                                       // characters long
    private String newPassword;

    // The confirmation of the new password, required to be non-blank and at least 8
    // characters
    @NotBlank(message = "Password is required") // Ensures that the confirmation password is not blank
    @Size(min = 8, message = "Password must be at least 8 characters") // Ensures the confirmation password is at least
                                                                       // 8 characters long
    private String confirmNewPassword;
}
