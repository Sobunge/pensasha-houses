package com.pensasha.backend.modules.lease.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

/**
 * Data Transfer Object for Lease.
 * 
 * This class is used to transfer lease-related data between the backend
 * services and clients,
 * typically in HTTP request and response bodies. It simplifies the data
 * structure for API consumers
 * by exposing only necessary fields and avoids issues like lazy-loading errors
 * by avoiding direct entity references.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaseDTO {

    /**
     * Unique identifier for the lease.
     */
    private Long id;

    /**
     * ID of the tenant associated with the lease.
     * This is used instead of the full Tenant entity to avoid unnecessary data
     * exposure.
     */
    private Long tenantId;

    /**
     * ID of the unit associated with the lease.
     * Simplifies references without exposing the full Unit entity.
     */
    private Long unitId;

    /**
     * Monthly rent amount agreed upon in the lease.
     */
    private Double monthlyRent;

    /**
     * Start date of the lease agreement.
     * Serialized to JSON using 'yyyy-MM-dd' format to ensure consistent date
     * formatting.
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate leaseStartDate;

    /**
     * End date of the lease agreement.
     * Also serialized to JSON using 'yyyy-MM-dd' format.
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate leaseEndDate;

    /**
     * List of invoice IDs associated with this lease.
     * Helps track invoices without needing to load full Invoice entities.
     * Can be null or empty if no invoices are linked.
     */

    private List<String> invoiceNumbers;
}
