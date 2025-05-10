package com.pensasha.backend.modules.user.dto;

import org.springframework.validation.annotation.Validated;  // Importing annotation for validation support in Spring

import jakarta.persistence.Column;  // Importing column annotation from Jakarta Persistence
import jakarta.validation.constraints.*;  // Importing validation annotations from Jakarta API
import lombok.*;  // Importing Lombok annotations for generating boilerplate code

// DTO class for updating user details, with validation constraints
@Data  // Lombok annotation to generate getters, setters, toString, equals, and hashCode methods
@NoArgsConstructor  // Lombok annotation to generate a no-argument constructor
@AllArgsConstructor  // Lombok annotation to generate an all-arguments constructor
@Validated  // Spring annotation to trigger validation during method execution
public class UpdateUserDTO {

    // First name field: must not be blank and must be between 3 and 20 characters
    @NotBlank(message = "First name is required")  // Ensures that the first name is not blank
    @Size(min = 3, max = 20, message = "First name must be between 3 and 20 characters")  // Ensures the first name is between 3 and 20 characters
    private String firstName;

    // Second name field: optional, no validation required
    private String secondName;

    // Third name field: must not be blank and must be between 3 and 20 characters
    @NotBlank(message = "Third name is required")  // Ensures that the third name is not blank
    @Size(min = 3, max = 20, message = "Third name must be between 3 and 20 characters")  // Ensures the third name is between 3 and 20 characters
    private String thirdName;

    // National ID field: must not be blank and must match the pattern for 7-8 digit numbers
    @NotBlank(message = "National ID is required")  // Ensures that the national ID is not blank
    @Pattern(regexp = "^[0-9]{7,8}$", message = "National ID must be 7-8 digits")  // Ensures the national ID is a 7-8 digit number
    private String idNumber;

    // Phone number field: must not be blank, must match the pattern for Kenyan phone numbers
    @NotBlank(message = "Phone number is required")  // Ensures that the phone number is not blank
    @Pattern(regexp = "^(?:\\+254|0)[17][0-9]{8}$", message = "Phone number must be valid (e.g., +2547XXXXXXX or 07XXXXXXXX)")  // Ensures the phone number matches the Kenyan phone number format
    @Column(unique = true, nullable = false)  // Ensures that the phone number is unique and cannot be null in the database
    private String phoneNumber;

}
