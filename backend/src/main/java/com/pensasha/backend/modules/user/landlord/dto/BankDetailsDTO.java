package com.pensasha.backend.modules.user.landlord.dto;

import lombok.Data;

/**
 * Data Transfer Object (DTO) for transferring bank account details
 * between client and server without exposing the full BankDetails entity.
 * 
 * This class is typically used in API request and response payloads.
 */
@Data
public class BankDetailsDTO {

    /**
     * Name of the bank.
     * Example: "Equity Bank"
     */
    private String bankName;

    /**
     * Name of the account holder.
     * Example: "John Doe"
     */
    private String accountName;

    /**
     * Bank account number.
     * Should be a numeric string typically between 6 and 20 characters.
     * Example: "1234567890"
     */
    private String accountNumber;

    /**
     * Name of the bank branch.
     * Example: "Nairobi CBD Branch"
     */
    private String branchName;
}
