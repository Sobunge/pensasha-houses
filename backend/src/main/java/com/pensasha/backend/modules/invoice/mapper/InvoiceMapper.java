package com.pensasha.backend.modules.invoice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.invoice.dto.InvoiceDTO;
import com.pensasha.backend.modules.payment.Payment;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {

    // Entity → DTO
    @Mapping(source = "tenant.id", target = "tenantId")
    @Mapping(source = "lease.id", target = "leaseId")
    @Mapping(source = "payments", target = "paymentIds")
    InvoiceDTO toDTO(Invoice invoice);

    // DTO → Entity
    @Mapping(target = "tenant.id", source = "tenantId")
    @Mapping(target = "lease.id", source = "leaseId")
    @Mapping(source = "paymentIds", target = "payments")
    Invoice toEntity(InvoiceDTO invoiceDTO);

    // Helper: Payment → Long
    default Long paymentToId(Payment payment) {
        return payment.getId();
    }

    // Helper: Long → Payment
    default Payment idToPayment(Long id) {
        Payment payment = new Payment();
        payment.setId(id);
        return payment;
    }

}
