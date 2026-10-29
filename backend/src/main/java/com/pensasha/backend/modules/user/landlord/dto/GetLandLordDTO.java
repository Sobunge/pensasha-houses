package com.pensasha.backend.modules.user.landlord.dto;

import com.pensasha.backend.modules.payment.MethodsOfPayment;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class GetLandLordDTO {
    private Long userId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String idNumber;
    private String profilePicture;
    private Set<String> roles;
    private Set<String> permissions;
    private Set<Long> propertyIds;
    private Long bankDetailsId;
    private Set<BankDetailsDTO> bankDetails = new HashSet<>();

    /* ===================== PAYMENT COLLECTION PREFERENCES ===================== */
    private Set<MethodsOfPayment> acceptedPaymentMethods;
    private String mpesaPaybillNumber;
    private String mpesaAccountNumber;
    private String mpesaTillNumber;
    private String mpesaPhoneNumber;
    private String cashPaymentInstructions;
}