package com.pensasha.backend.modules.lease.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.lease.dto.LeaseDTO;

@Mapper(componentModel = "spring")
public interface LeaseMapper {

    @Mapping(target = "tenant", expression = "java(tenant)")
    @Mapping(target = "unit", expression = "java(unit)")
    @Mapping(target = "invoices", ignore = true)
    Lease toEntity(LeaseDTO leaseDTO);

       @Mappings({
        @Mapping(source = "tenant.id", target = "tenantId"),
        @Mapping(source = "unit.id", target = "unitId"),
        @Mapping(target = "invoiceNumber", expression = "java(mapInvoiceIds(lease.getInvoices()))")
    })
    LeaseDTO toDTO(Lease lease);

    /**
     * Helper method to map list of Invoice IDs.
     */
    default List<String> mapInvoiceIds(List<Invoice> invoices) {
        if (invoices == null) {
            return null;
        }
        return invoices.stream()
                .map(Invoice::getInvoiceNumber)
                .collect(Collectors.toList());
    }
}
