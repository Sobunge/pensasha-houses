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
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

/**
 * REST controller for managing invoices.
 */
@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<EntityModel<Invoice>> createInvoice(@RequestBody Invoice invoice) {
        Invoice createdInvoice = invoiceService.createInvoice(invoice);
        EntityModel<Invoice> resource = toModel(createdInvoice);
        return ResponseEntity.created(URI.create(resource.getRequiredLink("self").getHref())).body(resource);
    }

    @GetMapping("/{invoiceNumber}")
    public ResponseEntity<EntityModel<Invoice>> getInvoice(@PathVariable UUID invoiceNumber) {
        Invoice invoice = invoiceService.getInvoice(invoiceNumber);
        if (invoice == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(toModel(invoice));
    }

    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<Invoice>>> getAllInvoices(Pageable pageable) {
        Page<Invoice> invoices = invoiceService.getAllInvoices(pageable);
        PagedModel<EntityModel<Invoice>> resources = PagedModel.of(
                invoices.map(this::toModel).getContent(),
                new PagedModel.PageMetadata(invoices.getSize(), invoices.getNumber(), invoices.getTotalElements()));
        return ResponseEntity.ok(resources);
    }

    @PatchMapping("/{invoiceNumber}/status")
    public ResponseEntity<EntityModel<Invoice>> updateInvoiceStatus(
            @PathVariable UUID invoiceNumber,
            @RequestParam InvoiceStatus status) {
        Invoice updated = invoiceService.updateInvoiceStatus(invoiceNumber, status);
        return ResponseEntity.ok(toModel(updated));
    }

    @DeleteMapping("/{invoiceNumber}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable UUID invoiceNumber) {
        invoiceService.deleteInvoice(invoiceNumber);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/generate-monthly")
    public ResponseEntity<String> generateMonthlyInvoices() {
        invoiceService.generateMonthlyInvoices();
        return ResponseEntity.ok("Monthly invoices generated successfully.");
    }

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
                new PagedModel.PageMetadata(invoices.getSize(), invoices.getNumber(), invoices.getTotalElements()));
        return ResponseEntity.ok(resources);
    }

    private EntityModel<Invoice> toModel(Invoice invoice) {
        return EntityModel.of(invoice,
                linkTo(methodOn(InvoiceController.class).getInvoice(invoice.getInvoiceNumber())).withSelfRel(),
                linkTo(methodOn(InvoiceController.class).updateInvoiceStatus(invoice.getInvoiceNumber(),
                        InvoiceStatus.PAID)).withRel("mark-paid"),
                linkTo(methodOn(InvoiceController.class).deleteInvoice(invoice.getInvoiceNumber())).withRel("delete"),
                linkTo(methodOn(InvoiceController.class).getAllInvoices(Pageable.unpaged())).withRel("all-invoices"));
    }
}
