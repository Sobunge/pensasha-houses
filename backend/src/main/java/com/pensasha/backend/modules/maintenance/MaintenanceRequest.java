package com.pensasha.backend.modules.maintenance;

import java.time.LocalDateTime;

import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.user.tenant.Tenant;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "maintenance_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaintenanceType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaintenancePriority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaintenanceStatus status = MaintenanceStatus.PENDING;

    @Column(nullable = false)
    private LocalDateTime requestDate;

    @Column(nullable = false, length = 1000)
    private String description;

    /**
     * The unit this maintenance request is for
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    /**
     * The tenant who raised the request
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    @PrePersist
    protected void onCreate() {
        this.requestDate = LocalDateTime.now();
    }
}
