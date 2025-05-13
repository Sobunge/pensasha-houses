package com.pensasha.backend.modules.user.landlord;

import java.util.Set;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity class representing a LandLord user.
 * Inherits from the {@link User} entity and establishes relationships with {@link Property}
 * and {@link BankDetails}.
 * Mapped to the 'landlords' table in the database.
 */
@Entity
@Table(name = "landlords")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LandLord extends User {

    /**
     * The set of properties owned by this landlord.
     * Represents a one-to-many relationship where one landlord can own multiple properties.
     * - `cascade = CascadeType.ALL` ensures operations like persist, merge, remove cascade to properties.
     * - `fetch = FetchType.LAZY` delays fetching properties until explicitly requested.
     */
    @OneToMany(mappedBy = "landLord", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Property> Properties;

    /**
     * The bank details associated with this landlord.
     * Represents a one-to-one relationship.
     * - `cascade = CascadeType.ALL` ensures operations on the landlord cascade to the bank details.
     * - The foreign key column in the 'landlords' table is 'bank_details_id'.
     */
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bank_details_id", referencedColumnName = "id")
    private BankDetails BankDetails;

}
