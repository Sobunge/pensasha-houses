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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    @PreAuthorize("hasAuthority('RENT_PAY') or hasRole('ADMIN')")
    public ResponseEntity<EntityModel<Payment>> createPayment(@Valid @RequestBody Payment payment) {
        log.info("Creating new payment record");
        Payment createdPayment = paymentService.processIncomingPayment(
                payment.getTransactionReference(),
                payment.getAmount(),
                payment.getPaymentDate(),
                payment.getMethod(),
                payment.getSourceIdentifier(),
                payment.getTenant() != null ? payment.getTenant().getId() : null,
                payment.getInvoice() != null ? payment.getInvoice().getInvoiceNumber() : null
        );
        return ResponseEntity.ok(toModel(createdPayment));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('RENT_PAY') or hasRole('ADMIN')")
    public ResponseEntity<EntityModel<Payment>> updatePayment(
            @PathVariable("id") Long paymentId,
            @Valid @RequestBody Payment paymentDetails) {
        log.info("Updating payment with ID: {}", paymentId);
        Payment updatedPayment = paymentService.updatePaymentDetails(paymentId, paymentDetails);
        return ResponseEntity.ok(toModel(updatedPayment));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('RENT_VIEW') or hasRole('ADMIN')")
    public ResponseEntity<EntityModel<Payment>> getPaymentById(@PathVariable Long id) {
        log.info("Fetching payment with ID: {}", id);
        Optional<Payment> paymentOpt = paymentService.getPaymentById(id);
        return paymentOpt.map(payment -> ResponseEntity.ok(toModel(payment)))
                .orElseThrow(() -> new ResourceNotFoundException("Payment with id: " + id + " not found"));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('RENT_VIEW') or hasRole('ADMIN')")
    public ResponseEntity<PagedModel<EntityModel<Payment>>> getAllPayments(Pageable pageable) {
        log.info("Fetching all payments with pagination");
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
    @PreAuthorize("hasAuthority('RENT_PAY') or hasRole('ADMIN')")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        log.info("Deleting payment with ID: {}", id);
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{paymentId}/assign-invoice/{invoiceId}")
    @PreAuthorize("hasAuthority('RENT_CONFIRM_PAYMENT') or hasRole('ADMIN')")
    public ResponseEntity<EntityModel<Payment>> assignInvoiceToPayment(
            @PathVariable Long paymentId,
            @PathVariable UUID invoiceId) {
        log.info("Assigning invoice {} to payment {}", invoiceId, paymentId);
        Payment updatedPayment = paymentService.assignPaymentToInvoice(invoiceId, paymentId);
        return ResponseEntity.ok(toModel(updatedPayment));
    }

    /**
     * Webhook endpoint for Safaricom Daraja C2B Confirmation callbacks.
     */
    @PostMapping("/webhook/mpesa/c2b/confirmation")
    public ResponseEntity<?> handleMpesaC2BConfirmation(@RequestBody Map<String, Object> payload) {
        log.info("Received M-Pesa C2B confirmation webhook");
        return ResponseEntity.ok(Map.of("ResultCode", 0, "ResultDesc", "Accepted"));
    }

    private EntityModel<Payment> toModel(Payment payment) {
        EntityModel<Payment> model = EntityModel.of(payment,
                WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PaymentController.class)
                        .getPaymentById(payment.getId()))
                        .withSelfRel(),
                WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PaymentController.class)
                        .getAllPayments(Pageable.unpaged()))
                        .withRel("payments"),
                WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PaymentController.class)
                        .deletePayment(payment.getId()))
                        .withRel("delete")
        );

        if (payment.getInvoice() != null) {
            model.add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PaymentController.class)
                    .assignInvoiceToPayment(payment.getId(), payment.getInvoice().getInvoiceNumber()))
                    .withRel("assign-invoice"));
        }

        return model;
    }
}