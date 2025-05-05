package com.pensasha.backend.modules.payment;

import com.pensasha.backend.exceptions.ResourceNotFoundException;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.*;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * REST controller for managing payments.
 * Provides endpoints to create, update, delete, and retrieve payment resources.
 * Includes HATEOAS links for discoverability.
 */
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * Adds a new payment.
     *
     * @param payment The payment to be added.
     * @return ResponseEntity containing the saved Payment and HATEOAS links.
     */
    @PostMapping
    public ResponseEntity<EntityModel<Payment>> createPayment(@Valid @RequestBody Payment payment) {
        log.info("Creating new payment: {}", payment);
        Payment createdPayment = paymentService.addPayment(payment);
        return ResponseEntity.ok(toModel(createdPayment));
    }

    /**
     * Updates an existing payment by its ID.
     *
     * @param paymentId      The ID of the payment to update.
     * @param paymentDetails The updated payment information.
     * @return ResponseEntity containing the updated Payment and HATEOAS links.
     */
    @PutMapping("/{id}")
    public ResponseEntity<EntityModel<Payment>> updatePayment(
            @PathVariable("id") Long paymentId,
            @Valid @RequestBody Payment paymentDetails) {
        log.info("Updating payment with ID: {}", paymentId);
        Payment updatedPayment = paymentService.updatePaymentDetails(paymentId, paymentDetails);
        return ResponseEntity.ok(toModel(updatedPayment));
    }

    /**
     * Retrieves a payment by its ID.
     *
     * @param id The payment ID.
     * @return ResponseEntity containing the Payment and HATEOAS links.
     */
    @GetMapping("/{id}")
    public ResponseEntity<EntityModel<Payment>> getPaymentById(@PathVariable Long id) {
        log.info("Fetching payment with ID: {}", id);
        Optional<Payment> paymentOpt = paymentService.getPaymentById(id);
        return paymentOpt.map(payment -> ResponseEntity.ok(toModel(payment)))
                .orElseThrow(() -> new ResourceNotFoundException("Payment with id: " + id + " not found"));
    }

    /**
     * Retrieves all payments with pagination.
     *
     * @param pageable Pagination parameters.
     * @return PagedModel containing a list of Payment resources with HATEOAS links.
     */
    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<Payment>>> getAllPayments(Pageable pageable) {
        log.info("Fetching all payments with pagination: {}", pageable);
        Page<Payment> payments = paymentService.getAllPayments(pageable);

        PagedModel<EntityModel<Payment>> pagedModel = PagedModel.of(
                payments.map(this::toModel).toList(),
                new PagedModel.PageMetadata(
                        payments.getSize(),
                        payments.getNumber(),
                        payments.getTotalElements(),
                        payments.getTotalPages()));

        return ResponseEntity.ok(pagedModel);
    }

    /**
     * Deletes a payment by its ID.
     *
     * @param id The payment ID.
     * @return ResponseEntity with HTTP 204 status.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        log.info("Deleting payment with ID: {}", id);
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Assigns an invoice to a payment.
     *
     * @param invoiceId The invoice ID.
     * @param paymentId The payment ID.
     * @return ResponseEntity containing the updated Payment and HATEOAS links.
     */
    @PostMapping("/{paymentId}/assign-invoice/{invoiceId}")
    public ResponseEntity<EntityModel<Payment>> assignInvoiceToPayment(
            @PathVariable String invoiceId,
            @PathVariable Long paymentId) {
        log.info("Assigning invoice {} to payment {}", invoiceId, paymentId);
        Payment updatedPayment = paymentService.assignPaymentToInvoice(invoiceId, paymentId);
        return ResponseEntity.ok(toModel(updatedPayment));
    }

    /**
     * Converts a Payment entity into an EntityModel (HATEOAS resource) with links.
     *
     * @param payment The Payment entity.
     * @return EntityModel containing the payment and related links.
     */
    private EntityModel<Payment> toModel(Payment payment) {
        return EntityModel.of(payment,
                WebMvcLinkBuilder
                        .linkTo(WebMvcLinkBuilder.methodOn(PaymentController.class).getPaymentById(payment.getId()))
                        .withSelfRel(),
                WebMvcLinkBuilder
                        .linkTo(WebMvcLinkBuilder.methodOn(PaymentController.class).getAllPayments(Pageable.unpaged()))
                        .withRel("payments"),
                WebMvcLinkBuilder
                        .linkTo(WebMvcLinkBuilder.methodOn(PaymentController.class).deletePayment(payment.getId()))
                        .withRel("delete"),
                WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PaymentController.class)
                        .assignInvoiceToPayment("INVOICE_ID", payment.getId())).withRel("assign-invoice"));
    }
}
