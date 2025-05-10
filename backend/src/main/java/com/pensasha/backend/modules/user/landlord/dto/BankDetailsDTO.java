package com.pensasha.backend.modules.user.landlord.dto;

import lombok.Data;

@Data
public class BankDetailsDTO {
    private String bankName;
    private String accountNumber;
    private String branchCode;
}