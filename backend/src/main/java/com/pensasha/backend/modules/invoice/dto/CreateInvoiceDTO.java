package com.pensasha.backend.modules.invoice.dto;

import java.time.LocalDate;
import lombok.*;

/**
 * Data Transfer Object for Invoice.
 * Used for transferring invoice data between API layers without exposing the
 * entity directly.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateInvoiceDTO {

    /**
     * Lease ID the invoice is associated with.
     * An invoice belongs to a lease, and indirectly to a tenant.
     */
    private String leaseId;

    /** Total amount due for this invoice. */
    private Double amountDue;

    /** The date the invoice was created. */
    private LocalDate invoiceDate;

    /** Amount that has already been paid (usually zero on creation). */
    private Double amountPaid;

    /** The date by which the invoice is due. */
    private LocalDate dueDate;
}