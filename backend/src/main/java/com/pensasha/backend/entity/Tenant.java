package com.pensasha.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "tenants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tenant extends User {

    @OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Unit> rentalUnits; // A tenant can have multiple units

    @Column(nullable = false)
    private LocalDate leaseStartDate; 

    @Column(nullable = false)
    private LocalDate leaseEndDate; 
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal monthlyRent; 

    @Column(length = 15)
    private String emergencyContact; 
}
