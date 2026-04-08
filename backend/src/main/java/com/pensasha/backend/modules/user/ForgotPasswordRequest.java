package com.pensasha.backend.modules.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Request DTO for when a user forgets their password.
 * The frontend sends the phone number, and the backend looks up the
 * associated email to send the reset link.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPasswordRequest {

    @NotBlank(message = "Phone number is required")
    // Validates Kenyan phone formats (7XXXXXXXX or 1XXXXXXXX)
    // to ensure data integrity before hitting the database
    @Pattern(regexp = "^(\\+254|0)?(7|1)\\d{8}$", message = "Please enter a valid Kenyan phone number")
    private String phoneNumber;
}