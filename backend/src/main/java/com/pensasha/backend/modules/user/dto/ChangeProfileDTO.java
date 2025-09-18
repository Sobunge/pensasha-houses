package com.pensasha.backend.modules.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;  // Importing Lombok annotations for generating boilerplate code

/**
 * DTO class for updating a user's profile picture.
 * This class is typically used when a user wants to change or update their profile image.
 */
@Data  // Lombok annotation to generate getters, setters, toString, equals, and hashCode methods
@NoArgsConstructor  // Lombok annotation to generate a no-argument constructor
@AllArgsConstructor  // Lombok annotation to generate an all-arguments constructor
public class ChangeProfileDTO {

    // Profile picture URL or image path: optional field for storing the user's profile image
    private String profilePicture;
}