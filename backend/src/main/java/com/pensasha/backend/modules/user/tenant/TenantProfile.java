package com.pensasha.backend.modules.user.tenant;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.user.User;

/**
 * Role-specific profile for a Tenant.
 * Contains tenant-only attributes like leases and emergency contact.
 * Linked to a User entity for identity and authentication.
 */
@Entity
@Table(name = "tenant_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TenantProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ===================== RELATION TO USER ===================== */

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    /* ===================== TENANT SPECIFIC FIELDS ===================== */

    /**
     * Bidirectional relationship to Lease.
     * MUST match the field name in Lease:
     *     private TenantProfile tenant;
     */
    @OneToMany(
        mappedBy = "tenant",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    private List<Lease> leases;

    @Column(length = 15)
    private String emergencyContact;
}
