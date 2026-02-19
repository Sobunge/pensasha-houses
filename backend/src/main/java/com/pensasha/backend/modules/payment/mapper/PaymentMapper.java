package com.pensasha.backend.modules.payment.mapper;

import java.util.UUID;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.payment.Payment;
import com.pensasha.backend.modules.payment.dto.PaymentDTO;
import com.pensasha.backend.modules.user.tenant.TenantProfile;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    @Mapping(target = "tenant", source = "tenantId")
    @Mapping(target = "invoice", source = "invoiceNumber")
    Payment toEntity(PaymentDTO dto);

    @Mapping(source = "tenant.id", target = "tenantId")
    @Mapping(source = "method", target = "method")
    @Mapping(source = "invoice.invoiceNumber", target = "invoiceNumber")
    PaymentDTO toDTO(Payment payment);

    // Convert tenantId to Tenant entity
    default TenantProfile mapTenant(Long tenantId) {
        if (tenantId == null) return null;
        TenantProfile tenant = new TenantProfile();
        tenant.setId(tenantId);
        return tenant;
    }

    // Convert UUID invoiceNumber to Invoice entity
    default Invoice mapInvoice(UUID invoiceNumber) {
        if (invoiceNumber == null) return null;
        Invoice invoice = new Invoice();
        invoice.setInvoiceNumber(invoiceNumber);
        return invoice;
    }

    // Convert Invoice entity to UUID
    default UUID mapInvoiceToUUID(Invoice invoice) {
        if (invoice == null) return null;
        return invoice.getInvoiceNumber();
    }
}
