package com.pensasha.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "units")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    // @JsonIgnore 
    private Property property;

    @ManyToOne
    @JoinColumn(name = "tenant_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    // @JsonIgnore 
    private Tenant tenant;
}
