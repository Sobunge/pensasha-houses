package com.pensasha.backend.modules.invoice;

import java.time.LocalDate;
import java.util.List;

import com.pensasha.backend.modules.payment.Payment;
import com.pensasha.backend.modules.user.tenant.Tenant;

import jakarta.persistence.*;
import lombok.*;

/**
 * Represents an invoice issued to a tenant.
 * Each invoice contains payment details, due date, status, and associated
 * payments.
 */
@Entity
@Table(name = "invoices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Invoice {

    /** Unique identifier for the invoice (auto-generated). */
    @Id
    private String invoiceNumber;

    /** The tenant to whom this invoice belongs. */
    @ManyToOne
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    /** Total amount that the tenant is required to pay for this invoice. */
    private Double amountDue;

    /** The date by which the invoice is created. */
    private LocalDate invoiceDate;

    /** Amount that has already been paid towards this invoice. */
    private Double amountPaid;

    /** The date by which the invoice should be fully paid. */
    private LocalDate dueDate;

    /** Status of the invoice, e.g. "OPEN", "CLOSED". */
    private InvoiceStatus status;

    /**
     * List of payments made towards this invoice.
     * Mapped by the 'invoice' field in the Payment entity.
     * Uses cascading so changes to an invoice propagate to its payments.
     * FetchType.LAZY ensures payments are only loaded when explicitly accessed.
     */
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Payment> payments;

    @ManyToOne
    @JoinColumn(name = "lease_id")
    private Lease lease;
}
