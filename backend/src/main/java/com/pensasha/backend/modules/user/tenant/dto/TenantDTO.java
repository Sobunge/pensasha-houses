package com.pensasha.backend.modules.user.tenant.dto;

import com.pensasha.backend.modules.user.dto.GetUserDTO;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.util.List;

/**
 * DTO for transferring tenant-specific data.
 * A tenant does NOT directly own units; units are derived from leases.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class TenantDTO extends GetUserDTO {

    /**
     * Optional database ID of the tenant (for internal use / mapping).
     */
    private Long id;

    /**
     * Emergency contact phone number for the tenant.
     */
    @Pattern(
        regexp = "^(?:\\+254|0)[17][0-9]{8}$",
        message = "Emergency contact must be valid (e.g., +2547XXXXXXX or 07XXXXXXXX)"
    )
    private String emergencyContact;

    /**
     * Lease IDs associated with this tenant.
     * Provided by the client when creating/updating a tenant.
     */
    private List<Long> leaseIds;

    /**
     * Unit IDs derived from the tenant's leases (read-only, derived field).
     * This field is calculated automatically and should not be set by the client.
     */
    private List<Long> unitIds;
}
