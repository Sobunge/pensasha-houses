package com.pensasha.backend.modules.user.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangeProfileDTO {

    // Optional — profile picture URL or base64 string if you're handling uploads
    // separately
    private String profilePicture;
}