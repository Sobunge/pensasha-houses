package com.pensasha.backend.modules.payment;

/**
 * Enum representing the available methods of payment 
 * in the Pensasha backend system.
 *
 * The supported payment methods are:
 * - MPESA: Mobile money transfer service.
 * - BANK: Payment through a bank account.
 * - CASH: Physical cash payment.
 *
 * This enum can be used in transactions, invoices, 
 * or any financial records to indicate the payment method used.
 */
public enum MethodsOfPayment {

    MPESA, // Mobile money transfer via MPESA
    BANK,  // Payment made through bank transfer or deposit
    CASH   // Physical cash payment
}
