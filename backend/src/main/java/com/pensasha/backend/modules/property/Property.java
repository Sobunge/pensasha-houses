package com.pensasha.backend.modules.property;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.user.caretaker.CareTaker;
import com.pensasha.backend.modules.user.landlord.LandLord;

/**
 * Entity class representing a Property.
 * Maps to the 'properties' table in the database.
 * Contains details about a property, its amenities, landlord, caretaker, and
 * units.
 */
@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    /**
     * Primary key for the property entity.
     * Auto-generated using the database's identity strategy.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Name of the property.
     * Must be unique and cannot be null.
     */
    @Column(nullable = false, unique = true)
    private String name;

    /**
     * Description of the property.
     * Can be up to 1000 characters in length.
     */
    @Column(length = 1000)
    private String description;

    /**
     * Location of the property.
     */
    private String location;

    /**
     * Total number of rental units within the property.
     * Cannot be null.
     */
    @Column(nullable = false)
    private int numOfUnits;

    /**
     * List of amenities available in the property.
     * Stored in a separate table 'property_amenities' with a join column
     * 'property_id'.
     */
    @ElementCollection
    @CollectionTable(name = "property_amenities", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "amenity")
    private List<String> amenities;

    /**
     * The landlord who owns this property.
     * Many properties can belong to one landlord.
     * Cannot be null.
     */
    @ManyToOne
    @JoinColumn(name = "landlord_id")
    private LandLord landLord;

    /**
     * The caretaker assigned to this property.
     * Represents a one-to-one relationship.
     */
    @OneToOne
    @JoinColumn(name = "caretaker_id")
    private CareTaker careTaker;

    /**
     * Set of rental units within this property.
     * One property can have multiple units.
     * Uses cascade operations for persist, merge, remove.
     * Lazy fetching is used to optimize performance.
     */
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Unit> units;
}
