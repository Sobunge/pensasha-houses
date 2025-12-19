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
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<EntityModel<Payment>> createPayment(@Valid @RequestBody Payment payment) {
        log.info("Creating new payment: {}", payment);
        Payment createdPayment = paymentService.addPayment(payment);
        return ResponseEntity.ok(toModel(createdPayment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntityModel<Payment>> updatePayment(
            @PathVariable("id") Long paymentId,
            @Valid @RequestBody Payment paymentDetails) {
        log.info("Updating payment with ID: {}", paymentId);
        Payment updatedPayment = paymentService.updatePaymentDetails(paymentId, paymentDetails);
        return ResponseEntity.ok(toModel(updatedPayment));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntityModel<Payment>> getPaymentById(@PathVariable Long id) {
        log.info("Fetching payment with ID: {}", id);
        Optional<Payment> paymentOpt = paymentService.getPaymentById(id);
        return paymentOpt.map(payment -> ResponseEntity.ok(toModel(payment)))
                .orElseThrow(() -> new ResourceNotFoundException("Payment with id: " + id + " not found"));
    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        log.info("Deleting payment with ID: {}", id);
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{paymentId}/assign-invoice/{invoiceId}")
    public ResponseEntity<EntityModel<Payment>> assignInvoiceToPayment(
            @PathVariable Long paymentId,
            @PathVariable UUID invoiceId) {
        log.info("Assigning invoice {} to payment {}", invoiceId, paymentId);
        Payment updatedPayment = paymentService.assignPaymentToInvoice(invoiceId, paymentId);
        return ResponseEntity.ok(toModel(updatedPayment));
    }

    private EntityModel<Payment> toModel(Payment payment) {
        String invoiceId = payment.getInvoice() != null ? payment.getInvoice().getInvoiceNumber().toString() : "null";
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
                WebMvcLinkBuilder
                        .linkTo(WebMvcLinkBuilder.methodOn(PaymentController.class)
                                .assignInvoiceToPayment(payment.getId(), UUID.fromString(invoiceId)))
                        .withRel("assign-invoice"));
    }
}
