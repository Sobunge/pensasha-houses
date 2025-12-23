package com.pensasha.backend.modules.maintenance;

import java.time.LocalDateTime;

import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.user.tenant.Tenant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Version;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "maintenance_requests")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @Column(nullable = false, updatable = false)
    private LocalDateTime requestDate;

    @Column(nullable = false, length = 1000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "unit_id", nullable = false, updatable = false)
    private Unit unit;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tenant_id", nullable = false, updatable = false)
    private Tenant tenant;

    @Version
    private Long version;

    /**
     * Domain constructor — enforces creation invariants
     */
    public MaintenanceRequest(
            MaintenanceType type,
            MaintenancePriority priority,
            String description,
            Unit unit,
            Tenant tenant) {

        if (type == null || priority == null || description == null || unit == null || tenant == null) {
            throw new IllegalArgumentException("Maintenance request fields must not be null");
        }

        this.type = type;
        this.priority = priority;
        this.description = description;
        this.unit = unit;
        this.tenant = tenant;
        this.status = MaintenanceStatus.PENDING;
    }

    @PrePersist
    protected void onCreate() {
        this.requestDate = LocalDateTime.now();
    }

    /**
     * Only pending requests may be edited
     */
    public void updateDetails(
            MaintenanceType type,
            MaintenancePriority priority,
            String description) {

        if (this.status != MaintenanceStatus.PENDING) {
            throw new IllegalStateException("Only pending requests can be edited");
        }

        this.type = type;
        this.priority = priority;
        this.description = description;
    }

    /**
     * Controlled status transition
     */
    public void updateStatus(MaintenanceStatus newStatus) {

        if (this.status == MaintenanceStatus.COMPLETED) {
            throw new IllegalStateException("Completed requests cannot be modified");
        }

        if (this.status == MaintenanceStatus.PENDING
                && newStatus == MaintenanceStatus.COMPLETED) {
            throw new IllegalStateException(
                    "Pending request cannot be completed directly");
        }

        this.status = newStatus;
    }
}
