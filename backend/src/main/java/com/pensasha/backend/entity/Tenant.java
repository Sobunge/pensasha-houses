package com.pensasha.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

/**
 * Entity representing a Tenant in the system.
 * A Tenant is a user who rents one or more units within a property.
 */
@Entity
@Table(name = "tenants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tenant extends User {

    /**
     * List of rental units assigned to this tenant.
     * One tenant can rent multiple units.
     */
    @OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Unit> rentalUnits;

    /**
     * List of invoices assigned to this tenant.
     * One tenant can have multiple invoices.
     */
    @OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Invoice> invoices;

    /**
     * The start date of the lease agreement.
     * Cannot be null.
     */
    @Column(nullable = false)
    private LocalDate leaseStartDate;

    /**
     * The end date of the lease agreement.
     * Cannot be null.
     */
    @Column(nullable = false)
    private LocalDate leaseEndDate;

    /**
     * The agreed monthly rent amount for the tenant.
     * Cannot be null.
     */
    @Column(nullable = false)
    private Double monthlyRent;

    /**
     * Emergency contact phone number for the tenant.
     * Maximum of 15 characters.
     */
    @Column(length = 15)
    private String emergencyContact;
}
