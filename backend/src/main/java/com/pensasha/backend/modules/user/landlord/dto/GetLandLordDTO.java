package com.pensasha.backend.modules.user.landlord.dto;

import java.util.Set;
import com.pensasha.backend.modules.user.dto.GetUserDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO for returning landlord data.
 * Extends GetUserDTO for common read-only user fields.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetLandLordDTO extends GetUserDTO {

    /**
     * IDs of properties owned by this landlord.
     */
    private Set<Long> propertyIds;

    /**
     * ID of the associated bank details.
     */
    private Long bankDetailsId;
}
