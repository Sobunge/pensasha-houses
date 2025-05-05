package com.pensasha.backend.modules.payment;

import java.time.LocalDate;

import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.user.tenant.Tenant;

import jakarta.persistence.*;
import lombok.*;

/**
 * Represents a payment made by a tenant.
 * Each payment is linked to a tenant and optionally to an invoice.
 */
@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    /** Unique identifier for the payment (auto-generated). */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** The amount paid in this transaction. */
    private Double amount;

    /** The date when the payment was made. */
    private LocalDate paymentDate;

    /** The payment method used, e.g. "MPESA", "Cash", "Bank". */
    private MethodsOfPayment method;

    /**
     * The tenant who made this payment.
     * This is a mandatory relationship.
     */
    @ManyToOne
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    /**
     * The invoice this payment is linked to (if any).
     * This is optional — a payment may or may not be tied to an invoice.
     */
    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;
}
