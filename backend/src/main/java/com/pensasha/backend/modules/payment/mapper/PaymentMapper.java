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
    @Mapping(target = "amount", expression = "java(dto.getAmount() != null ? BigDecimal.valueOf(dto.getAmount()) : null)")
    @Mapping(target = "paymentDate", expression = "java(dto.getPaymentDate() != null ? dto.getPaymentDate().atStartOfDay() : null)")
    @Mapping(target = "method", expression = "java(dto.getMethod() != null ? MethodsOfPayment.valueOf(dto.getMethod()) : null)")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "sourceIdentifier", ignore = true)
    @Mapping(target = "transactionReference", ignore = true)
    Payment toEntity(PaymentDTO dto);

    @Mapping(source = "tenant.id", target = "tenantId")
    @Mapping(source = "invoice.invoiceNumber", target = "invoiceNumber")
    @Mapping(target = "amount", expression = "java(payment.getAmount() != null ? payment.getAmount().doubleValue() : null)")
    @Mapping(target = "paymentDate", expression = "java(payment.getPaymentDate() != null ? payment.getPaymentDate().toLocalDate() : null)")
    @Mapping(target = "method", expression = "java(payment.getMethod() != null ? payment.getMethod().name() : null)")
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