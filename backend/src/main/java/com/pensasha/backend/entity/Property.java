package com.pensasha.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 1000)
    private String description;

    private String location;

    @Column(nullable = false)
    private int numOfUnits;

    @ElementCollection
    @CollectionTable(name = "property_amenities", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "amenity")
    private List<String> amenities;

    @ManyToOne
    @JoinColumn(name = "landlord_id", nullable = false)
    private LandLord landLord;

    @OneToOne
    @JoinColumn(name = "caretaker_id")
    private CareTaker careTaker;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Unit> units;
}
