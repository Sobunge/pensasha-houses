package com.pensasha.backend.modules.invoice.dto;

import java.time.LocalDate;
import java.util.List;

import com.pensasha.backend.modules.invoice.InvoiceStatus;
import com.pensasha.backend.modules.payment.Payment;
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
public class InvoiceDto {

    /** Unique identifier for the invoice. */
    private String invoiceNumber;

    /**
     * Tenant ID or identification number. Can also be replaced with a nested
     * TenantDto if needed.
     */
    private Long tenantId;

    /** Total amount due for this invoice. */
    private Double amountDue;

    /** The date the invoice was created. */
    private LocalDate invoiceDate;

    /** Amount that has already been paid. */
    private Double amountPaid;

    /** The date by which the invoice is due. */
    private LocalDate dueDate;

    /** Current status of the invoice. */
    private InvoiceStatus status;

    /**
     * Optional: List of payments related to this invoice.
     * Could be replaced with a List of PaymentDto for cleaner API responses.
     */
    private List<Payment> payments;
}