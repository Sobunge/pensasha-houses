package com.pensasha.backend.modules.user.tenant;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;
import com.pensasha.backend.modules.user.tenant.mapper.TenantMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
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
     * Get tenant details by database ID
     */
    public TenantDTO getTenantById(Long id) {
        log.info("Fetching tenant with ID: {}", id);

        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Tenant with ID {} not found", id);
                    return new ResourceNotFoundException(
                            "Tenant with ID " + id + " not found."
                    );
                });

        return tenantMapper.toDTO(tenant);
    }

    /**
     * Get paginated list of tenants
     */
    public Page<TenantDTO> getAllTenants(Pageable pageable) {
        log.info(
            "Fetching tenants page: {}, size: {}",
            pageable.getPageNumber(),
            pageable.getPageSize()
        );

        Page<Tenant> tenantsPage = tenantRepository.findAll(pageable);

        List<TenantDTO> tenantDTOs = tenantsPage.getContent()
                .stream()
                .map(tenantMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(
                tenantDTOs,
                pageable,
                tenantsPage.getTotalElements()
        );
    }

    /**
     * Update emergency contact for a tenant by ID
     */
    public TenantDTO updateEmergencyContact(Long id, String emergencyContact) {
        log.info("Updating emergency contact for tenant with ID: {}", id);

        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Tenant with ID " + id + " not found."
                ));

        tenant.setEmergencyContact(emergencyContact);

        Tenant updatedTenant = tenantRepository.save(tenant);

        log.info("Emergency contact updated successfully for tenant ID: {}", id);
        return tenantMapper.toDTO(updatedTenant);
    }

    /**
     * Update leases for a tenant by ID
     */
    public TenantDTO updateLeases(Long id, List<Lease> leases) {
        log.info("Updating leases for tenant with ID: {}", id);

        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Tenant with ID " + id + " not found."
                ));

        tenant.setLeases(leases);

        Tenant updatedTenant = tenantRepository.save(tenant);

        log.info("Leases updated successfully for tenant ID: {}", id);
        return tenantMapper.toDTO(updatedTenant);
    }

    /**
     * Delete tenant by database ID
     */
    public boolean deleteTenant(Long id) {
        log.info("Deleting tenant with ID: {}", id);

        if (!tenantRepository.existsById(id)) {
            log.warn("Tenant with ID {} not found for deletion", id);
            return false;
        }

        tenantRepository.deleteById(id);
        log.info("Tenant with ID {} deleted successfully", id);
        return true;
    }
}
