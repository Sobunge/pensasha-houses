package com.pensasha.backend.modules.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for updating a user's profile picture.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangeProfileDTO {

    /**
     * URL or storage path of the profile picture.
     */
    private String profilePictureUrl;
}