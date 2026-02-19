package com.pensasha.backend.modules.user.tenant;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;
import com.pensasha.backend.modules.user.tenant.dto.UpdateTenantDTO;
import com.pensasha.backend.modules.user.tenant.mapper.TenantMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for handling TenantProfile-related business logic.
 * Works with User + TenantProfile design.
 */
@Service
@AllArgsConstructor
@Slf4j
public class TenantService {

    private final TenantProfileRepository tenantRepository;
    private final TenantMapper tenantMapper;

    /**
     * Get tenant profile by TenantProfile ID
     */
    public TenantDTO getTenantById(Long tenantProfileId) {
        log.info("Fetching tenant profile with ID: {}", tenantProfileId);

        TenantProfile tenantProfile = tenantRepository.findById(tenantProfileId)
                .orElseThrow(() -> {
                    log.error("Tenant profile with ID {} not found", tenantProfileId);
                    return new ResourceNotFoundException(
                            "Tenant profile with ID " + tenantProfileId + " not found."
                    );
                });

        return tenantMapper.toDTO(tenantProfile);
    }

    /**
     * Get paginated list of tenant profiles
     */
    public Page<TenantDTO> getAllTenants(Pageable pageable) {
        log.info("Fetching tenants page: {}, size: {}", pageable.getPageNumber(), pageable.getPageSize());

        Page<TenantProfile> tenantPage = tenantRepository.findAll(pageable);

        List<TenantDTO> tenantDTOs = tenantPage.getContent()
                .stream()
                .map(tenantMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(tenantDTOs, pageable, tenantPage.getTotalElements());
    }

    /**
     * Update emergency contact for a tenant profile
     */
    public TenantDTO updateEmergencyContact(Long tenantProfileId, String emergencyContact) {
        log.info("Updating emergency contact for tenant profile ID: {}", tenantProfileId);

        TenantProfile tenantProfile = tenantRepository.findById(tenantProfileId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Tenant profile with ID " + tenantProfileId + " not found."
                ));

        tenantProfile.setEmergencyContact(emergencyContact);

        TenantProfile updatedTenant = tenantRepository.save(tenantProfile);

        log.info("Emergency contact updated successfully for tenant profile ID: {}", tenantProfileId);
        return tenantMapper.toDTO(updatedTenant);
    }

    /**
     * Update leases for a tenant profile
     */
    public TenantDTO updateLeases(Long tenantProfileId, List<Lease> leases) {
        log.info("Updating leases for tenant profile ID: {}", tenantProfileId);

        TenantProfile tenantProfile = tenantRepository.findById(tenantProfileId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Tenant profile with ID " + tenantProfileId + " not found."
                ));

        tenantProfile.setLeases(leases);

        TenantProfile updatedTenant = tenantRepository.save(tenantProfile);

        log.info("Leases updated successfully for tenant profile ID: {}", tenantProfileId);
        return tenantMapper.toDTO(updatedTenant);
    }

    /**
     * Delete tenant profile by ID
     */
    public boolean deleteTenant(Long tenantProfileId) {
        log.info("Deleting tenant profile with ID: {}", tenantProfileId);

        if (!tenantRepository.existsById(tenantProfileId)) {
            log.warn("Tenant profile with ID {} not found for deletion", tenantProfileId);
            return false;
        }

        tenantRepository.deleteById(tenantProfileId);
        log.info("Tenant profile with ID {} deleted successfully", tenantProfileId);
        return true;
    }

    /**
     * Update tenant profile and linked user information
     */
    public TenantDTO updateTenantDetails(Long tenantProfileId, UpdateTenantDTO dto) {
        log.info("Updating tenant profile and user details for ID: {}", tenantProfileId);

        TenantProfile tenantProfile = tenantRepository.findById(tenantProfileId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Tenant profile with ID " + tenantProfileId + " not found."
                ));

        // Update tenant-specific fields
        tenantProfile.setEmergencyContact(dto.getEmergencyContact());

        // Update linked User fields
        User user = tenantProfile.getUser();
        if (user != null) {
            if (dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
            if (dto.getMiddleName() != null) user.setMiddleName(dto.getMiddleName());
            if (dto.getLastName() != null) user.setLastName(dto.getLastName());
            if (dto.getPhoneNumber() != null) user.setPhoneNumber(dto.getPhoneNumber());
            if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        }

        TenantProfile updatedTenant = tenantRepository.save(tenantProfile);

        log.info("Tenant profile and user details updated successfully for ID: {}", tenantProfileId);
        return tenantMapper.toDTO(updatedTenant);
    }
}
