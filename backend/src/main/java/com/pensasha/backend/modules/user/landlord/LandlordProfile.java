package com.pensasha.backend.modules.user.landlord;

import java.util.Set;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.User;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "landlord_profiles")
@Getter
@Setter
@NoArgsConstructor
public class LandlordProfile {

    /**
     * Shared primary key with User.
     */
    @Id
    private Long id;

    @OneToOne(optional = false)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    /**
     * Properties owned by landlord.
     * No REMOVE cascade — properties are business assets.
     */
    @OneToMany(
            mappedBy = "landlord",
            fetch = FetchType.LAZY,
            cascade = { CascadeType.PERSIST, CascadeType.MERGE }
    )
    private Set<Property> properties;

    /**
     * Bank details are created during landlord onboarding,
     * not during registration.
     */
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "bank_details_id")
    private BankDetails bankDetails;
}
