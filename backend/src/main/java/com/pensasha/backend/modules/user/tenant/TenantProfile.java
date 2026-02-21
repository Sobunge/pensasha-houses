package com.pensasha.backend.modules.user.tenant;

import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Role-specific profile for a Tenant.
 * Contains tenant-only attributes such as leases and emergency contact.
 * Linked to a User entity for identity and authentication.
 */
@Entity
@Table(name = "tenant_profiles")
@Getter
@Setter
@NoArgsConstructor
public class TenantProfile {

    /* ===================== INTERNAL ID ===================== */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ===================== RELATION TO USER ===================== */

    /**
     * Owning side of the relationship.
     * Each tenant profile belongs to exactly one user.
     */
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    /* ===================== TENANT SPECIFIC FIELDS ===================== */

    /**
     * Bidirectional relationship to Lease.
     * MUST match field in Lease entity:
     *      private TenantProfile tenant;
     */
    @OneToMany(
            mappedBy = "tenant",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Lease> leases = new ArrayList<>();

    /**
     * Emergency contact phone number (E.164 recommended).
     */
    @Column(length = 20)
    private String emergencyContact;

    /* ===================== HELPER METHODS ===================== */

    public void setUser(User user) {
        this.user = user;
    }

    public void addLease(Lease lease) {
        leases.add(lease);
        lease.setTenant(this);
    }

    public void removeLease(Lease lease) {
        leases.remove(lease);
        lease.setTenant(null);
    }
}