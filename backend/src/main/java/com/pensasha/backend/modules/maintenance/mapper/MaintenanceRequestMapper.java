package com.pensasha.backend.modules.maintenance.mapper;

import com.pensasha.backend.modules.maintenance.MaintenanceRequest;
import com.pensasha.backend.modules.maintenance.dto.CreateMaintenanceRequestDTO;
import com.pensasha.backend.modules.maintenance.dto.MaintenanceRequestResponseDTO;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.user.tenant.TenantProfile;

public class MaintenanceRequestMapper {

    /**
     * Maps a CreateMaintenanceRequestDTO + resolved tenant/unit to a
     * MaintenanceRequest entity
     */
    public static MaintenanceRequest toEntity(
            CreateMaintenanceRequestDTO dto,
            Unit unit, TenantProfile tenant) {

        return new MaintenanceRequest(
                dto.getType(),
                dto.getPriority(),
                dto.getDescription(),
                unit,
                tenant);
    }

    /**
     * Maps a MaintenanceRequest entity to a MaintenanceRequestResponseDTO
     */
    public static MaintenanceRequestResponseDTO toResponseDTO(MaintenanceRequest request) {
        return new MaintenanceRequestResponseDTO(
                request.getId(),
                request.getType(),
                request.getPriority(),
                request.getStatus(),
                request.getRequestDate(),
                request.getDescription(),
                request.getUnit().getId(),
                request.getTenant().getId());
    }
}
