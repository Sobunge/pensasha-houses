package com.pensasha.backend.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Table(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED) // Allows subclasses to extend this entity
public class User {

    @NotBlank(message = "First name is required")
    @Size(min = 3, max = 20, message = "First name must be between 3 and 20 characters")
    private String firstName;

    private String secondName;
    
    @NotBlank(message = "Third name is required")
    @Size(min = 3, max = 20, message = "Third name must be between 3 and 20 characters")
    private String thirdName;

    @Id
    @NotBlank(message = "National ID is required")
    @Pattern(regexp = "^[0-9]{7,8}$", message = "National ID must be 7-8 digits")
    private String idNumber;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number")
    @Column(unique = true, nullable = false)
    private int phoneNumber;

    private String profilePicture;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Role is required")
    private Role role;
    
}
