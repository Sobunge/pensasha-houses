package com.pensasha.backend.modules.user.tenant.dto;

import com.pensasha.backend.modules.user.dto.UserDTO;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.util.List;

/**
 * DTO for transferring tenant-specific data.
 * Extends UserDTO and adds fields for rental units, leases, and emergency contact.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class TenantDTO extends UserDTO {

    /**
     * Emergency contact phone number for the tenant.
     * Optional but if present, must match phone number pattern.
     */
    @Pattern(
        regexp = "^(?:\\+254|0)[17][0-9]{8}$",
        message = "Emergency contact must be valid (e.g., +2547XXXXXXX or 07XXXXXXXX)"
    )
    private String emergencyContact;

    /**
     * List of rental unit IDs assigned to this tenant.
     */
    private List<Long> rentalUnitIds;

    /**
     * List of lease IDs assigned to this tenant.
     */
    private List<Long> leaseIds;
}