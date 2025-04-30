package com.pensasha.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Entity class representing a user's bank account details.
 * This entity is mapped to the 'bank_details' table in the database.
 * Includes basic validation constraints for each field.
 */
@Entity
@Data
@Table(name = "bank_details")
@NoArgsConstructor
@AllArgsConstructor
public class BankDetails {

    /**
     * Unique identifier for each bank detail record.
     * Auto-generated primary key.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Name of the bank.
     * Cannot be null or blank.
     */
    @NotBlank(message = "Bank name is required")
    private String bankName;

    /**
     * Name of the account holder.
     * Cannot be null or blank.
     */
    @NotBlank(message = "Account name is required")
    private String accountName;

    /**
     * Bank account number.
     * Must be a numeric string between 6 and 20 digits.
     * Cannot be null or blank.
     */
    @NotBlank(message = "Account number is required")
    @Pattern(regexp = "\\d{6,20}", message = "Invalid account number")
    private String accountNumber;

    /**
     * Name of the bank branch.
     * Optional field.
     */
    private String branchName;
}
