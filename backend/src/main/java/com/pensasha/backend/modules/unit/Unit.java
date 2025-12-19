package com.pensasha.backend.modules.unit;

import java.math.BigDecimal;
import java.util.List;

import com.pensasha.backend.modules.maintenance.MaintenanceRequest;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.tenant.Tenant;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "units",
    uniqueConstraints = @UniqueConstraint(columnNames = {"unit_number", "property_id"})
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unit_number", nullable = false)
    private String unitNumber;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal rentAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UnitStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    /**
     * Current occupant only
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;

    @OneToMany(
        mappedBy = "unit",
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<MaintenanceRequest> maintenanceRequests;
}
