package com.pensasha.backend.modules.user.tenant.dto;

import com.pensasha.backend.modules.user.dto.UpdateUserDTO;

import jakarta.validation.constraints.Pattern;
import lombok.*;

/**
 * DTO for transferring tenant-specific data.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UpdateTenantDTO extends UpdateUserDTO {

    /**
     * Emergency contact phone number for the tenant.
     */
    @Pattern(regexp = "^(?:\\+254|0)[17][0-9]{8}$", message = "Emergency contact must be valid (e.g., +2547XXXXXXX or 07XXXXXXXX)")
    private String emergencyContact;

}
