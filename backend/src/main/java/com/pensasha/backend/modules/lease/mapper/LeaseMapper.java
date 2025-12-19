package com.pensasha.backend.modules.lease.mapper;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.lease.dto.LeaseDTO;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.user.tenant.Tenant;

@Mapper(componentModel = "spring")
public interface LeaseMapper {

    // Map LeaseDTO to Lease entity
    @Mapping(target = "tenant", source = "tenantId")
    @Mapping(target = "unit", source = "unitId")
    @Mapping(target = "invoices", ignore = true) // handled elsewhere
    Lease toEntity(LeaseDTO leaseDTO);

    // Map Lease entity to LeaseDTO
    @Mapping(source = "tenant.id", target = "tenantId")
    @Mapping(source = "unit.id", target = "unitId")
    @Mapping(source = "invoices", target = "invoiceNumbers", qualifiedByName = "mapInvoiceUUIDsToStrings")
    LeaseDTO toDTO(Lease lease);

    // Convert tenantId to Tenant entity
    default Tenant mapTenant(Long tenantId) {
        if (tenantId == null) return null;
        Tenant tenant = new Tenant();
        tenant.setId(tenantId);
        return tenant;
    }

    // Convert unitId to Unit entity
    default Unit mapUnit(Long unitId) {
        if (unitId == null) return null;
        Unit unit = new Unit();
        unit.setId(unitId);
        return unit;
    }

    // Convert List<Invoice> to List<String> using UUID.toString()
    @Named("mapInvoiceUUIDsToStrings")
    default List<String> mapInvoiceUUIDsToStrings(List<Invoice> invoices) {
        if (invoices == null || invoices.isEmpty()) return List.of();
        return invoices.stream()
                       .map(Invoice::getInvoiceNumber) // UUID
                       .map(UUID::toString)             // convert to String
                       .collect(Collectors.toList());
    }
}
