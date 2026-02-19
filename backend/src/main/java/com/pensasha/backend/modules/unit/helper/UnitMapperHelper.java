package com.pensasha.backend.modules.unit.helper;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.tenant.TenantProfile;

import org.mapstruct.Named;
import org.springframework.stereotype.Component;

@Component
public class UnitMapperHelper {

    // ====================== Entity -> ID ======================

    @Named("propertyToPropertyId")
    public Long propertyToPropertyId(Property property) {
        return property != null ? property.getId() : null;
    }

    @Named("tenantToTenantId")
    public Long tenantToTenantId(TenantProfile tenant) {
        return tenant != null ? tenant.getId() : null;
    }

    // ====================== ID -> Entity ======================

    @Named("propertyIdToProperty")
    public Property propertyIdToProperty(Long propertyId) {
        if (propertyId == null) return null;
        Property property = new Property();
        property.setId(propertyId);
        return property;
    }

    @Named("tenantIdToTenantProfile")
    public TenantProfile tenantIdToTenantProfile(Long tenantId) {
        if (tenantId == null) return null;
        TenantProfile tenant = new TenantProfile();
        tenant.setId(tenantId);
        return tenant;
    }
}
