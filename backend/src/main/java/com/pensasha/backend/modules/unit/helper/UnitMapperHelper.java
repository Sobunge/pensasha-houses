package com.pensasha.backend.modules.unit.helper;

import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.property.PropertyRepository;
import com.pensasha.backend.modules.user.tenant.Tenant;
import com.pensasha.backend.modules.user.tenant.TenantRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class UnitMapperHelper {

    private final PropertyRepository propertyRepository;
    private final TenantRepository tenantRepository;

    /**
     * Retrieves a Property entity by its ID.
     *
     * @param propertyId the ID of the Property to fetch.
     * @return the corresponding Property entity.
     * @throws IllegalArgumentException if no property is found.
     */
    @Named("propertyIdToProperty")
    public Property getPropertyById(Long propertyId) {
        return propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + propertyId));
    }

    /**
     * Retrieves a Tenant entity by its ID.
     *
     * @param tenantId the ID of the Tenant to fetch.
     * @return the corresponding Tenant entity, or null if tenantId is null.
     * @throws IllegalArgumentException if tenantId is not null and no tenant is
     *                                  found.
     */
    @Named("TenantIdToTenant")
    public Tenant getTenantById(Long tenantId) {
        if (tenantId == null) {
            return null;
        }
        return tenantRepository.findById(tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + tenantId));
    }

}
