package com.pensasha.backend.modules.user.landlord;

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
 * Contains landlord-only attributes such as owned properties and bank details.
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
     * Bank details created during onboarding.
     */
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "bank_details_id")
    private BankDetails bankDetails;

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

    public void setBankDetails(BankDetails bankDetails) {
        this.bankDetails = bankDetails;
    }
}