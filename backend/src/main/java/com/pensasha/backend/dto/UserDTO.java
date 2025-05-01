package com.pensasha.backend.dto;

import jakarta.validation.constraints.*;  // Importing validation annotations from Jakarta API
import lombok.*;  // Importing Lombok annotations for generating boilerplate code
import org.springframework.validation.annotation.Validated;  // Importing validation support from Spring

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.pensasha.backend.entity.Role;  // Importing the Role entity


// DTO class for transferring user-related data, with validation constraints
@Data  // Lombok annotation to generate getters, setters, toString, equals, and hashCode methods
@NoArgsConstructor  // Lombok annotation to generate a no-argument constructor
@AllArgsConstructor  // Lombok annotation to generate an all-arguments constructor
@Validated  // Spring annotation to trigger validation during method execution
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,         // Use name of the class/type
    include = JsonTypeInfo.As.PROPERTY, // Include it as a field in the JSON
    property = "role",                  // Use the "role" field to determine type
    visible = true                      // Make "role" available for deserialization
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = LandLordDTO.class, name = "LANDLORD"),
    @JsonSubTypes.Type(value = TenantDTO.class, name = "TENANT"),
    @JsonSubTypes.Type(value = CareTakerDTO.class, name = "CARETAKER"),
    @JsonSubTypes.Type(value = UserDTO.class, name = "ADMIN") // fallback/default
})
public class UserDTO {

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

    // Password field: must not be blank and must be at least 8 characters long
    @NotBlank(message = "Password is required")  // Ensures that the password is not blank
    @Size(min = 8, message = "Password must be at least 8 characters")  // Ensures the password is at least 8 characters long
    private String password;

    // Phone number field: must not be blank, must match the pattern for Kenyan phone numbers
    @NotBlank(message = "Phone number is required")  // Ensures that the phone number is not blank
    @Pattern(regexp = "^(?:\\+254|0)[17][0-9]{8}$", message = "Phone number must be valid (e.g., +2547XXXXXXX or 07XXXXXXXX)")  // Ensures the phone number matches the Kenyan phone number format
    private String phoneNumber;

    // Profile picture field: optional, no validation required
    private String profilePicture;

    // Role field: must not be null, representing the user's role in the system
    @NotNull(message = "Role is required")  // Ensures that the role is not null
    private Role role;

}
