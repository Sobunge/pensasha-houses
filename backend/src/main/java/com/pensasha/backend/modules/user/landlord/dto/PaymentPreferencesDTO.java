package com.pensasha.backend.modules.user.landlord.dto;

import com.pensasha.backend.modules.payment.MethodsOfPayment;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * Data Transfer Object for updating and retrieving a landlord's 
 * multi-channel payment collection and routing preferences.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentPreferencesDTO {

    /**
     * The set of payment channels accepted from tenants 
     * (e.g., MPESA_C2B_PAYBILL, MPESA_STK_PUSH, BANK_TRANSFER, CASH).
     */
    private Set<MethodsOfPayment> acceptedPaymentMethods;

    /**
     * Dedicated M-Pesa Paybill number if the landlord operates their own shortcode.
     */
    @Size(max = 20, message = "Paybill number cannot exceed 20 characters")
    private String mpesaPaybillNumber;

    /**
     * M-Pesa Account Number prefix assigned when using a shared system shortcode.
     */
    @Size(max = 50, message = "M-Pesa account number cannot exceed 50 characters")
    private String mpesaAccountNumber;

    /**
     * M-Pesa Buy Goods Till Number if the landlord accepts payments via Till.
     */
    @Size(max = 20, message = "Till number cannot exceed 20 characters")
    private String mpesaTillNumber;

    /**
     * Direct mobile money phone number (e.g., 254712345678).
     */
    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    private String mpesaPhoneNumber;

    /**
     * Specific payment collection instructions for cash transactions handled by caretakers.
     */
    private String cashPaymentInstructions;
}