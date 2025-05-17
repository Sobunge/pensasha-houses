package com.pensasha.backend.modules.payment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.payment.Payment;
import com.pensasha.backend.modules.payment.dto.PaymentDTO;
import com.pensasha.backend.modules.user.tenant.Tenant;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    @Mapping(target = "tenant", source = "tenantId")
    @Mapping(target = "invoice", source = "invoiceNumber")
    Payment toEntity(PaymentDTO dto);

    @Mapping(source = "tenant.id", target = "tenantId")
    @Mapping(source = "method", target = "method") // assuming enum <-> string automatic mapping
    @Mapping(source = "invoice.invoiceNumber", target = "invoiceNumber")
    PaymentDTO toDTO(Payment payment);

    default Tenant mapTenant(Long tenantId) {
        if (tenantId == null) return null;
        Tenant tenant = new Tenant();
        tenant.setId(tenantId);
        return tenant;
    }

    default Invoice mapInvoice(String invoiceNumber) {
        if (invoiceNumber == null) return null;
        Invoice invoice = new Invoice();
        invoice.setInvoiceNumber(invoiceNumber);
        return invoice;
    }
}