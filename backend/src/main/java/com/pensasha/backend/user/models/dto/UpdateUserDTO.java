package com.pensasha.backend.user.models.dto;

import com.pensasha.backend.role.Role;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Validated
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
    @Pattern(regexp = "^(?:\\+254|0)[17][0-9]{8}$", message = "Phone number must be valid (e.g., +2547XXXXXXX or 07XXXXXXXX)")
    @Column(unique = true, nullable = false)
    private String phoneNumber;

}
