package com.pensasha.backend.modules.maintenance;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pensasha.backend.modules.maintenance.dto.CreateMaintenanceRequestDTO;
import com.pensasha.backend.modules.maintenance.dto.MaintenanceRequestResponseDTO;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.unit.UnitRepository;
import com.pensasha.backend.modules.user.tenant.TenantProfile;
import com.pensasha.backend.modules.user.tenant.TenantProfileRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MaintenanceRequestService {

    private final MaintenanceRequestRepository maintenanceRequestRepository;
    private final UnitRepository unitRepository;
    private final TenantProfileRepository tenantRepository;

    /**
     * CREATE a new maintenance request
     */
    public MaintenanceRequestResponseDTO createRequest(
            Long tenantId,
            CreateMaintenanceRequestDTO dto) {

        TenantProfile tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new EntityNotFoundException("Tenant not found"));

        Unit unit = unitRepository.findById(dto.getUnitId())
                .orElseThrow(() -> new EntityNotFoundException("Unit not found"));

        MaintenanceRequest request = new MaintenanceRequest(
                dto.getType(),
                dto.getPriority(),
                dto.getDescription(),
                unit,
                tenant
        );

        MaintenanceRequest saved = maintenanceRequestRepository.save(request);

        return MaintenanceRequestResponseDTO.fromEntity(saved);
    }

    /**
     * READ a single maintenance request by ID
     */
    public MaintenanceRequestResponseDTO getRequest(Long id) {
        MaintenanceRequest request = maintenanceRequestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Maintenance request not found: " + id));

        return MaintenanceRequestResponseDTO.fromEntity(request);
    }

    /**
     * UPDATE maintenance request details (type, priority, description)
     */
    public MaintenanceRequestResponseDTO updateRequest(
            Long requestId,
            MaintenanceType type,
            MaintenancePriority priority,
            String description) {

        MaintenanceRequest request = maintenanceRequestRepository.findById(requestId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Maintenance request not found: " + requestId));

        request.updateDetails(type, priority, description);

        return MaintenanceRequestResponseDTO.fromEntity(request);
    }

    /**
     * UPDATE maintenance request status
     */
    public MaintenanceRequestResponseDTO updateStatus(Long requestId, MaintenanceStatus status) {

        MaintenanceRequest request = maintenanceRequestRepository.findById(requestId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Maintenance request not found: " + requestId));

        request.updateStatus(status);

        return MaintenanceRequestResponseDTO.fromEntity(request);
    }

    /**
     * DELETE a maintenance request
     */
    public void deleteRequest(Long requestId) {

        MaintenanceRequest request = maintenanceRequestRepository.findById(requestId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Maintenance request not found: " + requestId));

        if (request.getStatus() == MaintenanceStatus.COMPLETED) {
            throw new IllegalStateException("Completed requests cannot be deleted");
        }

        maintenanceRequestRepository.delete(request);
    }

    /**
     * GET all maintenance requests for a tenant
     */
    public List<MaintenanceRequestResponseDTO> getRequestsByTenant(Long tenantId) {
        return maintenanceRequestRepository.findByTenantId(tenantId).stream()
                .map(MaintenanceRequestResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
