package com.pensasha.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "units")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String unitNumber;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal rentAmount; // Changed from Double to BigDecimal

    @Column(nullable = false)
    private boolean isOccupied; // Changed from Boolean to primitive boolean

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false) // Fixed typo from "propery_id"
    private Property property;

    @OneToOne(mappedBy = "rentalUnit", cascade = CascadeType.ALL)
    private Tenant tenant;
}
