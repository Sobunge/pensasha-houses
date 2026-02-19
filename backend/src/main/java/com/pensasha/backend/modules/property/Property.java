package com.pensasha.backend.modules.property;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.user.caretaker.CaretakerProfile;
import com.pensasha.backend.modules.user.landlord.LandlordProfile;

/**
 * Entity representing a Property.
 * Maps to the 'properties' table in the database.
 * Contains details about the property, amenities, landlord, caretaker, and units.
 */
@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    /** Primary key for the property entity. Auto-generated. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Name of the property. Must be unique and not null. */
    @Column(nullable = false, unique = true)
    private String name;

    /** Optional description of the property (max 1000 chars). */
    @Column(length = 1000)
    private String description;

    /** Physical location of the property. */
    private String location;

    /** Total number of rental units in the property. Cannot be null. */
    @Column(nullable = false)
    private int numOfUnits;

    /** List of amenities available at the property. Stored in a separate table 'property_amenities'. */
    @ElementCollection
    @CollectionTable(name = "property_amenities", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "amenity")
    private List<String> amenities;

    /** Landlord who owns this property. Many properties can belong to one landlord. */
    @ManyToOne
    @JoinColumn(name = "landlord_id", nullable = false)
    private LandlordProfile landlord;

    /** Caretaker assigned to manage this property. One-to-one relationship. */
    @OneToOne
    @JoinColumn(name = "caretaker_id")
    private CaretakerProfile caretaker;

    /** Set of rental units within this property. One property can have multiple units. */
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Unit> units;
}
