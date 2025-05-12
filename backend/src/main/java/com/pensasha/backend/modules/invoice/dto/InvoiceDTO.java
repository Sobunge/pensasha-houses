package com.pensasha.backend.modules.invoice.dto;

import java.time.LocalDate;
import java.util.List;

import com.pensasha.backend.modules.invoice.InvoiceStatus;
import lombok.*;

/**
 * Data Transfer Object for Invoice.
 * Carries invoice data between processes without exposing the entity directly.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceDTO {

    /** Unique identifier for the invoice. */
    private String invoiceNumber;

    /** ID of the tenant associated with this invoice. */
    private Long tenantId;

    /** Total amount to be paid for this invoice. */
    private Double amountDue;

    /** Date when the invoice was created. */
    private LocalDate invoiceDate;

    /** Amount already paid towards this invoice. */
    private Double amountPaid;

    /** Due date for the invoice. */
    private LocalDate dueDate;

    /** Status of the invoice. */
    private InvoiceStatus status;

    /** IDs of the payments made towards this invoice. */
    private List<Long> paymentIds;

    /** ID of the lease associated with this invoice (if any). */
    private Long leaseId;
}