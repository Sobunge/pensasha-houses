package com.pensasha.backend.modules.lease.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

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
    @Mapping(target = "invoices", ignore = true) // ignore invoices when mapping from DTO
    Lease toEntity(LeaseDTO leaseDTO);

    // Map Lease entity to LeaseDTO
    @Mappings({
            @Mapping(source = "tenant.id", target = "tenantId"),
            @Mapping(source = "unit.id", target = "unitId"),
            @Mapping(source = "invoices", target = "invoiceNumbers")
    })
    LeaseDTO toDTO(Lease lease);

    // Convert tenantId to Tenant entity (with only id set)
    default Tenant mapTenant(Long tenantId) {
        if (tenantId == null) {
            return null;
        }
        Tenant tenant = new Tenant();
        tenant.setId(tenantId);
        return tenant;
    }

    // Convert unitId to Unit entity (with only id set)
    default Unit mapUnit(Long unitId) {
        if (unitId == null) {
            return null;
        }
        Unit unit = new Unit();
        unit.setId(unitId);
        return unit;
    }

    // Map list of Invoice objects to list of invoice numbers
    default List<String> mapInvoiceNumbers(List<Invoice> invoices) {
        if (invoices == null) {
            return null;
        }
        return invoices.stream()
                .map(Invoice::getInvoiceNumber)
                .collect(Collectors.toList());
    }
}
