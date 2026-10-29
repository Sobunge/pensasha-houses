package com.pensasha.backend.modules.user.landlord;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pensasha.backend.modules.payment.MethodsOfPayment;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

/**
 * Role-specific profile for a Landlord.
 * Contains landlord-only attributes such as owned properties, multiple bank details/accounts, 
 * and multi-channel payment collection preferences for tenants.
 */
@Entity
@Table(name = "landlord_profiles")
@Getter
@Setter
@NoArgsConstructor
public class LandlordProfile {

    /* ===================== SHARED PRIMARY KEY ===================== */
    
    /**
     * Shared primary key with User.
     * Ensures one-to-one mapping with User identity.
     */
    @Id
    private Long id;

    @OneToOne(optional = false)
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    /* ===================== LANDLORD SPECIFIC FIELDS ===================== */

    /**
     * Properties owned by landlord.
     * Cascade only for persist/merge — do not remove properties on profile deletion.
     */
    @OneToMany(
            mappedBy = "landlord",
            fetch = FetchType.LAZY,
            cascade = { CascadeType.PERSIST, CascadeType.MERGE }
    )
    private Set<Property> properties = new HashSet<>();

    /**
     * Multiple bank settlement details owned by this landlord (e.g. for different properties or accounts).
     */
    @OneToMany(
            mappedBy = "landlordProfile",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<BankDetails> bankDetails = new HashSet<>();

    /* ===================== PAYMENT COLLECTION PREFERENCES ===================== */

    /**
     * Set of payment methods this landlord accepts from tenants 
     * (e.g., MPESA_C2B_PAYBILL, MPESA_STK_PUSH, BANK_TRANSFER, CASH).
     */
    @ElementCollection(targetClass = MethodsOfPayment.class, fetch = FetchType.EAGER)
    @CollectionTable(
            name = "landlord_accepted_payment_methods",
            joinColumns = @JoinColumn(name = "landlord_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private Set<MethodsOfPayment> acceptedPaymentMethods = new HashSet<>();

    /**
     * Dedicated M-Pesa Business Paybill number (if the landlord has their own shortcode).
     */
    @Column(length = 20)
    private String mpesaPaybillNumber;

    /**
     * M-Pesa Account Number prefix assigned to this landlord 
     * (used when tenants pay via a system master paybill with a specific account format).
     */
    @Column(length = 50)
    private String mpesaAccountNumber;

    /**
     * M-Pesa Buy Goods Till Number (if they prefer Till numbers over Paybills).
     */
    @Column(length = 20)
    private String mpesaTillNumber;

    /**
     * Direct mobile money phone number for landlords who accept direct send-money or Pesalink via phone.
     */
    @Column(length = 15)
    private String mpesaPhoneNumber;

    /**
     * Instructions for cash payments (e.g., "Payable only to the resident caretaker with an official receipt").
     */
    @Column(columnDefinition = "TEXT")
    private String cashPaymentInstructions;

    /* ===================== HELPER METHODS ===================== */

    public void setUser(User user) {
        this.user = user;
    }

    public void addProperty(Property property) {
        properties.add(property);
        property.setLandlord(this);
    }

    public void removeProperty(Property property) {
        properties.remove(property);
        property.setLandlord(null);
    }

    public void addBankDetails(BankDetails details) {
        this.bankDetails.add(details);
        details.setLandlordProfile(this);
    }

    public void removeBankDetails(BankDetails details) {
        this.bankDetails.remove(details);
        details.setLandlordProfile(null);
    }

    public void addAcceptedPaymentMethod(MethodsOfPayment method) {
        this.acceptedPaymentMethods.add(method);
    }

    public void removeAcceptedPaymentMethod(MethodsOfPayment method) {
        this.acceptedPaymentMethods.remove(method);
    }
}