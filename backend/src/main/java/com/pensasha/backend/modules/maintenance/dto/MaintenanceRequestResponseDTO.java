package com.pensasha.backend.modules.maintenance.dto;

import java.time.LocalDateTime;

import com.pensasha.backend.modules.maintenance.MaintenancePriority;
import com.pensasha.backend.modules.maintenance.MaintenanceStatus;
import com.pensasha.backend.modules.maintenance.MaintenanceType;

public record MaintenanceRequestResponseDTO(
        Long id,
        MaintenanceType type,
        MaintenancePriority priority,
        MaintenanceStatus status,
        LocalDateTime requestDate,
        String description,
        Long unitId,
        Long tenantId
) {

    /**
     * Mapper helper to convert from entity to DTO
     */
    public static MaintenanceRequestResponseDTO fromEntity(
            com.pensasha.backend.modules.maintenance.MaintenanceRequest request) {

        return new MaintenanceRequestResponseDTO(
                request.getId(),
                request.getType(),
                request.getPriority(),
                request.getStatus(),
                request.getRequestDate(),
                request.getDescription(),
                request.getUnit().getId(),
                request.getTenant().getId()
        );
    }
}
