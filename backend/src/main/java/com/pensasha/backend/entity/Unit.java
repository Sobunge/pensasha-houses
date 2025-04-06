package com.pensasha.backend.entity;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(nullable = false)
    private Double rentAmount; 

    @Column(nullable = false)
    private boolean isOccupied; 

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @ManyToOne
    @JoinColumn(name = "tenant_id") 
    private Tenant tenant; // Many units belong to one tenant
    
}
