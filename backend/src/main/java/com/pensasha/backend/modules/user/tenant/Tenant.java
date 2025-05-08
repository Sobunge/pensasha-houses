package com.pensasha.backend.modules.user.tenant;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.user.User;

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
     * List of lease agreements assigned to this tenant.
     * One tenant can have multiple leases over time.
     */
    @OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Lease> leases;

    /**
     * Emergency contact phone number for the tenant.
     * Maximum of 15 characters.
     */
    @Column(length = 15)
    private String emergencyContact;
}
