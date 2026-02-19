package com.pensasha.backend.modules.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

/**
 * DTO used for user login request (phone-based authentication)
 */
@Getter
@Setter
public class LoginRequestDTO {

    /**
     * Phone number in international format (E.164 preferred)
     * Example: +254712345678
     */
    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "^\\+?[1-9]\\d{7,14}$",
            message = "Enter a valid phone number"
    )
    private String phoneNumber;

    /**
     * User password
     */
    @NotBlank(message = "Password is required")
    private String password;
}
