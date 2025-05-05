package com.pensasha.backend.modules.invoice;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

/**
 * REST controller for managing invoices.
 * Provides CRUD endpoints and HATEOAS links for each resource.
 */
@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    /**
     * Create a new invoice.
     * 
     * @param invoice Invoice details from request body
     * @return Created invoice with HATEOAS links
     */
    @PostMapping
    public ResponseEntity<EntityModel<Invoice>> createInvoice(@RequestBody Invoice invoice) {
        Invoice createdInvoice = invoiceService.createInvoice(invoice);
        EntityModel<Invoice> resource = toModel(createdInvoice);
        return ResponseEntity.created(URI.create(resource.getRequiredLink("self").getHref())).body(resource);
    }

    /**
     * Get a single invoice by invoice number.
     * 
     * @param invoiceNumber Invoice number
     * @return Invoice with HATEOAS links
     */
    @GetMapping("/{invoiceNumber}")
    public ResponseEntity<EntityModel<Invoice>> getInvoice(@PathVariable String invoiceNumber) {
        Invoice invoice = invoiceService.getInvoice(invoiceNumber);
        if (invoice == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(toModel(invoice));
    }

    /**
     * Get all invoices with pagination.
     * 
     * @param pageable Pageable object for pagination
     * @return Paged list of invoices with HATEOAS
     */
    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<Invoice>>> getAllInvoices(Pageable pageable) {
        Page<Invoice> invoices = invoiceService.getAllInvoices(pageable);
        PagedModel<EntityModel<Invoice>> resources = PagedModel.of(
                invoices.map(this::toModel).getContent(),
                new PagedModel.PageMetadata(invoices.getSize(), invoices.getNumber(), invoices.getTotalElements())
        );
        return ResponseEntity.ok(resources);
    }

    /**
     * Update an invoice status.
     * 
     * @param invoiceNumber Invoice number
     * @param status        New status
     * @return Updated invoice with HATEOAS links
     */
    @PatchMapping("/{invoiceNumber}/status")
    public ResponseEntity<EntityModel<Invoice>> updateInvoiceStatus(
            @PathVariable String invoiceNumber,
            @RequestParam InvoiceStatus status) {
        Invoice updated = invoiceService.updateInvoiceStatus(invoiceNumber, status);
        return ResponseEntity.ok(toModel(updated));
    }

    /**
     * Delete an invoice.
     * 
     * @param invoiceNumber Invoice number
     * @return No content response if successful
     */
    @DeleteMapping("/{invoiceNumber}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable String invoiceNumber) {
        invoiceService.deleteInvoice(invoiceNumber);
        return ResponseEntity.noContent().build();
    }

    /**
     * Generate monthly invoices for active tenants.
     * 
     * @return Confirmation message
     */
    @PostMapping("/generate-monthly")
    public ResponseEntity<String> generateMonthlyInvoices() {
        invoiceService.generateMonthlyInvoices();
        return ResponseEntity.ok("Monthly invoices generated successfully.");
    }

    /**
     * Get invoices by property within a date range.
     * 
     * @param propertyId Property ID
     * @param startDate  Start date (yyyy-MM-dd)
     * @param endDate    End date (yyyy-MM-dd)
     * @param pageable   Pageable object
     * @return Paged list of invoices
     */
    @GetMapping("/by-property-date")
    public ResponseEntity<PagedModel<EntityModel<Invoice>>> getInvoicesByPropertyAndDateRange(
            @RequestParam Long propertyId,
            @RequestParam String startDate,
            @RequestParam String endDate,
            Pageable pageable) {
        Page<Invoice> invoices = invoiceService.getInvoicesByPropertyAndDateRange(
                propertyId,
                LocalDate.parse(startDate),
                LocalDate.parse(endDate),
                pageable.getPageNumber(),
                pageable.getPageSize());

        PagedModel<EntityModel<Invoice>> resources = PagedModel.of(
                invoices.map(this::toModel).getContent(),
                new PagedModel.PageMetadata(invoices.getSize(), invoices.getNumber(), invoices.getTotalElements())
        );
        return ResponseEntity.ok(resources);
    }

    /**
     * Helper method to convert an Invoice to HATEOAS EntityModel.
     *
     * @param invoice Invoice entity
     * @return EntityModel with hypermedia links
     */
    private EntityModel<Invoice> toModel(Invoice invoice) {
        return EntityModel.of(invoice,
                linkTo(methodOn(InvoiceController.class).getInvoice(invoice.getInvoiceNumber())).withSelfRel(),
                linkTo(methodOn(InvoiceController.class).updateInvoiceStatus(invoice.getInvoiceNumber(), InvoiceStatus.PAID)).withRel("mark-paid"),
                linkTo(methodOn(InvoiceController.class).deleteInvoice(invoice.getInvoiceNumber())).withRel("delete"),
                linkTo(methodOn(InvoiceController.class).getAllInvoices(Pageable.unpaged())).withRel("all-invoices")
        );
    }
}

