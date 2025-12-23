package com.pensasha.backend.modules.maintenance.dto;

import com.pensasha.backend.modules.maintenance.MaintenancePriority;
import com.pensasha.backend.modules.maintenance.MaintenanceType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateMaintenanceRequestDTO {

    @NotNull(message = "Unit ID is required")
    private Long unitId;

    @NotNull(message = "Maintenance type is required")
    private MaintenanceType type;

    @NotNull(message = "Priority is required")
    private MaintenancePriority priority;

    @NotBlank(message = "Description is required")
    @Size(max = 1000, message = "Description must be at most 1000 characters")
    private String description;

    // Constructors
    public CreateMaintenanceRequestDTO() {}

    public CreateMaintenanceRequestDTO(Long unitId, MaintenanceType type, MaintenancePriority priority, String description) {
        this.unitId = unitId;
        this.type = type;
        this.priority = priority;
        this.description = description;
    }

    // Getters and setters
    public Long getUnitId() {
        return unitId;
    }

    public void setUnitId(Long unitId) {
        this.unitId = unitId;
    }

    public MaintenanceType getType() {
        return type;
    }

    public void setType(MaintenanceType type) {
        this.type = type;
    }

    public MaintenancePriority getPriority() {
        return priority;
    }

    public void setPriority(MaintenancePriority priority) {
        this.priority = priority;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
