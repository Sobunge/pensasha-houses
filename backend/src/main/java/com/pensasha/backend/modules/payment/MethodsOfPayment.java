package com.pensasha.backend.modules.payment;

/**
 * Enum representing available payment methods and channels 
 * in the Pensasha backend system.
 */
public enum MethodsOfPayment {
    MPESA_C2B_PAYBILL, // Automated via Safaricom Daraja C2B Paybill
    MPESA_STK_PUSH,    // System-initiated prompt on tenant's phone
    BANK_TRANSFER,     // Pesalink, EFT, or RTGS
    BANK_DEPOSIT,      // Direct bank deposit slip upload
    CASH               // Physical cash payment handled by caretaker/manager
}