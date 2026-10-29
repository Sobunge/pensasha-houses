package com.pensasha.backend.modules.user.landlord;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
/**
 * Entity class representing a user's bank account details.
 * This entity is mapped to the 'bank_details' table in the database.
 * Includes basic validation constraints for each field.
 */
@Entity
@Getter
@Setter
@ToString(exclude = "landlordProfile")
@Table(name = "bank_details")
@NoArgsConstructor
@AllArgsConstructor
public class BankDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Bank name is required")
    private String bankName;

    @NotBlank(message = "Account name is required")
    private String accountName;

    @NotBlank(message = "Account number is required")
    @Pattern(regexp = "\\d{6,20}", message = "Invalid account number")
    private String accountNumber;

    private String branchName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landlord_profile_id")
    @JsonIgnore
    private LandlordProfile landlordProfile;

    // Custom safe equals and hashCode for JPA Entities
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BankDetails)) return false;
        BankDetails that = (BankDetails) o;
        // If both have IDs, compare IDs. Otherwise, compare account number to prevent null hash collisions.
        if (id != null && that.id != null) {
            return id.equals(that.id);
        }
        return accountNumber != null && accountNumber.equals(that.accountNumber);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}