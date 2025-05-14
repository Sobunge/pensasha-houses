package com.pensasha.backend.modules.user.tenant;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;
import com.pensasha.backend.modules.user.tenant.mapper.TenantMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service class for handling business logic related to Tenant entities.
 */
@Service
@AllArgsConstructor
@Slf4j
public class TenantService {

    private final TenantRepository tenantRepository;
    private final TenantMapper tenantMapper;

    /**
     * Get tenant details by idNumber
     */
    public TenantDTO getTenantByIdNumber(String idNumber) {
        log.info("Fetching tenant with ID number: {}", idNumber);
        Tenant tenant = tenantRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> {
                    log.error("Tenant with ID number {} not found", idNumber);
                    return new ResourceNotFoundException("Tenant with ID number " + idNumber + " not found.");
                });
        return tenantMapper.toDTO(tenant);
    }

    /**
     * Get paginated list of tenants
     */
    public Page<TenantDTO> getAllTenants(Pageable pageable) {
        log.info("Fetching tenants page: {}, size: {}", pageable.getPageNumber(), pageable.getPageSize());
        Page<Tenant> tenantsPage = tenantRepository.findAll(pageable);
        List<TenantDTO> tenantDTOs = tenantsPage.stream()
                .map(tenantMapper::toDTO)
                .collect(Collectors.toList());
        return new PageImpl<>(tenantDTOs, pageable, tenantsPage.getTotalElements());
    }

    /**
     * Update emergency contact for a tenant
     */
    public TenantDTO updateEmergencyContact(String idNumber, String emergencyContact) {
        log.info("Updating emergency contact for tenant with ID number: {}", idNumber);
        Tenant tenant = tenantRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant with ID number " + idNumber + " not found."));

        tenant.setEmergencyContact(emergencyContact);
        Tenant updatedTenant = tenantRepository.save(tenant);
        log.info("Successfully updated emergency contact for tenant with ID number: {}", idNumber);
        return tenantMapper.toDTO(updatedTenant);
    }

    /**
     * Update rental units for a tenant
     */
    public TenantDTO updateRentalUnits(String idNumber, List<Unit> units) {
        log.info("Updating rental units for tenant with ID number: {}", idNumber);
        Tenant tenant = tenantRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant with ID number " + idNumber + " not found."));

        tenant.setRentalUnits(units);
        Tenant updatedTenant = tenantRepository.save(tenant);
        log.info("Successfully updated rental units for tenant with ID number: {}", idNumber);
        return tenantMapper.toDTO(updatedTenant);
    }

    /**
     * Update leases for a tenant
     */
    public TenantDTO updateLeases(String idNumber, List<Lease> leases) {
        log.info("Updating leases for tenant with ID number: {}", idNumber);
        Tenant tenant = tenantRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant with ID number " + idNumber + " not found."));

        tenant.setLeases(leases);
        Tenant updatedTenant = tenantRepository.save(tenant);
        log.info("Successfully updated leases for tenant with ID number: {}", idNumber);
        return tenantMapper.toDTO(updatedTenant);
    }

    /**
     * Delete tenant by database ID
     */
    public boolean deleteTenant(Long id) {
        log.info("Deleting tenant with ID: {}", id);
        if (tenantRepository.existsById(id)) {
            tenantRepository.deleteById(id);
            log.info("Successfully deleted tenant with ID: {}", id);
            return true;
        }
        log.warn("Tenant with ID: {} not found for deletion", id);
        return false;
    }
}