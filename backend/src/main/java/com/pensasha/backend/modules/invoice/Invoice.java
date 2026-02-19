package com.pensasha.backend.modules.invoice;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.payment.Payment;
import com.pensasha.backend.modules.user.tenant.TenantProfile;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * Represents an invoice issued to a tenant.
 * Each invoice contains payment details, due date, status, and associated payments.
 */
@Entity
@Table(name = "invoices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Invoice {

    /** Unique identifier for the invoice (auto-generated UUID). */
    @Id
    @GeneratedValue
    @JdbcTypeCode(SqlTypes.UUID)
    @Column(updatable = false, nullable = false)
    private UUID invoiceNumber;

    /** The tenant to whom this invoice belongs. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private TenantProfile tenant;

    /** Total amount that the tenant is required to pay for this invoice. */
    private BigDecimal amountDue;

    /** Amount that has already been paid towards this invoice. */
    private BigDecimal amountPaid;

    /** The date when the invoice was created. */
    private LocalDate invoiceDate;

    /** The date by which the invoice should be fully paid. */
    private LocalDate dueDate;

    /** Status of the invoice, e.g. OPEN, CLOSED. */
    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;

    /**
     * List of payments made towards this invoice.
     * Mapped by the 'invoice' field in the Payment entity.
     */
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Payment> payments;

    /** The lease associated with this invoice, if any. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lease_id")
    private Lease lease;
}
