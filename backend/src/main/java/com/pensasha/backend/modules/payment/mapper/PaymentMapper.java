package com.pensasha.backend.modules.payment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.payment.Payment;
import com.pensasha.backend.modules.payment.dto.PaymentDTO;
import com.pensasha.backend.modules.user.tenant.Tenant;

/**
 * PaymentMapper is a MapStruct interface responsible for converting between 
 * Payment entity objects and PaymentDTO objects, and vice versa.
 */
@Mapper(componentModel = "spring")
public interface PaymentMapper {

    /**
     * Maps a PaymentDTO to a Payment entity.
     * Converts 'tenantId' in PaymentDTO to 'tenant' entity in Payment,
     * and 'invoiceNumber' in PaymentDTO to 'invoice' entity in Payment.
     *
     * @param dto Payment Data Transfer Object
     * @return Payment entity
     */
    @Mapping(target = "tenant", source = "tenantId")
    @Mapping(target = "invoice", source = "invoiceNumber")
    Payment toEntity(PaymentDTO dto);

    /**
     * Maps a Payment entity to a PaymentDTO.
     * Converts 'tenant.id' in Payment to 'tenantId' in PaymentDTO,
     * 'method' is mapped directly (assumes enum <-> string automatic mapping),
     * and 'invoice.invoiceNumber' to 'invoiceNumber'.
     *
     * @param payment Payment entity
     * @return Payment Data Transfer Object
     */
    @Mapping(source = "tenant.id", target = "tenantId")
    @Mapping(source = "method", target = "method") // assuming enum <-> string automatic mapping
    @Mapping(source = "invoice.invoiceNumber", target = "invoiceNumber")
    PaymentDTO toDTO(Payment payment);

    /**
     * Converts a tenantId (Long) to a Tenant entity.
     * Returns null if tenantId is null.
     *
     * @param tenantId ID of the tenant
     * @return Tenant entity with only the ID set
     */
    default Tenant mapTenant(Long tenantId) {
        if (tenantId == null) return null;
        Tenant tenant = new Tenant();
        tenant.setId(tenantId);
        return tenant;
    }

    /**
     * Converts an invoiceNumber (String) to an Invoice entity.
     * Returns null if invoiceNumber is null.
     *
     * @param invoiceNumber Invoice number
     * @return Invoice entity with only the invoice number set
     */
    default Invoice mapInvoice(String invoiceNumber) {
        if (invoiceNumber == null) return null;
        Invoice invoice = new Invoice();
        invoice.setInvoiceNumber(invoiceNumber);
        return invoice;
    }
}
