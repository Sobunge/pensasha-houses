package com.pensasha.backend.modules.user.caretaker.dto;

import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO for creating a Caretaker.
 * Inherits common user creation fields from CreateUserDTO.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCaretakerDTO extends CreateUserDTO {

    /**
     * ID of the property assigned to the caretaker.
     */
    private Long propertyId;
}
