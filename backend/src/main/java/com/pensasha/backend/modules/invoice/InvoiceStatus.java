package com.pensasha.backend.modules.invoice;

/**
 * Enum representing the different possible statuses of an invoice
 * in the system.
 *
 * This helps track the state of an invoice throughout its lifecycle,
 * from creation to final settlement or cancellation.
 */
public enum InvoiceStatus {

    /** The invoice has been created but not yet finalized or sent. */
    DRAFT,

    /** The invoice has been sent to the customer and is awaiting payment. */
    PENDING,

    /** The invoice has been partially paid; a balance still remains. */
    PARTIALLY_PAID,

    /** The invoice has been fully paid. */
    PAID,

    /** Payment received exceeds the invoice total. */
    OVERPAID,

    /** The invoice has been closed and no further actions can be taken. */
    CLOSED,

    /** The invoice has been voided or cancelled before payment. */
    CANCELLED,

    /** The invoice is no longer valid due to expiration (e.g., past due date). */
    EXPIRED,

    /** The payment made against the invoice has been refunded. */
    REFUNDED
}
