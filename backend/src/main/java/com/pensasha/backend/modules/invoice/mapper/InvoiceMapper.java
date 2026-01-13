package com.pensasha.backend.modules.invoice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.invoice.dto.InvoiceDTO;
import com.pensasha.backend.modules.payment.Payment;

@Mapper(componentModel = "spring") // Specifies that MapStruct will generate a Spring bean of this mapper
public interface InvoiceMapper {

    // Mapping from the Invoice entity to the InvoiceDTO
    // This method maps the relevant fields between the entity and the DTO
    @Mapping(source = "tenant.id", target = "tenantId") // Maps tenant's id field to tenantId in DTO
    @Mapping(source = "lease.id", target = "leaseId") // Maps lease's id field to leaseId in DTO
    @Mapping(source = "payments", target = "paymentIds") // Maps list of Payment entities to list of payment IDs in DTO
    InvoiceDTO toDTO(Invoice invoice); // Converts Invoice entity to InvoiceDTO

    // Mapping from the InvoiceDTO to the Invoice entity
    // This method converts the DTO back to an entity, populating the corresponding
    // fields

    @Mapping(target = "tenant.id", source = "tenantId") // Maps tenantId from DTO to tenant's id field in the entity
    @Mapping(target = "lease.id", source = "leaseId") // Maps leaseId from DTO to lease's id field in the entity
    @Mapping(source = "paymentIds", target = "payments") // Maps list of payment IDs in DTO to list of Payment entities
    Invoice toEntity(InvoiceDTO invoiceDTO); // Converts InvoiceDTO back to Invoice entity

    // Helper method to convert a Payment object to its ID (used for mapping Payment
    // list to paymentIds)
    // This is used when mapping from Invoice entity to InvoiceDTO

    default Long paymentToId(Payment payment) {
        return payment.getId(); // Returns the ID of the Payment
    }

    // Helper method to convert a Long (payment ID) back to a Payment object (used
    // for mapping paymentIds to Payments)
    // This is used when mapping from InvoiceDTO to Invoice entity

    default Payment idToPayment(Long id) {
        Payment payment = new Payment(); // Creates a new Payment object
        payment.setId(id); // Sets the ID of the new Payment object
        return payment; // Returns the Payment object
    }

}
