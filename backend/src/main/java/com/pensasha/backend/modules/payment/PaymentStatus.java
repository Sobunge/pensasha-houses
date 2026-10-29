package com.pensasha.backend.modules.payment;

public enum PaymentStatus {
    PENDING,   // Initiated or waiting for webhook callback
    COMPLETED, // Successfully reconciled and credited to ledger
    FAILED,    // Transaction failed or rejected
    REVERSED   // M-Pesa reversal processed
}