package com.pensasha.backend.modules.user.caretaker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO for creating a CaretakerProfile.
 * 
 * Includes a reference to an existing User and profile-specific fields.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCaretakerDTO {

    /**
     * The ID of the existing User to link to this profile.
     */
    private Long userId;

}
