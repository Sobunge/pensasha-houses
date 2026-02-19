package com.pensasha.backend.modules.invoice.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.invoice.dto.InvoiceDTO;
import com.pensasha.backend.modules.payment.Payment;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {

    /* =========================
       ENTITY → DTO
       ========================= */

    @Mapping(source = "invoiceNumber", target = "invoiceNumber")
    @Mapping(source = "tenant.id", target = "tenantId")
    @Mapping(source = "lease.id", target = "leaseId")
    @Mapping(target = "paymentIds", expression = "java(mapPaymentsToIds(invoice.getPayments()))")
    InvoiceDTO toDTO(Invoice invoice);

    /* =========================
       DTO → ENTITY
       ========================= */

    @Mapping(target = "tenant", ignore = true)
    @Mapping(target = "lease", ignore = true)
    @Mapping(target = "payments", ignore = true)
    Invoice toEntity(InvoiceDTO dto);

    /* =========================
       HELPERS
       ========================= */

    default List<Long> mapPaymentsToIds(List<Payment> payments) {
        if (payments == null) return List.of();
        return payments.stream()
                .map(Payment::getId)
                .collect(Collectors.toList());
    }
}
