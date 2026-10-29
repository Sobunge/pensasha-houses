package com.pensasha.backend.modules.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.user.tenant.TenantProfile;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

/**
 * Represents a payment made by a tenant.
 * Supports automated reconciliation from M-Pesa Daraja and bank webhooks,
 * as well as manual entries.
 */
@Entity
@Table(
    name = "payments",
    indexes = {
        @Index(name = "idx_transaction_reference", columnList = "transactionReference", unique = true)
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 
     * Unique transaction code from the payment gateway 
     * (e.g., M-Pesa receipt like QGK48XYZ91 or Bank EFT reference). 
     * Marked unique to prevent duplicate processing on webhook retries.
     */
    @Column(unique = true, length = 100)
    private String transactionReference;

    /** The exact amount paid in this transaction. */
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    /** The exact date and time when the payment occurred. */
    @Column(nullable = false)
    private LocalDateTime paymentDate;

    /** The payment method and channel used. */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private MethodsOfPayment method;

    /** Current status of the transaction. */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PaymentStatus status = PaymentStatus.COMPLETED;

    /** 
     * Phone number or account identifier used to make the payment 
     * (e.g., 254712345678 for M-Pesa).
     */
    @Column(length = 20)
    private String sourceIdentifier;

    /**
     * The tenant who made this payment.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private TenantProfile tenant;

    /**
     * The invoice this payment is linked to (if any).
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    /** Audit timestamp when record was inserted into the DB. */
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}