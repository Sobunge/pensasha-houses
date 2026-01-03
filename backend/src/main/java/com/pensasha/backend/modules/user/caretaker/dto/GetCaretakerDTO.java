package com.pensasha.backend.modules.user.caretaker.dto;

import com.pensasha.backend.modules.user.dto.GetUserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO for retrieving Caretaker data.
 * Includes all user info plus assigned property reference.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetCaretakerDTO extends GetUserDTO {

    /**
     * ID of the property assigned to the caretaker.
     */
    private Long propertyId;
}
