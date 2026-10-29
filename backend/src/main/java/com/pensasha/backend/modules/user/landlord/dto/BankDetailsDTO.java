package com.pensasha.backend.modules.user.landlord.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BankDetailsDTO {

    private Long id; // Optional when adding, populated when editing

    @NotBlank(message = "Bank name is required")
    private String bankName;

    @NotBlank(message = "Account name is required")
    private String accountName;

    @NotBlank(message = "Account number is required")
    @Pattern(regexp = "\\d{6,20}", message = "Invalid account number")
    private String accountNumber;

    private String branchName;
}